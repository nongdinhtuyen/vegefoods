import { AutoComplete, Divider, Space } from 'antd';
import { useEffect, useState } from 'react';
import actions from '../../redux/actions/product';
import _ from 'lodash';
import { useAppDispatch } from 'redux/store';
import { UserOutlined } from '@ant-design/icons';
import utils from 'common/utils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Search: React.FC = () => {
  const [_data, setData] = useState();
  const dispatch = useAppDispatch();

  const renderItem = (title: string, count: number, id: string) => ({
    value: title,
    label: (
      <Link to={`/product/${id}`} className='text-black flex justify-between'>
        {title}
        <span>{utils.formatCurrency(count)} VNĐ</span>
      </Link>
    ),
  });

  const options = _.map(_data, (item: any) => renderItem(item.name, item.price, item.id));

  useEffect(() => {
    getListProducts('');
  }, []);

  const getListProducts = _.debounce((name = '') => {
    dispatch(
      actions.actionGetProducts({
        params: {
          current: 1,
          count: 30,
          body: {
            name,
            remaining: -1,
            type_product: [],
          },
        },
        callbacks: {
          onSuccess({ data }) {
            setData(data.products);
          },
        },
      }),
    );
  }, 500);

  return (
    <AutoComplete
      popupClassName='search-content'
      getPopupContainer={() => document.getElementById('area')!}
      options={options}
      className='w-full'
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '0' }} />
          <Space style={{}}>
            <Link to='' className='watch-more' key='note'>
              Xem thêm
            </Link>
          </Space>
        </>
      )}
      onChange={getListProducts}
      placeholder='Tìm kiếm sản phẩm'
      notFoundContent={''}
    />
  );
};

export default Search;
