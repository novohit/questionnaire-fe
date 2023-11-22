import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const Edit: FC = () => {
  // 获取动态路由的参数
  const { id } = useParams();
  return (
    <>
      <p>Edit {id}</p>
    </>
  );
};

export default Edit;
