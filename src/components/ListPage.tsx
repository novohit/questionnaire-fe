import { Pagination } from 'antd';
import React, { FC } from 'react';

const ListPage: FC = () => {
  return <Pagination defaultCurrent={1} total={100} />;
};

export default ListPage;
