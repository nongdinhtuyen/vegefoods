import React, { ReactNode, useEffect } from 'react';
import 'antd/dist/reset.css';
import 'common/extend_dayjs';
import 'styles/index.scss';
import SplashScreen from 'common/SplashScreen';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from './components';
import { Home, Shop, Product, Cart, Checkout, Login, Signup, OrderHistory } from './screens';
import { ConfigProvider } from 'antd';
import Profile from 'screens/Profile';
import viVN from 'antd/lib/locale/vi_VN';
import Address from 'screens/Address';
import validateMessages from 'common/validateMessages';
import Receipt from 'screens/Receipt';
import OrderHistoryDetail from 'screens/OrderHistoryDetail';

function App() {

  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: {
          colorPrimary: '#82ae46',
        },
      }}
      locale={viVN}
      form={{ validateMessages }}
    >
      <SplashScreen>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/address' element={<Address />} />
          <Route path='/history' element={<OrderHistory />} />
          <Route path='/history/:id' element={<OrderHistoryDetail />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/receipt/*' element={<Receipt />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </SplashScreen>
    </ConfigProvider>
  );
}

export default App;
