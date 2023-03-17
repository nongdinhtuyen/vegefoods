import { notification } from 'antd';
import { ReactNode } from 'react';
import i18n from 'langs/i18n';

import './styles.scss';

export type INotificationMethodType = 'success' | 'info' | 'warning' | 'error';

type Props = {
  message?: ReactNode;
  description?: ReactNode;
  type?: INotificationMethodType;
};

const defaultMessage = {
  success: i18n.t('Notification.success'),
  info: i18n.t('Notification.info'),
  warning: i18n.t('Notification.warning'),
  error: i18n.t('Notification.error'),
};

export const openNotification = ({ message, description = 'description', type = 'info' }: Props) => {
  let text = message;
  if (!message) {
    // text = defaultMessage[type]
    text = defaultMessage['info'];
  }
  notification[type]({
    message: text,
    description,
  });
};
