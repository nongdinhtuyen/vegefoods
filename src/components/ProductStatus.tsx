import utils from 'common/utils';
import CustomImage from 'components/CustomImage';

export default function ProductStatus({ status }) {
  const color = () => {
    switch (status) {
      case 0:
      case 1:
      case 2:
      case 3:
        return 'bg-[#34B0DD] text-[#]';
      case 4:
        return '#82AE46';
      case 5:
        return '#343A40';
    }
  };
  return <div className='bg-[#34B0DD] rounded-md p-1'></div>;
}
