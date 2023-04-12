import classNames from 'classnames';
import utils from 'common/utils';
import CustomImage from 'components/CustomImage';
import consts from 'consts';

export default function ProductStatus({ status }) {
  const color = () => {
    switch (status) {
      case 0:
      case 1:
      case 2:
      case 3:
        return 'bg-[#34B0DD]';
      case 4:
        return 'bg-[#82AE46]';
      case 5:
      case 6:
        return 'bg-[#343A40]';
      default:
        return 'bg-[#82AE46]';
    }
  };
  return <div className={classNames('rounded-xl text-white px-2', color())}>{consts.PRODUCT_STATUS_STRING[status]}</div>;
}
