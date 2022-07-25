import { NextPage } from 'next';
import { Divider } from 'antd';
import { AppDataSource } from 'db/index';
import { Article } from 'db/entity';
import ListItem from 'components/ListItem';
import { IArticle } from 'pages/api/index';

interface Iprops {
  articles: IArticle[];
}

// propsをexportする
export async function getServerSideProps(context: any) {
  const articles = await AppDataSource.getRepository(Article).find({
    relations: {
      user: true,
    },
  });
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) || [],
    },
  };
}

// propsを受け取る
const Home = (props: Iprops) => {
  const { articles } = props;
  return (
    <div>
      <div className="content-layout">
        {articles?.map((article) => (
          <>
            <ListItem article={article} />
            <Divider />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
