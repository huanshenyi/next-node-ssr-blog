import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config';
import { User, UserAuth } from 'db/entity/index';
import { ISession } from 'pages/api/index';
import request from 'service/fetch';
import { Cookie } from 'next-cookie';
import { AppDataSource } from 'db/index';
import { setCookie } from 'utils';

export default withIronSessionApiRoute(redirect, ironOptions);
// client ID: 2c8411a1e277a1ccd6d4
// client secret: 6d486f2dc29620d51f87171a497145bd965a2b54
async function redirect(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const cookies = Cookie.fromApiRoute(req, res);

  // http://localhost:3000/api/oauth/redirect?code=xxx
  const { code } = req?.query || {};

  const githubClientID = '2c8411a1e277a1ccd6d4';
  const githubSecret = '6d486f2dc29620d51f87171a497145bd965a2b54';
  const url = `https://github.com/login/oauth/access_token?client_id=${githubClientID}&client_secret=${githubSecret}&code=${code}`;

  // githubログイントークン取得
  const result: any = await request.post(
    url,
    {},
    { headers: { accept: 'application/json' } }
  );

  const { access_token } = result;

  const githubUserInfo = await request.get('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });
  const { id: github_id, login='', avatar_url = '' } = githubUserInfo as any;
  const userAuthRepo = await AppDataSource.getRepository(UserAuth);
  const userAuthData = await userAuthRepo.findOne({
    where: {
      identity_type: 'github',
      identfier: github_id,
    },
    relations: {
      user: true,
    },
  });
  console.log("userAuthData:", userAuthData)
  if (userAuthData) {
    // ログインしたことあるユーザー、userからデータ取得、credentail更新
    const user = userAuthData.user;
    const { id, nickname, avatar } = user;

    userAuthData.credential = access_token;
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;

    await session.save();

    setCookie(cookies, { userId: id, nickname, avatar });
    res.redirect("/")

    // res.writeHead(302, {
    //   Location: '/',
    // });
  } else {
    // 新しいユーザー作る user, user_auth
    const user = new User();
    user.nickname = login;
    user.avatar = avatar_url;

    const newUserAuth = new UserAuth();
    newUserAuth.identity_type = 'github';
    newUserAuth.identfier = github_id;
    newUserAuth.credential = access_token;

    newUserAuth.user = user;

    // ユーザーを保存
    const resUserAuth = await userAuthRepo.save(newUserAuth);

    const { id, nickname, avatar } = resUserAuth?.user || {};
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;

    await session.save();
    setCookie(cookies, {userId: id, nickname, avatar});
    
    res.redirect("/")
    // res.writeHead(302, {
    //     Location: "/"
    // })
  }
}
