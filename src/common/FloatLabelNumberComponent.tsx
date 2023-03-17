import React, { useEffect, useRef, useState } from 'react';
import { isNaN } from 'lodash';
import { InputNumber } from 'antd';
import BigNumber from 'bignumber.js';

export default function FloatLabelNumberComponent(props) {
  const [isFloat, setFloat] = useState(false);
  const [internalValue, setInternalValue] = useState(0);
  const [internalPrecision, setInternalPrecision] = useState(0);
  const ref = useRef('');
  const input = props.refInput ? props.refInput : ref;

  useEffect(() => {
    setFloat(props.value !== '' || props.value !== null);
  }, [props.value]);

  const labelstyle = window._.get(props, 'labelstyle', {});
  const precision = props.customPrecision || 8;

  return (
    <div style={{ position: 'relative' }} className='float-input-number'>
      <label
        htmlFor={props.name || ''}
        style={{
          ...{
            position: 'absolute',
            top: isFloat ? '-5%' : '50%',
            fontWeight: isFloat ? 'normal' : '600',
            opacity: isFloat ? '1' : '0.7',
            transform: isFloat ? `${props.transform ? props.transform : 'scale(0.9) translate(5px, -50%)'}` : 'scale(1) translate(5px, -50%)',
            // backgroundColor: 'rgba(255,255,255,0.8)',
            transition: 'all ease-in-out .2s',
            zIndex: 1,
          },
          ...labelstyle,
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
      <InputNumber
        id={props.name || ''}
        ref={input}
        suffix='test'
        step={props.value || 1e-8}
        formatter={(v) => {
          if (v == '' || v == null) {
            return '';
          }
          if (v == '0') {
            return '0';
          }
          if (new BigNumber(v).isNaN()) {
            return `${internalValue}.${internalPrecision}`;
          }

          if (
            `${v}`.endsWith('.') ||
            `${v}`.endsWith('.0') ||
            `${v}`.endsWith('.00') ||
            `${v}`.endsWith('.000') ||
            `${v}`.endsWith('.0000') ||
            `${v}`.endsWith('.00000') ||
            `${v}`.endsWith('.000000') ||
            `${v}`.endsWith('.0000000') ||
            `${v}`.endsWith('.00000000')
          ) {
            const [x1, x2] = v.split('.');
            setInternalValue(x1);
            setInternalPrecision(x2);

            return `${new BigNumber(x1 || 0).toFormat()}.${x2}`;
          }

          if (`${v}`.includes('.')) {
            const [x1, x2] = `${v}`.split('.');
            if (x2.length > (precision || 8)) {
              return `${new BigNumber(x1).toFormat()}.${x2.substr(0, precision || 8)}`;
            }

            setInternalValue(x1);
            setInternalPrecision(x2);
            return `${new BigNumber(x1 || 0).toFormat()}.${x2}`;
          }

          return new BigNumber(v || 0).toFormat();
        }}
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
          const isNaN = new BigNumber(props.value).isNaN();
          setFloat(!isNaN);
        }}
        maxLength={18}
        className={props.className ? props.className : ''}
        style={{
          paddingRight: props.suffix ? 25 + Math.max(props.suffixLength || 1) * 8.45 : 25,
        }}
      />
      {props.suffix ? (
        <label
          htmlFor={props.name || ''}
          style={{
            position: 'absolute',
            top: '50%',
            right: '30px',
            transform: 'translateY(-50%)',
            fontFamily: 'monospace',
          }}
        >
          {props.suffix}
        </label>
      ) : (
        ''
      )}
    </div>
  );
}
