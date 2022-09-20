import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { AppDataSource } from 'db/index';
import { Article, Comment, User } from 'db/entity/index';
import { EXCEPTION_COMMENT } from 'pages/api/config/codes';
import { Db } from 'typeorm';
import { id } from 'date-fns/locale';

export default withIronSessionApiRoute(publish, ironOptions);

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { articleId = 0, content = '' } = req.body;
  const commentRepo = await AppDataSource.getRepository(Comment);

  const comment = new Comment();
  comment.content = content;
  comment.create_time = new Date();
  comment.update_time = new Date();

  const userRepo = await AppDataSource.getRepository(User);
  const userData = await userRepo.findOne({
    where: {
      id: session.userId,
    },
  });

  const articleRepo = await AppDataSource.getRepository(Article);
  const articleData = await articleRepo.findOne({
    where: {
      id: articleId,
    },
  });

  if (userData) {
    comment.user = userData;
  }

  if (articleData) {
    comment.article = articleData;
  }

  const resComment = await comment.save();
  if (resComment) {
    res.status(200).json({
      code: 0,
      msg: 'commit ok',
      data: resComment,
    });
  } else {
    res.status(200).json({
      ...EXCEPTION_COMMENT.PUBLISH_FAILED,
    });
  }
}
