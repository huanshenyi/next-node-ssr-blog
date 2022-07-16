import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { User, Article } from 'db/entity/index';
import { AppDataSource } from 'db/index';
import { EXCEPTION_ARTICLE } from 'pages/api/config/codes';

export default withIronSessionApiRoute(publish, ironOptions);

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { title = '', content = '' } = req.body;
  const userRepo = await AppDataSource.getRepository(User);
  const articleRepo = await AppDataSource.getRepository(Article);

  const userData = await userRepo.findOne({
    where: {
      id: session.userId,
    },
  });

  const article = new Article();
  article.title = title;
  article.content = content;
  article.create_time = new Date();
  article.update_time = new Date();
  article.is_delete = 0;
  article.views = 0;

  if (userData) {
    article.user = userData;
  }

  const resArticle = await articleRepo.save(article);

  if (resArticle) {
    res.status(200).json({ data: resArticle, code: 0, msg: 'ok' });
  } else {
    res.status(200).json({ ...EXCEPTION_ARTICLE.PUBLISH_FAILED });
  }
}
