import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { format } from 'date-fns';
import md5 from 'md5';
import { encode } from 'js-base64';
import request from 'service/fetch';
import { ISession } from 'pages/api/index';
import { ironOptions } from 'config/index';

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { to = '', templateId = '1' } = req.body;
  // 実際送信用
  // const AccountId = '123';
  // const AuthToken = '123';
  // const AppId = '123';
  // const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  // const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  // const Authorization = encode(`${AccountId}:${NowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  // const expireMinutte = '5';
  // const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  // const response = await request.post(
  //   url,
  //   {
  //     to,
  //     templateId,
  //     appId: AppId,
  //     datas: [verifyCode, expireMinutte],
  //   },
  //   {
  //     headers: {
  //       Authorization,
  //     },
  //   }
  // );
  //{ statusCode: '111141', statusMsg: '【账号】主账户不存在' }

  const statusCode = '000000';
  const statusMsg = '';

  if (statusCode === '000000') {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      data: 12345,
    });
  } else {
    res.status(200).json({
      code: statusCode,
      data: 12345,
    });
  }
}
