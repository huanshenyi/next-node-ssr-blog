import Link from 'next/link';
import { Avatar } from 'antd';
import { AppDataSource } from 'db/index';
import { Article } from 'db/entity';
import { IArticle } from 'pages/api';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/index';
import Markdown from 'markdown-to-jsx';
import { format } from 'date-fns';

import styles from './index.module.scss';

interface IProps {
  article: IArticle;
}

export async function getServerSideProps({ params }: any) {
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

  if (articleData) {
    //閲覧回数+1
    articleData.views = articleData?.views + 1;
    await articleRepo.save(articleData);
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(articleData)) || [],
    },
  };
}

const ArticleDetail = (props: IProps) => {
  const { article } = props;
  const {
    user: { nickname, avatar, id },
  } = article;
  const store = useStore();
  const loginUserInfo = store?.user?.userInfo;

  return (
    <div>
      <div className="content-layout">
        <h2 className={styles.title}>{article?.title}</h2>
        <div className={styles.user}>
          <Avatar src={avatar} size={50} />
          <div className={styles.info}>
            <div className={styles.name}>{nickname}</div>
            <div className={styles.date}>
              <div>
                {format(new Date(article?.update_time), 'yyyy-MM-dd hh:mm:ss')}
              </div>
              <div>views{article?.views}</div>
              {Number(loginUserInfo?.userId) === Number(id) && (
                <Link href={`/editor/${article?.id}`}>編集</Link>
              )}
            </div>
          </div>
        </div>
        <Markdown className={styles.markdown}>{article?.content}</Markdown>
      </div>
      <div className={styles.divider}></div>
      <div></div>
    </div>
  );
};

export default observer(ArticleDetail);
