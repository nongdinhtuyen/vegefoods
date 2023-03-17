import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';

import Background from '../../static/background_login.jpg'
import actions from '../../redux/actions/user'

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


function Login(props) {
    let history = useHistory();

    const onFinish = (value) => {
        props.onLogin(value,redirect)
    }

    const redirect = () => {
        history.push("/");
    }


    return (
        <div className="bg" style={{ backgroundImage: `url(${Background})` }}>
            <div className="container">
                <div className="login-container" >
                    <h1>Login</h1>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                        style={{ margin: "auto" }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="pass"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit"> Login </Button>
                        </Form.Item>
                        <div>
                            <span>Don't have an account?</span> <a href="signup"><span>Sign up</span></a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return{
        
    }
}   
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (data, callback) => {
            dispatch(actions.onLogin(data,callback))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);