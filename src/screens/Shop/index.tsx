import { useEffect, useState } from 'react';
import { Breadcrumb } from '../../components';
import { Categories, CustomPagination, Products } from './components';
import { connect, useDispatch, useSelector } from 'react-redux';
import category_actions from '../../redux/actions/category';
import productActions from '../../redux/actions/product';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import classNames from 'classnames';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import utils from 'common/utils';
import { Button, Empty, Pagination } from 'antd';

type ListProductType = {
  current?: number;
  productType?: number;
};

export default function Shop() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [_products, setProducts] = useImmer({
    total: 0,
    current: 1,
    data: {
      products: [],
      salePrices: {},
    },
  });
  const [_productTypes, setProductTypes] = useImmer({
    total: 0,
    current: 1,
    data: {},
  });
  const [_selectType, setSelectType] = useState(-1);
  const dispatch = useDispatch();

  const getListProducts = ({ current = 1, productType = _selectType }: ListProductType = {}) => {
    setSearchParams({ type: _.toString(productType), current: current + '' });
    setSelectType(productType)
    setProducts((draft) => {
      draft.current = current;
    });
    dispatch(
      productActions.actionGetProducts({
        params: {
          current,
          count: 8,
          body: {
            name: '',
            remaining: -1,
            type_product: productType === -1 ? [] : [productType],
          },
        },
        callbacks: {
          onSuccess({ data, total }) {
            setProducts((draft) => {
              draft.total = total;
              draft.data = data;
            });
          },
        },
      }),
    );
  };

  const getProductTypes = () => {
    dispatch(
      productActions.actionGetProductTypes({
        params: {},
        callbacks: {
          onSuccess({ data, total }) {
            setProductTypes((draft) => {
              draft.data = [{ name: 'All', id: -1 }, ...data];
            });
          },
        },
      }),
    );
  };

  useEffect(() => {
    getListProducts({ current: searchParams.get('current') !== null ? +searchParams.get('current')! : 1, productType: searchParams.get('type') !== null ? +searchParams.get('type')! : _selectType });
    getProductTypes();
  }, []);

  const handleChange = (page) => {
    getListProducts({ current: page, productType: _selectType });
  };

  const changeTypes = (id) => {
    getListProducts({ productType: id, current: 1 });
  };

  const renderTotal = (price, sale) => {
    if (price > sale && sale > 0) {
      return (
        <div>
          <del className='italic font-medium mr-2 text-gray-900'>{utils.formatCurrency(price)} VNĐ</del>
          <span className=''>{utils.formatCurrency(sale)} VNĐ</span>
        </div>
      );
    }
    return <div className=''>{utils.formatCurrency(price)} VNĐ</div>;
  };

  return (
    <>
      <Breadcrumb name='shop' />
      <div className='container my-12'>
        <div className='flex items-center justify-center mb-4'>
          {_.map(_productTypes.data, (item: any) => (
            <div
              key={item.id}
              onClick={() => {
                changeTypes(item.id);
              }}
              className={classNames(
                'text-base py-2 px-5 rounded-md cursor-pointer',
                _selectType === item.id ? ['bg-primary', 'text-white'] : 'text-primary',
              )}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-x-10 justify-center mt-10'>
          {_.isEmpty(_products.data?.products) ? (
            <Empty />
          ) : (
            _.map(_products.data?.products, (item: any, i:number) => (
              <div className='w-1/5 flex flex-col justify-center'>
                <Link to={`/product/${item.id}`} className='block overflow-hidden'>
                  <img
                    height={260}
                    className='max-w-full hover:scale-110 transition duration-300 object-contain'
                    src={utils.baseUrlImage(item.img)}
                    alt={item.img}
                  />
                </Link>
                <div className='text-2xl flex-1 text-center'>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </div>
                <div className='text py-3 pb-4 px-3 text-center'>
                  <div className='d-flex'>
                    {renderTotal(item.price, _products.data.salePrices[item.id])}
                    <Button type='primary' onClick={() => navigate(`/product/${item.id}`)}>
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='text-center mt-3'>
          <Pagination
            onChange={handleChange}
            showSizeChanger={false}
            current={_products.current}
            pageSize={8}
            total={_products.total}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     category: state.category.category,
//     product: state.product.product,
//     total_count: state.product.total_count,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchCategory: () => {
//       dispatch(category_actions.onFetchCategory());
//     },
//     fetchProducts: (data) => {
//       dispatch(productActions.onFetchProducts(data));
//     },
//   };
// };
