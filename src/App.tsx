import { Header, Footer } from './components';
import { Home, Shop, Product, Cart, Login, Signup, OrderHistory } from './screens';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import viVN from 'antd/lib/locale/vi_VN';
import axios from 'axios';
import SplashScreen from 'common/SplashScreen';
import 'common/extend_dayjs';
import validateMessages from 'common/validateMessages';
import useScrollToTop from 'hooks/useScrollToTop';
import firebase from 'libs/firebase';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import Address from 'screens/Address';
import ForgetPass from 'screens/ForgetPass';
import GoogleMaps from 'screens/GoogleMaps';
import OrderHistoryDetail from 'screens/OrderHistoryDetail';
import Profile from 'screens/Profile';
import Receipt from 'screens/Receipt';
import 'styles/index.scss';

type Router = {
  children: ReactNode;
};

function RequireAuth({ children }: Router) {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const location = useLocation();
  if (!isLogin) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function LoginRouter({ children }: Router) {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  if (isLogin) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}

function App() {
  const navigate = useNavigate();
  useScrollToTop();
  window.navigate = navigate;

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
          <Route path='/' element={<Shop />} />
          <Route
            path='/address'
            element={
              <RequireAuth>
                <Address />
              </RequireAuth>
            }
          />
          <Route
            path='/history'
            element={
              <RequireAuth>
                <OrderHistory />
              </RequireAuth>
            }
          />
          <Route
            path='/history/:id'
            element={
              <RequireAuth>
                <OrderHistoryDetail />
              </RequireAuth>
            }
          />
          <Route path='/product/:id' element={<Product />} />
          <Route
            path='/cart'
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path='/receipt/*'
            element={
              <RequireAuth>
                <Receipt />
              </RequireAuth>
            }
          />
          <Route
            path='/login'
            element={
              <LoginRouter>
                <Login />
              </LoginRouter>
            }
          />
          <Route
            path='/signup'
            element={
              <LoginRouter>
                <Signup />
              </LoginRouter>
            }
          />
          <Route path='/forgetpass' element={<ForgetPass />} />
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path='/ggmaps' element={<GoogleMaps />} />
        </Routes>
        <Footer />
      </SplashScreen>
    </ConfigProvider>
  );
}

export default App;
