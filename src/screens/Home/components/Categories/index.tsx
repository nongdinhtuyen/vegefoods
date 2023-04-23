import ButtonHeader from 'components/ButtonAnimation/ButtonHeader';
import ButtonShopNow from 'components/ButtonAnimation/ButtonShopNow';
import {Link} from 'react-router-dom';

function Categories(props) {
    return (
        <section className="ftco-section ftco-category ftco-no-pt">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 order-md-last align-items-stretch d-flex">
                                <div className="category-wrap-2 h-full img align-self-stretch d-flex" style={{ backgroundImage: `url(${require('images/category.jpg')}` }}>
                                    <div className="text text-center">
                                        <h2>Vegetables</h2>
                                        <p>Bảo vệ sức khỏe của bạn mỗi ngày</p>
                                        {/* <p><Link to="/" className="btn btn-primary">Mua ngay</Link></p> */}
                                        <ButtonShopNow />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="category-wrap   img mb-4 d-flex align-items-end" style={{ backgroundImage: `url(${require('images/category-1.jpg')})` }}>
                                    <div className="text px-3 py-1">
                                    </div>
                                </div>
                                <div className="category-wrap   img d-flex align-items-end" style={{ backgroundImage: `url(${require('images/category-2.jpg')})` }}>
                                    <div className="text px-3 py-1">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="category-wrap   img mb-4 d-flex align-items-end" style={{ backgroundImage: `url(${require('images/category-3.jpg')})` }}>
                            <div className="text px-3 py-1">
                            </div>
                        </div>
                        <div className="category-wrap   img d-flex align-items-end" style={{ backgroundImage: `url(${require('images/category-4.jpg')})` }}>
                            <div className="text px-3 py-1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categories;