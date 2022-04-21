import { useState } from 'react';
import { NextPage } from 'next';
import styles from './index.module.scss';

interface Iprops {
  isShow: boolean;
  onClose: () => void;
}

const Login: NextPage<Iprops> = ({ isShow = false, onClose }) => {
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const handleClose = () => {};
  const handelGetVerifyCode = () => {};
  const handleLogin = () => {};
  const handleOAuthGithub = () => {};
  const handelFormChange = (e: HTMLInputElement) => {
   const {name, value} = e?.target;
   setForm({
     ...form,
     [name]: value
   })
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
            コード取得
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

export default Login;
