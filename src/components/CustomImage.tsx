import { Image, ImageProps, Space } from 'antd';
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';

export default function CustomImage(props: ImageProps) {
  return (
    <Image
      preview={{
        mask: (
          <Space>
            <EyeOutlined />
            Xem trước
          </Space>
        ),
      }}
      className='object-contain'
      {...props}
    />
  );
}
