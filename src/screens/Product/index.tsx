import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { Rate, List, Comment, Button, Form, Input, InputNumber, notification } from 'antd';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import product_actions from '../../redux/actions/product';
import cart_actions from '../../redux/actions/cart';

const { TextArea } = Input;

function Product(props) {
    const [value, setValue] = useState(1)

    const { id } = useParams();
    const history = useHistory();

    useEffect(
        () => {
            props.onFetchProduct(id);
            props.onFetchComment({ pid: id });
        }
        , []
    )

    const onValueChange = (value) => {
        setValue(value);
    }

    const addCart = () => {
        props.onAddCart({ product_id: parseInt(id, 10), quantity: value }, succeed)
    }

    const rate = (value) => {
        props.onRate({ product_id: parseInt(id, 10), rate: value}, () => {
            notification['success']({
                message: 'Rate succeeded',
            })
        })
    }

    const onFinish = (values) => {
        values.product_id = parseInt(id,10);
        props.onCreateComment(values)
    }

    const succeed = () => {
        const key = 'cart';
        const btn = (
            <Button type="primary"
                onClick={() => {
                    notification.close(key)
                    history.push('/cart')
                }
                }
            >
                Go to cart
            </Button>
        );
        notification.open({
            message: 'Succeed',
            description:
                'Added succecfully to the cart',
            btn,
            key
        });
    };

    return (
        <>
            <Breadcrumb navi='Product' name='Product' />
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5  ">
                            <a href={props.product.image} className="image-popup" target="_blank" rel="noreferrer"><img src={props.product.image} className="img-fluid" alt="Colorlib Template" /></a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5  ">
                            <h3>{props.product.name}</h3>
                            <div className="rating d-flex">
                                <Rate
                                    defaultValue={props.product.rate_avg}
                                    onChange={rate}
                                    style={{ color: '#82ae46' }}
                                />
                            </div>
                            <p className="price"><span>${props.product.price}</span></p>
                            <p>
                                {props.product.description}
                            </p>
                            <div className="row mt-4">
                                <div className="w-100"></div>
                                <div className="input-group col-md-6 d-flex mb-3">
                                    <InputNumber
                                        min={1}
                                        max={props.product.remaining || 1}
                                        defaultValue={1}
                                        keyboard={false}
                                        onChange={onValueChange}
                                        precision={0}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <p style={{ color: '#000' }}>{props.product.remaining} available</p>
                                </div>
                            </div>
                            <p><div className="btn btn-black py-3 px-5" onClick={addCart}>Add to Cart</div></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section">
                <div className="container">
                    <div className="col-md-12 heading-section text-center  ">
                        <span className="subheading">Comments</span>
                    </div>
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='comment'
                        >
                            <TextArea rows={4} placeholder='Add your comment here' />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{ float: 'right' }}>
                                Add Comment
                             </Button>
                        </Form.Item>
                    </Form>
                    <List
                        className="comment-list"
                        header={`Comments`}
                        itemLayout="horizontal"
                        dataSource={[...props.comment]}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.name}
                                    avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                    content={item.comment}
                                    datetime={dayjs.unix(item.last_up_date).format("DD/MM/YYYY")}
                                />
                            </li>
                        )}
                    />
                </div>
            </section>

            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center mb-3 pb-3">

                    </div>
                </div>
            </section>
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        product: state.product.current,
        comment: state.product.comment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProduct: (id) => {
            dispatch(product_actions.onFetchProduct(id))
        },
        onAddCart: (data, callback) => {
            dispatch(cart_actions.onAddCart(data, callback))
        },
        onFetchComment: (id) => {
            dispatch(product_actions.onFetchComment(id))
        },
        onCreateComment: (data) => {
            dispatch(product_actions.onCreateComment(data))
        },
        onRate: (data,callback) => {
            dispatch(product_actions.onRate(data,callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);