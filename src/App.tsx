import React, { ReactNode } from 'react';
import 'antd/dist/reset.css';
import 'common/extend_dayjs';
import SplashScreen from 'common/SplashScreen';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from './components';
import { Home, Shop, Product, Cart, Checkout, Login, Signup } from './screens';

function App() {
  return (
    <SplashScreen>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </SplashScreen>
  );
}

export default App;
