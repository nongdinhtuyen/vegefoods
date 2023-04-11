import { Form, Input, Button, Divider } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import Background from '../../static/background_login.jpg';
import actions from '../../redux/actions/user';

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export default function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (value) => {
    dispatch(
      actions.actionLogin({
        params: {
          ...value,
        },
        callbacks: {
          onSuccess({ data }) {
            fetchInfo(data.id);
          },
        },
      }),
    );
  };

  const fetchInfo = (id) => {
    dispatch(
      actions.actionGetUserInfo({
        params: id,
        callbacks: {
          onSuccess(data) {
            navigate('/');
          },
        },
      }),
    );
  };

  return (
    <div className='bg' style={{ backgroundImage: `url(${Background})` }}>
      <div className='w-modal m-auto p-12 rounded-3xl bg-[#ffffffe0] text-center'>
        <div className='text-3xl mb-12 text-zinc-800 font-bold'>Đăng nhập</div>
        <Form
          size='large'
          {...layout}
          name='basic'
          onFinish={onFinish}
          className='m-auto'
          layout='vertical'
          initialValues={{
            pass: '123456',
            username: 'lanln',
          }}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Tài khoản không được bỏ trống',
              },
            ]}
          >
            <Input placeholder='Tài khoản' />
          </Form.Item>

          <Form.Item
            name='pass'
            rules={[
              {
                required: true,
                message: 'Mât khẩu không được bỏ trống',
              },
            ]}
          >
            <Input.Password placeholder='Mật khẩu' />
          </Form.Item>

          <Form.Item >
            <Button type="primary" className='w-full' htmlType='submit' size='large'>
              Đăng nhập
            </Button>
          </Form.Item>
          <div>
            <span>Chưa có tài khoản?</span> <Link to='/signup'>Đăng ký</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
