import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Divider, Empty, Pagination, Radio } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions/receipt';
import { useAppDispatch, useAppSelector } from 'redux/store';
import _ from 'lodash';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import { useImmer } from 'use-immer';
import ProductComponent from 'components/ProductComponent';
import ProductStatus from 'components/ProductStatus';
import { DEFAULT_SMALL_PAGE_SIZE } from 'consts';
import BigNumber from 'bignumber.js';

export default function OrderHistory() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_receipt, setReceipt] = useImmer({
    data: [],
    total: 0,
    current: 1,
    typeStatus: 0,
  });

  const getData = ({ page = _receipt.current, typeStatus = _receipt.typeStatus } = {}) => {
    setReceipt((draft) => {
      draft.current = page;
    });
    dispatch(
      actions.actionGetReceipt({
        params: {
          current: page,
          count: DEFAULT_SMALL_PAGE_SIZE,
          typeStatus,
        },
        callbacks: {
          onSuccess({ data, total }) {
            setReceipt((draft) => {
              draft.total = total;
              draft.data = data;
            });
          },
        },
      }),
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    getData({ typeStatus: e.target.value });
  };

  return (
    <div className='bg-[#F2F2F2]'>
      <div className='max-w-4xl m-auto py-3'>
        <div className='flex justify-between px-5 py-2 mb-2 bg-white rounded-lg'>
          <div className='text-primary text-xl font-bold'>Lịch sử mua hàng</div>
          <Radio.Group name='radiogroup' defaultValue={0} onChange={handleChange}>
            <Radio value={0}>Tất cả</Radio>
            <Radio value={1}>Đang xử lý</Radio>
            <Radio value={2}>Hoàn thành</Radio>
            <Radio value={3}>Đã hủy</Radio>
          </Radio.Group>
        </div>
        {!_.isEmpty(_receipt.data) ? (
          _.map(_receipt.data, (item: any) => (
            <div key={item.Preview.idSaleReceipt} className='rounded-md px-5 pt-3 bg-white mb-2'>
              <div className='flex justify-between'>
                <div>
                  Đơn hàng <span className='font-semibold'>{item.Preview.idSaleReceipt}</span> |{' '}
                  {utils.formatTimeFromUnix(item.Salereceipt.createAt, 'hh:mm:ss DD/MM/YYYY')}
                </div>
                <ProductStatus status={item.Salereceipt.status} />
              </div>
              <ProductComponent
                name={item.Preview.productList.name}
                img={item.Preview.productList.img}
                id={item.Preview.idProduct}
                price={item.Preview.price}
                priceSale={item.Preview.priceSale}
                unit={item.Preview.productList.unit}
                quantity={item.Preview.quantity}
                description={item.Preview.productList.description}
              />
              <Divider className='m-0' />
              <div className='flex items-center justify-between'>
                <div className='text-[#7c7c7c]'>{item.TotalItem} sản phẩm</div>
                <div className='py-2 text-right text-lg'>
                  Tổng tiền:{' '}
                  {new BigNumber(item.Salereceipt.total).isGreaterThan(item.Salereceipt.totalAfterSale) && (
                    <del className='italic font-medium mr-2 text-gray-900'>{utils.formatCurrency(item.Salereceipt.total)}</del>
                  )}
                  <span className='font-bold text-primary'>{utils.formatCurrency(item.Salereceipt.totalAfterSale)}</span> VNĐ
                </div>
              </div>
              <Divider className='m-0' />
              <div className='py-3 text-right'>
                <Button type='primary' onClick={() => navigate(`/history/${item.Preview.idSaleReceipt}`)}>
                  Chi tiết
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className='col-md-12 text-center cart-empty bg-white'>
            <Empty description='Bạn chưa mua đồ lần nào, hãy mua sắm để có thông tin' />
            <Link to='/shop' className='btn-primary'>
              Quay lại mua sắm
            </Link>
          </div>
        )}
        <div className='text-center'>
          <Pagination
            onChange={(page) => {
              window.scrollTo(0, 0);
              getData({ page });
            }}
            showSizeChanger={false}
            current={_receipt.current}
            pageSize={DEFAULT_SMALL_PAGE_SIZE}
            total={_receipt.total}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </div>
  );
}
