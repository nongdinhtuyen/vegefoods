import utils from 'common/utils';
import {Link} from 'react-router-dom';

function Product(props) {

    return (
        <div className="col-md-6 col-lg-3">
            <div className="product">
                <Link to={`/product/${props.id}`} className="img-prod"><img className="img-fluid" src={utils.baseUrlImage(props.image)} alt="Colorlib Template" />
                    <div className="overlay"></div>
                </Link>
                <div className="text py-3 pb-4 px-3 text-center">
                    <h3><Link to={`/product/${props.id}`}>{props.name}</Link></h3>
                    <div className="d-flex">
                        <div className="pricing">
                            <p className="price"><span>${props.price.toFixed(2)}</span></p>
                        </div>
                    </div>
                    <div className="bottom-area d-flex px-3">
                        <div className="m-auto d-flex">
                            <a href="#" className="add-to-cart d-flex justify-content-center align-items-center text-center">
                                <span><i className="ion-ios-menu"></i></span>
                            </a>
                            <a href="#" className="buy-now d-flex justify-content-center align-items-center mx-1">
                                <span><i className="ion-ios-cart"></i></span>
                            </a>
                            <a href="#" className="heart d-flex justify-content-center align-items-center ">
                                <span><i className="ion-ios-heart"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;