import { ConfigProvider } from 'antd';
import { CustomCarousel, CircleIcon, Categories } from './components';
import img1 from 'images/bg_1.jpg';
import { Header } from 'components';

function Home(props) {
  return (
    <>
      <CustomCarousel />
      <CircleIcon />
      <Categories />
    </>
  );
}

export default Home;
