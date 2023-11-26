import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_KEY } from '../constants';

const { Search } = Input;

const ListSearch: FC = () => {
  // 改成受控组件 文档里使用的方式是非受控
  const [keyword, setKeyword] = useState('');
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setKeyword(searchParams.get(SEARCH_KEY) || '');
  }, [searchParams]);

  // 为什么要修改路由参数
  // 1. 搜索组件、List 组件、分页组件解耦，数据的变化由路由去驱动
  // 2. 页面手动刷新时，应保留保留搜索信息和分页信息，而不是清空
  function onSearch(value: string) {
    nav({
      pathname,
      search: value.length > 0 ? `${SEARCH_KEY}=${value}` : '',
    });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    // 受控组件的好处 可以自己管理状态 比如对输入进行过滤
    setKeyword(event.target.value);
  }
  return (
    <>
      <Search
        placeholder="输入关键字"
        allowClear={true}
        value={keyword}
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
    </>
  );
};

export default ListSearch;
