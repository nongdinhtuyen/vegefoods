import React from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from './selection.json';

const Icon = ({ ...props }: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

Icon.defaultProps = {
  size: 16,
};

export default Icon;
