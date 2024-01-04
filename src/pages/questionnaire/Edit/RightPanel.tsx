import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import ComponentPropsTab from './ComponentPropsTab';
import PageSettingTab from './PageSettingTab';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

enum TabKey {
  COMPONENT_PROPS = '1',
  PAGE_SETTING = '2',
}

const items: TabsProps['items'] = [
  {
    key: TabKey.COMPONENT_PROPS,
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
    key: TabKey.PAGE_SETTING,
    label: (
      <span>
        <SettingOutlined />
        页面设置
      </span>
    ),
    children: <PageSettingTab />,
  },
];

const RightPanel: FC = () => {
  const componentsState = useSelector(
    (state: RootState) => state.componentsState.present
  );
  const { selectedId } = componentsState;
  const [activeKey, setActiveKey] = useState(TabKey.PAGE_SETTING);

  // 监听selectedId 动态切换Tab
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TabKey.COMPONENT_PROPS);
    } else {
      setActiveKey(TabKey.PAGE_SETTING);
    }
  }, [selectedId]);

  const onChange = (key: string) => {
    const ky = key as TabKey;
    setActiveKey(ky);
  };

  return (
    <div>
      <Tabs activeKey={activeKey} centered items={items} onChange={onChange} />
    </div>
  );
};

export default RightPanel;
