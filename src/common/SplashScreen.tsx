import React from 'react';
import { useSelector } from 'react-redux';
import LoadingInit from './LoadingInit';

type Props = {
  children: React.ReactNode;
};

export default function SplashScreen({ children }: Props) {
  // const { inited } = useSelector((state: any) => state.initReducer);
  const inited = true;
  return inited ? <>{children}</> : <LoadingInit />;
}
