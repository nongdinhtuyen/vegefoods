import React, { ReactNode } from 'react';
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

function App() {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: {
          colorPrimary: '#82ae46',
        },
      }}
    >
      <SplashScreen>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/history' element={<OrderHistory />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
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
