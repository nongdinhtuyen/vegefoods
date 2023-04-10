import { useEffect, useState } from 'react';
import { Breadcrumb } from '../../components';
import { Categories, CustomPagination, Products } from './components';
import { connect, useDispatch, useSelector } from 'react-redux';
import category_actions from '../../redux/actions/category';
import productActions from '../../redux/actions/product';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import utils from 'common/utils';
import { Pagination } from 'antd';
type ProductType = {
  productType?: number;
};

type ListProductType = {
  current?: number;
  productType?: number;
};

export default function Shop(props) {
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
  const [_selectType, setSelectType] = useState(0);
  const dispatch = useDispatch();

  const getListProducts = ({ current = 1, productType = 0 }: ListProductType = {}) => {
    setProducts((draft) => {
      draft.current = current;
    });
    dispatch(
      productActions.actionGetProducts({
        params: {
          current,
          count: 8,
          productType,
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
              draft.data = [{ name: 'All' }, ...data];
            });
          },
        },
      }),
    );
  };

  useEffect(() => {
    getListProducts();
    getProductTypes();
  }, []);

  const handleChange = (page) => {
    getListProducts({ current: page, productType: _selectType });
  };

  const changeTypes = (index) => {
    setSelectType(index);
    getListProducts({ productType: index, current: 1 });
  };

  return (
    <>
      <Breadcrumb name="shop"/>
      <div className='container my-12'>
        <div className='flex items-center justify-center'>
          {_.map(_productTypes.data, (item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                changeTypes(index);
              }}
              className={classNames(
                'text-base py-2 px-5 rounded-md cursor-pointer',
                _selectType === index ? ['bg-primary', 'text-white'] : 'text-primary',
              )}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className='flex flex-wrap'>
          {_.map(_products.data?.products, (item: any) => (
            <div className='col-md-6 col-lg-3'>
              <div className='block w-full '>
                <Link to={`/product/${item.id}`} className='block overflow-hidden'>
                  <img
                    height={260}
                    className='max-w-full hover:scale-110 transition duration-300 object-contain'
                    src={utils.baseUrlImage(item.img)}
                    alt={item.img}
                  />
                </Link>
                <div className='text py-3 pb-4 px-3 text-center'>
                  <div className='text-2xl'>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                  <div className='d-flex'>
                    <div className='pricing'>
                      <p className='price'>
                        <span>{item.price.toFixed(2)} VNĐ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center'>
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
