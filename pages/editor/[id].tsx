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
import { AppDataSource } from 'db/index';
import { Article } from 'db/entity';

import styles from './index.module.scss';
import { IArticle } from 'pages/api';

interface IProps {
    article: IArticle
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export async function getServerSideProps({ params }:any) {
    const articleId = params?.id;
    const articleRepo = await AppDataSource.getRepository(Article);
    const articleData = await articleRepo.findOne({
      where: {
        id: articleId.slice(1, 2),
      },
      relations: {
        user: true,
      },
    });
  
    return {
      props: {
        article: JSON.parse(JSON.stringify(articleData)) || [],
      },
    };
  }

const ModifyEditor = ( {article}:IProps ) => {
  const store = useStore();
  const { userId } = store.user.userInfo;  
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '' );
  const { push, query } = useRouter();
  const articleId = Number(query?.id);


  const handelUpdate = () => {
    if(!title) {
        message.warning('title 入力しろ')
        return
    }

    request.post('/api/article/update', {
        id: articleId,
        title,
        content
    }).then((res:any) => {
       if(res?.code === 0) {
        //  jump
        articleId ? push(`/article/${articleId}`) : push("/");
          message.success("edit ok");
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
          onClick={handelUpdate}
        >
          提出
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handelContentChange} />
    </div>
  );
};

(ModifyEditor as any).layout = null;

export default observer(ModifyEditor);
