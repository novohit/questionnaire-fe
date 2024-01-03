import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { resetPageSetting } from '../../../store/pageSettingReducer';

const { TextArea } = Input;

const PageSettingTab: FC = () => {
  const pageSetting = useSelector((state: RootState) => state.pageSetting);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageSetting);
  }, [pageSetting]);

  function onValuesChange() {
    dispatch(resetPageSetting(form.getFieldsValue()));
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={pageSetting}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="问卷标题" name="title">
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc">
          <TextArea
            placeholder="请输入问卷描述"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item label="js代码" name="js">
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item label="css代码" name="css">
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </>
  );
};

export default PageSettingTab;
