import { Form, Input, Button,notification } from 'antd';
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


function Signup(props) {
    let history = useHistory();

    const onFinish = (value) => {
        props.onSignup(value,redirect)
    }

    const redirect = () => {
        notification['success']({
            message: 'Sign up succeeded',
        })
        history.push("/login");
    }


    return (
        <div className="bg" style={{ backgroundImage: `url(${Background})` }}>
            <div className="container">
                <div className="login-container" >
                    <h1>Signup</h1>
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

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your gender!',
                                },
                            ]}
                        >
                            <Input placeholder="Gender" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <Input placeholder="phone" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit"> Signup </Button>
                        </Form.Item>
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
        onSignup: (data, callback) => {
            dispatch(actions.onSignup(data,callback))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);