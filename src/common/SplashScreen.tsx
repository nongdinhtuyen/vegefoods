import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'redux/store';
import LoadingInit from './LoadingInit';

type Props = {
  children: React.ReactNode;
};

export default function SplashScreen({ children }: Props) {
  const { inited } = useAppSelector((state) => state.initReducer);
  return inited ? <>{children}</> : <LoadingInit />;
}
