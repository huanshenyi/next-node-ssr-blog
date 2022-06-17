import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { useStore } from 'store/index';
import styles from './index.module.scss';
import { navs } from 'components/Navbar/config';
import Login from 'components/Login';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';

const Navbar: NextPage = () => {
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;
  const { pathname } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);
  const handleGotoEditorPage = () => {};
  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <HomeOutlined />
          &nbsp;プロフィール
        </Menu.Item>
        <Menu.Item>
          <LoginOutlined />
          &nbsp;ログアウト
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value}>
            <a className={pathname === nav.value ? styles.active : ''}>
              {nav?.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>記事追加</Button>
        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            ログイン
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default Navbar;
