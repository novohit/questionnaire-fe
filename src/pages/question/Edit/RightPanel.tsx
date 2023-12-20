import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import React, { FC } from 'react';
import ComponentPropsTab from './ComponentPropsTab';

const RightPanel: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentPropsTab />,
      // icon属性用不了？
    },
    {
      key: '2',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
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

export default RightPanel;
