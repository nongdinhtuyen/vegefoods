import {useEffect} from 'react';
import { Breadcrumb } from "../../components";
import { Form, Input, Button } from 'antd';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'

import actions from '../../redux/actions/cart';

function Checkout(props) {

    const [form] = Form.useForm();
    const history = useHistory();

    useEffect(()=> {
        if (props.cart.length === 0) {
            props.onFetchCart();
        }
    },[])

    useEffect(()=> {
        if (props.cart.length === 0) {
            history.push("/")
        }
    },[props.cart])

    const onFinish = (values) => {
        let detail = props.cart.map((item) => ({product_id:item.id, quantity: item.quantity}));
        values.detail = detail;
        props.onCreateOrder(values);
      };
    return (
        <>
            <Breadcrumb navi='Checkout' name='Checkout' />
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7">
                            <Form
                            form={form}
                            onFinish={onFinish}
                            labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                            >
                                <h3 className="mb-4 billing-heading">Billing Details</h3>
                                <Form.Item 
                                label='Full name'
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                label='Address'
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                label='Phone number'
                                name="number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                                <div style={{width:'100%'}}>
                                <div 
                                className="btn btn-primary py-3 px-4"
                                style={{    
                                    margin:' 0px auto',
                                    width: '30%',
                                    display: 'block'
                                }}
                                onClick={()=> {
                                    form.submit();
                                }}
                                >Place an order</div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-xl-5">
                            <div className="row mt-5 pt-3">
                                <div className="col-md-12 d-flex mb-5">
                                    <div className="cart-detail cart-total p-3 p-md-4">
                                        <h3 className="billing-heading mb-4">Cart Total</h3>
                                        <p className="d-flex">
                                            <span>Subtotal</span>
                                            <span>${props.cart.reduce((sum,value) => (sum +value.price*value.quantity),0).toFixed(2)}</span>
                                        </p>
                                        <p className="d-flex">
                                            <span>Delivery</span>
                                            <span>$0.00</span>
                                        </p>
                                        <p className="d-flex total-price">
                                            <span>Total</span>
                                            <span>${props.cart.reduce((sum,value) => (sum +value.price*value.quantity),0).toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
       onFetchCart: () => {
            dispatch(actions.onFetchCart())
        },
        onCreateOrder: (data) => {
            dispatch(actions.onCreateOrder(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);