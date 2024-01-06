import React, { FC, useRef, useState } from 'react';
import styles from './StatsHeader.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import {
  Button,
  Input,
  InputRef,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import {
  CheckOutlined,
  CopyOutlined,
  LeftOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const StatsHeader: FC = () => {
  const { _id, title } = useAppSelector(state => state.questionnaire);
  const nav = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <LinkAndQRCode />
        </div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => nav(`/questionnaire/edit/${_id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

const LinkAndQRCode: FC = () => {
  const { url } = useAppSelector(state => state.questionnaire);
  const urlInputRef = useRef<InputRef>(null);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const urlInput = urlInputRef.current;
    if (!urlInput) return;
    urlInput.select();
    document.execCommand('copy');
    setCopied(true);
  };

  const downloadQRCode = () => {
    const canvas = document
      .getElementById('qrcode')
      ?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QRCodeElem = (
    <div id="qrcode">
      <Space direction="vertical" align="center">
        <QRCode value={url} bgColor="#fff" size={130} />
        <Button type="primary" size="small" onClick={downloadQRCode}>
          Download
        </Button>
      </Space>
    </div>
  );

  return (
    <Space>
      <Input
        value={url}
        style={{ width: '300px', caretColor: 'transparent' }} // 隐藏光标
        ref={urlInputRef}
      />
      <Tooltip title="拷贝">
        <Button
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={copy}
        ></Button>
      </Tooltip>
      <Popover content={QRCodeElem}>
        <Button icon={<QrcodeOutlined />}></Button>
      </Popover>
    </Space>
  );
};

export default StatsHeader;
