import { Button } from 'antd';
import { openNotification } from 'common/Notify';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import actions from 'redux/actions/cart';

type Props = {
  name: string;
  img: string;
  price: number;
  unit: number;
  quantity: number;
  description: string;
  isCart?: boolean;
  id?: number;
};

export default function ProductComponent({ name, img, price, unit, quantity, description, isCart = false, id }: Props) {
  const [_count, setCount] = useState(quantity);
  const [_loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCount = (value) => {
    setCount(value);
    if (_count > value) {
      if (isCart) {
        dispatch(
          actions.actionRemoveCart({
            params: {
              pid: id,
              quantity: 1,
            },
            callbacks: {
              onBeginning() {
                setLoading(true);
              },
              onSuccess() {
                setLoading(false);
                dispatch(actions.actionGetCartTotal({}));
                dispatch(actions.actionGetCart({}));
              },
            },
          }),
        );
      }
    } else {
      dispatch(
        actions.actionAddCart({
          params: {
            pid: id,
            quantity: 1,
          },
          callbacks: {
            onBeginning() {
              setLoading(true);
            },
            onSuccess({ data }) {
              setLoading(false);
              dispatch(actions.actionGetCartTotal({}));
              dispatch(actions.actionGetCart({}));
            },
          },
        }),
      );
    }
  };
  return (
    <div className='flex items-center gap-x-6'>
      <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(img)} />
      <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
        <div className='w-1/2 font-bold'>{name}</div>
        <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(price)} VNĐ</div>
        <div className='w-1/2'>
          {description ? `${description}. ` : ''}Đơn vị tính: {unit}
        </div>
        <div className='flex items-center justify-end w-1/2'>
          <div>x{_count}</div>
          {isCart && (
            <>
              <Button className='flex items-center mx-1' loading={_loading} onClick={() => handleCount(_count + 1)} size='small'>
                <AiOutlinePlus />
              </Button>
              <Button className='flex items-center' loading={_loading} onClick={() => handleCount(_count - 1)} size='small'>
                <AiOutlineMinus />
              </Button>
            </>
          )}
        </div>
      </div>
      {/* <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
        <div className='w-1/2 font-bold'>Đơn vị</div>
        <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(price)} VNĐ</div>
        <div className='w-1/2'>Đơn vị tính: {unit}</div>
        <div className='w-1/2 text-right'>x {quantity}</div>
      </div> */}
    </div>
  );
}
