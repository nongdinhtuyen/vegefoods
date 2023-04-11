import utils from 'common/utils';
import CustomImage from 'components/CustomImage';

export default function ProductComponent({ img, price, unit, quantity }) {
  return (
    <div className='flex items-center gap-x-6'>
      <CustomImage height={110} className='object-contain' src={utils.baseUrlImage(img)} />
      <div className='flex flex-1 flex-wrap gap-y-1 text-base'>
        <div className='w-1/2 font-bold'>Đơn vị</div>
        <div className='w-1/2 text-right'>Giá bán: {utils.formatCurrency(price)} VNĐ</div>
        <div className='w-1/2'>Đơn vị tính: {unit}</div>
        <div className='w-1/2 text-right'>x {quantity}</div>
      </div>
    </div>
  );
}
