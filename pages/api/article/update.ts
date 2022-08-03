import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { User, Article } from 'db/entity/index';
import { AppDataSource } from 'db/index';
import { EXCEPTION_ARTICLE } from 'pages/api/config/codes';

export default withIronSessionApiRoute(update, ironOptions);

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id = 0, title = '', content = '' } = req.body;
  const articleRepo = await AppDataSource.getRepository(Article);
  const articleDate = await articleRepo.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });

  if (articleDate) {
    articleDate.title = title;
    articleDate.content = content;
    articleDate.update_time = new Date();
    const resArticle = await articleRepo.save(articleDate);
    if (resArticle) {
      res.status(200).json({ data: resArticle, code: 0, msg: 'update ok' });
    } else {
      res.status(200).json({ ...EXCEPTION_ARTICLE.UPDATE_FAILED });
    }
  } else {
    res.status(200).json({ ...EXCEPTION_ARTICLE.Not_FOUND });
  }
}
