import { NextPage } from 'next';

interface Iprops {
  isShow: boolean;
  onClose: () => void;
}

const Login: NextPage<Iprops> = (props) => {
  return <>login</>;
};

export default Login;
