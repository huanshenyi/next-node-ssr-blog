import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';

interface Iprops {
  time: number;
  onEnd: () => void;
}

const CountDown: NextPage<Iprops> = ({ time, onEnd }) => {
  const [count, setCount] = useState(time || 60);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id);
          onEnd && onEnd();
          return count;
        }
        return count - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time, onEnd]);
  return <div className={styles.countDown}>{count}</div>;
};

export default CountDown;
