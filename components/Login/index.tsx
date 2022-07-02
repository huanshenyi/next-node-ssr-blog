import { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import CountDown from 'components/CountDown';
import styles from './index.module.scss';
import { message } from 'antd';
import request from 'service/fetch';
import { useStore } from 'store/index';
import { Cookie } from 'next-cookie';
import { observer } from 'mobx-react-lite';
import { UserAuth } from 'db/entity/userAuth';
import { AppDataSource } from 'db/index';

interface Iprops {
  isShow: boolean;
  onClose: () => void;
}

const Login: NextPage<Iprops> = ({ isShow = false, onClose }) => {
  const store = useStore();
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const handleClose = () => {
    onClose();
  };
  const handelGetVerifyCode = () => {
    if (!form?.phone) {
      message.warning('携帯番号を入力してください');
      return;
    }
    request
      .post('/api/user/sendVerifyCode', {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.meg || '未知エラー');
        }
      });
  };
  const handleLogin = () => {
    request
      .post('/api/user/login', {
        ...form,
        identity_type: 'phone',
      })
      .then((res: any) => {
        if (res?.code === 0) {
          // ログインok
          store.user.setUserInfo(res?.data);
          onClose && onClose();
        } else {
          message.error(res?.msg || '未知のエラー');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // client ID: 2c8411a1e277a1ccd6d4
  const handleOAuthGithub = () => {
    const githubClientID = '2c8411a1e277a1ccd6d4';
    const redirectURL = 'http://localhost:3000/api/oauth/redirect';
    // github開く
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${redirectURL}`
    );
  };
  const handelFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handelCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>phone登録</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="携帯番号入力"
          value={form.phone}
          onChange={handelFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            type="text"
            name="verify"
            placeholder="確認コード入力"
            value={form.verify}
            onChange={handelFormChange}
          />
          <span className={styles.verifyCode} onClick={handelGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handelCountDownEnd} />
            ) : (
              'コード取得'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          ログイン
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          githubログイン
        </div>
        <div className={styles.loginPrivacy}>
          ログインイコール同意
          <a href="" target="_blank" rel="noreferrer">
            プライバシー何か
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default observer(Login);
