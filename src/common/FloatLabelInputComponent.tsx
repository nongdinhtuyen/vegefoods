import React, { Component, useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import _ from 'lodash';

export default function FloatLabelInputComponent(props) {
  const [isFloat, setFloat] = useState(props.isFloat);
  const input = useRef('');

  useEffect(() => {
    if (!_.isEmpty(props.value)) {
      setFloat(true);
    }
  }, [props.value]);

  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={props.name || ''}
        style={{
          ...{
            position: 'absolute',
            top: isFloat ? '-40%' : '50%',
            fontWeight: isFloat ? 'normal' : 'bold',
            opacity: isFloat ? '1' : '0.7',
            transform: isFloat ? `${props.transform ? props.transform : 'scale(0.9) translate(5px, -50%)'}` : 'scale(1) translate(5px, -50%)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            transition: 'all ease-in-out .2s',
            zIndex: 1,
          },
          ...(props.labelstyle || {}),
        }}
        onClick={() => {
          setFloat(true);
          if (input.current) {
            input.current.focus();
          }
        }}
      >
        {props.label || ''}
      </label>
      <Input
        id={props.name || ''}
        ref={input}
        {...props}
        onFocus={() => {
          if (props.overrideFocus) {
            props.overrideFocus();
            setFloat(true);
          } else {
            setFloat(true);
          }
        }}
        onBlur={() => {
          setFloat(!window._.isEmpty(props.value));
        }}
        className={props.className ? props.className : ''}
      />
    </div>
  );
}

FloatLabelInputComponent.defaultProps = {
  isFloat: false,
};
