import { notification } from 'antd';
import { ReactNode } from 'react';

import './styles.scss';

export type INotificationMethodType = 'success' | 'info' | 'warning' | 'error';

type Props = {
  message?: ReactNode;
  description?: ReactNode;
  type?: INotificationMethodType;
};

export const openNotification = ({ description = 'description', type = 'info' }: Props) => {
  notification[type]({
    message: '',
    description,
  });
};
