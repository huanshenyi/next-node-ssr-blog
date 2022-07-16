import { NextPage } from 'next';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, ChangeEvent } from 'react';
import { Input, Button, message } from 'antd';
import request from 'service/fetch'
import { observer } from "mobx-react-lite";
import { useStore } from 'store/index'
import { useRouter } from 'next/router';

import styles from './index.module.scss';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const NewEditor = () => {
  const store = useStore();
  const { userId } = store.user.userInfo;  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { push } = useRouter();


  const handelPublish = () => {
    if(!title) {
        message.warning('title 入力しろ')
        return
    }

    request.post('/api/article/publish', {
        title,
        content
    }).then((res:any) => {
       if(res?.code === 0) {
        //  jump
          userId ? push(`/user/${userId}`) : push("/");
          message.success("post ok");
       }else {
        message.error(res?.msg || '')
       }
    })
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };

  const handelContentChange = (contet: any)=>{
    setContent(contet)
  }

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="タイトル入力して.."
          value={title}
          onChange={handleTitleChange}
        />
        <Button
          className={styles.button}
          type="primary"
          onClick={handelPublish}
        >
          提出
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handelContentChange} />
    </div>
  );
};

(NewEditor as any).layout = null;

export default observer(NewEditor);
