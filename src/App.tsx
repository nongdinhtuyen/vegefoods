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
import { useAppSelector } from 'redux/store';

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
          <Route
            path='/product/:id'
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
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
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </SplashScreen>
    </ConfigProvider>
  );
}

export default App;
