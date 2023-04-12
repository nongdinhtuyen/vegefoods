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

const StepsWrapper = styled(Steps)`
  .ant-steps-item-tail {
    font-size: 5px;
  }
  .ant-steps-item-title {
    line-height: 1.5rem;
    white-space: nowrap;
  }
  .ant-steps-item-description {
    white-space: nowrap;
  }
  .ant-steps-item-content {
    width: fit-content !important;
  }
  .ant-steps-item-active,
  .ant-steps-item-finish {
    .item-active {
      height: 40px;
      width: 40px;
      padding: 0.5rem;
      display: inline-flex;
      align-items: center;
      color: #fff;
      background: #82ae46;
      border-radius: 50%;
    }
  }
  .ant-steps-item-wait {
    .item-active {
      align-items: center;
      height: 40px;
      width: 40px;
      padding: 0.5rem;
      display: inline-flex;
      border-radius: 50%;
      background: #0000000f;
      color: #000000a6;
    }
  }
  .ant-steps-item-error {
    .item-active {
      align-items: center;
      height: 40px;
      width: 40px;
      padding: 0.5rem;
      display: inline-flex;
      border-radius: 50%;
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
  const renderIcon = (icon: React.ReactNode) => <div className='item-active'>{icon}</div>;

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

  const renderItems = () => {
    switch (status) {
      case 0:
      case 1:
        items[1] = {
          title: 'Chờ phê duyệt',
          icon: renderIcon(<BsShieldCheck />),
        };
        break;
      case 2:
        if (typePayment === consts.TYPE_PAYMENT_OCD) {
          items[1] = {
            title: 'Đã phê duyệt',
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
            title: 'Đã phê duyệt',
            icon: renderIcon(<BsShieldCheck />),
          },
          {
            title: `Đang giao hàng`,
            icon: renderIcon(<FaShippingFast />),
          },
        );
        break;
      case 4:
        items.push(
          {
            title: 'Đã phê duyệt',
            icon: renderIcon(<BsShieldCheck />),
          },
          {
            title: `Đang giao hàng`,
            icon: renderIcon(<FaShippingFast />),
          },
          {
            title: 'Giao hàng thành công',
            icon: renderIcon(<img src='/icons/received.svg' width={28} height={19} />),
          },
        );
        break;
      case 5:
        items[1] = {
          title: 'Chờ duyệt hủy',
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
