import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';
import { Tag } from 'db/entity/index';
import { AppDataSource } from 'db/index';

export default withIronSessionApiRoute(get, ironOptions);

async function get(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { userId = 0 } = session;

  const tagRepo = await AppDataSource.getRepository(Tag);
  const followTags = await tagRepo.find({
    relations: ['users'],
    // where: {
    //   users: Number(userId),
    // },
  });
  const allTags = await tagRepo.find({
    relations: ['users'],
  });
  res?.status(200)?.json({
    code: 0,
    msg: '',
    data: {
      followTags,
      allTags,
    },
  });
}
