import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config';
import { AppDataSource } from 'db/index';
import { User } from 'db/entity/user';

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '' } = req.body;
  const user = await AppDataSource.manager.find(User);
  console.log(user);
  const db = res?.status(200).json({ phone, verify, cod: 0 });
}
