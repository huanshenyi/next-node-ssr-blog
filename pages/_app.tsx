import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'store/index';
import Layout from 'components/layout';
import { NextPage } from 'next';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: any) => {
  const { userId, nickname, avatar } = ctx?.req.cookies || {};
  return {
    initialValue: {
      // cookieにuserをセット
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  };
};

export default MyApp;
