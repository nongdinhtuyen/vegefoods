import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/user';
import { Avatar, Badge, Dropdown, Image, Input, Menu, Popover } from 'antd';
import _ from 'lodash';
import type { MenuProps } from 'antd';
import { BiUserCircle } from 'react-icons/bi';
import classNames from 'classnames';
import { FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IoReceiptOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { useAppSelector } from 'redux/store';
import Search from './Search';

export default function Header(props) {
  const [dropdown, setDropdown] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, profile } = useAppSelector((state) => state.userReducer);
  const { cartDataTotal } = useAppSelector((state) => state.cartReducer);

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

  const items: MenuProps['items'] = [
    {
      key: '1',
      // icon: <BiUserCircle size={18} />,
      icon: <img width={22} src="icons/profile.svg" />,
      label: <Link to='/profile'>Thông tin cá nhân</Link>,
    },
    {
      key: '2',
      label: <Link to='/address'>Sổ địa chỉ</Link>,
      // icon: <AiOutlineUnorderedList size={18} />,
      icon: <img width={22} src="icons/address.svg" />,
    },
    {
      key: '3',
      label: <Link to='/history'>Lịch sử mua hàng</Link>,
      // icon: <IoReceiptOutline />,
      icon: <img width={22} src="icons/history.svg" />,
    },
    {
      key: '4',
      label: <div onClick={logout}>Đăng xuất</div>,
      // icon: <MdLogout />,
      icon: <img width={22} src="icons/logout.svg" />,
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
      <div className='container m-auto flex max-w-container items-center justify-between py-4 gap-x-8'>
        <div className='flex flex-1 gap-x-8 items-center'>
          <Link className='text-xl font-extrabold uppercase !text-primary transition duration-500 hover:scale-110' to='/'>
            Vegefoods
          </Link>
          <Search />
        </div>
        <div className='flex items-center gap-x-8 flex-1 justify-end'>
          <Link className='text-black text-xs tracking-widest' to='/'>
            Cửa hàng
          </Link>
          <Link className='flex tracking-widest' to='/cart'>
            <Badge size='small' count={cartDataTotal.totalItem}>
              <FaShoppingCart size={16} />
            </Badge>
          </Link>
          {isLogin ? (
            <div className='text-xs tracking-widest'>
              Xin chào,{' '}
              <Dropdown menu={{ items }} placement='bottomRight'>
                <span className='text-primary cursor-pointer'>{profile.username}</span>
              </Dropdown>
            </div>
          ) : (
            <Link to='/login' className='text-xs tracking-widest'>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
