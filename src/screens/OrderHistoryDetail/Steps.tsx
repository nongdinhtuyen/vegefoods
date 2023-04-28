import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Empty, Steps } from 'antd';

import actions from '../../redux/actions/receipt';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import { useImmer } from 'use-immer';
import { IoChevronBackSharp } from 'react-icons/io5';
import { CgNotes } from 'react-icons/cg';
import { TbClipboardList } from 'react-icons/tb';
import { BsShieldCheck } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { FiMapPin } from 'react-icons/all';
import { FaShippingFast } from 'react-icons/fa';
import styled from 'styled-components';
import consts from 'consts';
import ProductComponent from 'components/ProductComponent';
import Icon from 'components/Icon';

const StepsWrapper = styled(Steps)`
  .ant-steps-item-tail {
    font-size: 5px;
  }
  .ant-steps-item-title {
    line-height: 1.5rem;
    /* white-space: nowrap; */
  }
  .ant-steps-item-description {
    /* white-space: nowrap; */
  }
  .ant-steps-item-content {
    /* width: fit-content !important; */
  }
  .item {
    height: 40px;
    width: 40px;
    align-items: center;
    display: inline-flex;
    padding: 0.5rem;
    justify-content: center;
    border-radius: 50%;
    .icomoon path {
      fill: currentColor
    }
  }
  .ant-steps-item-active,
  .ant-steps-item-finish {
    .item-active {
      color: #fff;
      background: #82ae46;
    }
  }
  .ant-steps-item-wait {
    .item-active {
      background: #0000000f;
      color: #000000a6;
    }
  }
  .ant-steps-item-error {
    .item-active {
      background: #343a40;
      color: #000;
    }
    .ant-steps-item-title {
      color: #000 !important;
    }
  }
  .item-faile {
    background: #343a40 !important;
  }
`;
// Status
// 0 – Chờ phê duyệt - 1
// 1 – Đã phê duyệt - 1
// 2 – Chờ xuất kho - 1
// 3 – Đang giao hàng - 1
// 4 – Giao hàng thành công - 2
// 5 – Chờ duyệt hủy - 1
// 6 – Đã hủy - 3
export default function CustomSteps({ status, typePayment, price }) {
  const renderIcon = (icon: React.ReactNode) => <div className='item item-active'>{icon}</div>;

  const items: any = [
    {
      title: 'Đặt hàng thành công',
      icon: renderIcon(<TbClipboardList />),
    },
  ];

  const renderStatus = () => {
    switch (status) {
      case 0:
        return 0;
      case 1:
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 1;
      case 6:
        return 1;
      default:
        return 0;
    }
  };

  const renderItems2 = () => {
    _.forEach([...Array(typePayment - items.length).keys()], (item, index) => {
      if (typePayment === consts.TYPE_PAYMENT_COD) {
        items.push({
          title: 'Đã phê duyệt',
          icon: renderIcon(<BsShieldCheck />),
        });
      } else {
        items.push({
          title: 'Chờ phê duyệt',
          icon: renderIcon(<BsShieldCheck />),
        });
      }
    });
  };

  const renderItems = () => {
    switch (status) {
      case 0:
        if (typePayment === consts.TYPE_PAYMENT_COD) {
          items[1] = {
            title: consts.PRODUCT_STATUS_STRING[0],
            icon: renderIcon(<BsShieldCheck />),
          };
        } else {
          items[1] = {
            title: consts.PRODUCT_STATUS_STRING_ONLINE[0],
            icon: renderIcon(<Icon size={22} className='icomoon' title='Chi tiết đơn nhập' icon={'money'} />),
          };
        }
        break;
      case 1:
        if (typePayment === consts.TYPE_PAYMENT_COD) {
          items[1] = {
            title: consts.PRODUCT_STATUS_STRING[1],
            icon: renderIcon(<BsShieldCheck />),
          };
        } else {
          items[1] = {
            title: consts.PRODUCT_STATUS_STRING_ONLINE[1],
            icon: renderIcon(<Icon size={22} className='icomoon' title='Chi tiết đơn nhập' icon={'money'} />),
          };
        }
        break;
      case 2:
        if (typePayment === consts.TYPE_PAYMENT_COD) {
          items[1] = {
            title: consts.PRODUCT_STATUS_STRING[1],
            icon: renderIcon(<BsShieldCheck />),
          };
        } else {
          items[1] = {
            title: `Đã thanh toán ${price}đ`,
            icon: renderIcon(<img src='/icons/money.png' width={24} height={19} />),
          };
        }
        break;
      case 3:
        items.push(
          {
            title: consts.PRODUCT_STATUS_STRING[1],
            icon: renderIcon(<BsShieldCheck />),
          },
          {
            title: consts.PRODUCT_STATUS_STRING[3],
            icon: renderIcon(<FaShippingFast />),
          },
        );
        break;
      case 4:
        items.push(
          {
            title: consts.PRODUCT_STATUS_STRING[1],
            icon: renderIcon(<BsShieldCheck />),
          },
          {
            title: consts.PRODUCT_STATUS_STRING[3],
            icon: renderIcon(<FaShippingFast />),
          },
          {
            title: consts.PRODUCT_STATUS_STRING[4],
            icon: renderIcon(<img src='/icons/received.svg' width={28} height={19} />),
          },
        );
        break;
      case 5:
        items[1] = {
          title: consts.PRODUCT_STATUS_STRING[5],
          icon: renderIcon(<img src='/icons/cancel_product.png' width={24} height={19} />),
        };
        break;
      case 6:
        items.push({
          title: 'Đơn hàng thất bại',
          status: 'error',
          icon: renderIcon(<img src='/icons/cancel.png' width={22} />),
        });
        break;
      default:
    }
    return items;
  };

  return <StepsWrapper direction='horizontal' className='text-[0px]' labelPlacement='vertical' current={renderStatus()} items={renderItems()} />;
}
