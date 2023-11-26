import React, { ChangeEvent, FC, useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const ListSearch: FC = () => {
  // 改成受控组件 文档里使用的方式是非受控
  const [text, setText] = useState('');

  function onSearch() {
    console.log(text);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    // 受控组件的好处 可以自己管理状态 比如对输入进行过滤
    setText(event.target.value);
  }
  return (
    <>
      <Search
        placeholder="输入关键字"
        allowClear={true}
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
    </>
  );
};

export default ListSearch;
