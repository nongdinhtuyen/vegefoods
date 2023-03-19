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
    data: [],
  });
  const [_productTypes, setProductTypes] = useImmer<any>({
    total: 0,
    current: 1,
    data: [],
  });
  const [_selectType, setSelectType] = useState(0);
  const dispatch = useDispatch();

  const getListProducts = ({ current = 1, productType = 0 }: ListProductType = {}) => {
    dispatch(
      productActions.actionGetProducts({
        params: {
          current,
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
    // item.fetchProduct({ current: 1 });
  }, []);

  // const onPageChange = (page, size) => {
  //   if (_category === null) {
  //     item.fetchProducts({ page: page, size: 12 });
  //   } else {
  //     item.fetchProducts({ page: page, size: 12, cateid: _category });
  //   }
  // };

  const onCategoryChange = (id) => {
    // setCategory(id || null);
  };

  const changeTypes = (index) => {
    setSelectType(index);
    getListProducts({ productType: index });
  };

  return (
    <>
      <Breadcrumb />
      <section className='ftco-section'>
        <div className='container'>
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
            {_.map(_products.data, (item: any, index) => (
              <div className='col-md-6 col-lg-3'>
                <div className='block w-full '>
                  <Link to={`/product/${item.id}`} className='block overflow-hidden'>
                    {/* <img className='img-fluid' src={utils.baseUrlImage(item.img)} alt={item.img} /> */}
                    <img className='h-auto max-w-full hover:scale-110 transition duration-300' src={utils.baseUrlImage(item.img)} alt={item.img} />
                    {/* <div className='overlay'></div> */}
                  </Link>
                  <div className='text py-3 pb-4 px-3 text-center'>
                    <div className="text-2xl">
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
          {/* <Categories categories={_products.data} onCategoryChange={onCategoryChange} /> */}
          {/* <Products products={_products.data} /> */}
          {/* <CustomPagination total={total_count} onPageChange={onPageChange} /> */}
        </div>
      </section>
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
