import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config';
import { AppDataSource } from 'db/index';
import { ISession } from 'pages/api/index';
import { User } from 'db/entity/user';
import { UserAuth } from 'db/entity/userAuth';

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { phone = '', verify = '', identity_type = 'phone' } = req.body;
  const userRepo = await AppDataSource.getRepository(User);
  const userAuthRepo = await AppDataSource.getRepository(UserAuth);

  if (String(session.verifyCode) === String(verify)) {
    // 検証code OK, user_authsにidentity_type記録探す
    const userAuth = await userAuthRepo.findOne({
      where: {
        identity_type,
        identfier: phone,
      },
      relations: {
        user: true,
      },
    });

    if (userAuth) {
      // すでに存在するユーザーであれば
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      res?.status(200).json({
        code: 0,
        msg: 'ログインok',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    } else {
      // 新しいユーザーにはアカウント生成
      const user = new User();
      user.nickname = `username_${Math.floor(Math.random() * 10000)}`;
      user.avatar = `/images/avatar.jpg`;
      user.job = 'nocontext';
      user.introduce = 'nocontext';

      const userAuth = new UserAuth();
      userAuth.identfier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session.verifyCode;
      userAuth.user = user;

      const resUserAuth = await userAuthRepo.save(userAuth);
      const {
        user: { id, nickname, avatar },
      } = resUserAuth;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      res?.status(200).json({
        code: 0,
        msg: 'ログインok',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    }
  } else {
    res?.status(200).json({
      code: -1,
      msg: 'だめだcode違う',
    });
  }
}
