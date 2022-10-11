import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/index';
import request from 'service/fetch';

const { TabPane } = Tabs;

interface IUser {
  id: number;
  nickname: string;
  avatar: string;
}

interface ITag {
  id: number;
  title: string;
  icon: string;
  follow_count: string;
  article_count: number;
  users: IUser[];
}

const Tag: NextPage = () => {
  const store = useStore();
  const [followTags, setFollowTags] = useState<ITag[]>();
  const [allTags, setTags] = useState<ITag[]>();
  const { userId } = store?.user?.userInfo;

  useEffect(() => {
   request('/api/tag/get').then((res:any) => {
      if(res?.code === 0) {
        const { followTags = [], allTags = [] } =res?.data;
        setFollowTags(followTags);
        setTags(allTags);
      } 
   });
  }, []);

  return (
    <div className="content-layout">
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="フォロー中タグ" key="fllow">
          {
            followTags?.map(tag => (
              <div key={tag?.title}>
                <div>{tag?.title}</div>
              </div>
            ))
          }
        </TabPane>
      </Tabs>
    </div>
  );
};

export default observer(Tag);
