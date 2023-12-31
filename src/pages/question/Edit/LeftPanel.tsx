import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import React, { FC } from 'react';
import ComponentLibTab from './ComponentLibTab';
import ComponentLayerTab from './ComponentLayerTab';

const LeftPanel: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <ComponentLibTab />,
      // icon属性用不了？
    },
    {
      key: '2',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <ComponentLayerTab />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
    </div>
  );
};

export default LeftPanel;
