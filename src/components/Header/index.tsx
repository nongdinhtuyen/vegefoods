import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/user';
import { Avatar, Dropdown, Image, Menu, Popover } from 'antd';
import _ from 'lodash';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { MenuProps } from 'antd';

export default function Header(props) {
  const [dropdown, setDropdown] = useState('');
  const { isLogin } = useSelector((state: IStateReducers) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownHandle = () => {
    if (dropdown !== '') {
      setDropdown('');
    } else {
      setDropdown('show');
    }
  };

  const logout = () => {
    dispatch(actions.actionLogout({}));
  };

  const dropdownMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={logout} className='cursor-pointer'>
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <div id='area'>
      <div className='py-1 bg-primary'>
        <div className='m-auto container'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center text-white gap-x-1 flex-1'>
              <span className='icon-phone2'></span>
              <span className='text-xs font-semibold'>012 3456 789</span>
            </div>
            <div className='flex items-center text-white gap-x-1 flex-1'>
              <span className='icon-paper-plane'></span>
              <span className='text-xs uppercase font-semibold'>vegafoods@gmail.com</span>
            </div>
            <div className='flex-2 text-right'>
              <span className='text-xs text-white font-semibold uppercase'>Giao hàng trong vòng 3-5 ngày làm việc và đổi/trả hàng miễn phí</span>
            </div>
          </div>
        </div>
      </div>
      <nav className='navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light' id='ftco-navbar'>
        <div className='container py-2'>
          <Link className='font-extrabold text-2xl hover:scale-110 transition duration-500' to='/'>
            Vegefoods
          </Link>

          <div className='flex items-center gap-x-5'>
            {/* <Link className='text-lg font-semibold text-black' to='/shop'>
              Cửa hàng
            </Link> */}

            {isLogin ? (
              <>
                <Link to='/cart' className='text-black'>
                  <AiOutlineShoppingCart size={24} />
                </Link>
                <Dropdown
                  getPopupContainer={(): any => document.getElementById('area')}
                  placement='bottom'
                  menu={{ items: dropdownMenu }}
                  // trigger={['click', 'hover']}
                  className='cursor-pointer'
                >
                  <Link to="/profile">
                    <Avatar
                      src='https://mediacloud.mobilelab.vn/2022-12-19/17_23_46-b9c6ee36-6e8f-43b9-88dd-2a9bc1e4dfa5.gif'
                    />
                  </Link>
                </Dropdown>
              </>
            ) : (
              <div className='hidden md:flex items-center justify-end'>
                <Link to='/login' className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
                  Sign in
                </Link>
                <Link
                  to='/signup'
                  className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
