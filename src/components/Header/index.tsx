import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/user';
import { Avatar, Badge, Dropdown, Image, Menu, Popover } from 'antd';
import _ from 'lodash';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { MenuProps } from 'antd';
import { BiUserCircle } from 'react-icons/bi';
import classNames from 'classnames';
import { FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from 'redux/store';

export default function Header(props) {
  const [dropdown, setDropdown] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, profile } = useAppSelector((state) => state.userReducer);

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
    <header id='area' className={classNames('header')}>
      <div className='bg-primary py-1'>
        <div className='container m-auto max-w-container'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center gap-x-1 text-white'>
              <FaPhoneAlt />
              <span className='text-xs '>012 3456 789</span>
            </div>
            <div className='flex flex-1 items-center gap-x-1 text-white'>
              <span className='icon-paper-plane'></span>
              <span className='text-xs  uppercase'>vegafoods@gmail.com</span>
            </div>
            <div className='flex-2 text-right'>
              <span className='text-xs  uppercase text-white'>Giao hàng trong vòng 3-5 ngày làm việc và đổi/trả hàng miễn phí</span>
            </div>
          </div>
        </div>
      </div>
      <div className='container m-auto flex max-w-container items-center justify-between py-4'>
        <Link className='text-xl font-extrabold uppercase !text-primary transition duration-500 hover:scale-110' to='/'>
          Vegefoods
        </Link>

        <div className='flex items-center gap-x-8'>
          <Link className='text-black text-xs tracking-widest' to='/shop'>
            Shop
          </Link>
          <Link className='flex tracking-widest' to='/cart'>
            <Badge size='small' count={5}>
              <FaShoppingCart size={16} />
            </Badge>
          </Link>
          {isLogin ? (
            <div className='text-xs tracking-widest'>
              Xin chào, <Link to='profile'>{profile.username}</Link>
            </div>
          ) : (
            <Link to='/login' className='text-xs tracking-widest'>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
