import {Link} from 'react-router-dom';

function Categories(props) {
    return (
        <section className="ftco-section ftco-category ftco-no-pt">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 order-md-last align-items-stretch d-flex">
                                <div className="category-wrap-2   img align-self-stretch d-flex" style={{ backgroundImage: 'url(images/category.jpg)' }}>
                                    <div className="text text-center">
                                        <h2>Vegetables</h2>
                                        <p>Protect the health of every home</p>
                                        <p><Link to="/shop" class="btn btn-primary">Shop now</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="category-wrap   img mb-4 d-flex align-items-end" style={{ backgroundImage: 'url(images/category-1.jpg)' }}>
                                    <div className="text px-3 py-1">
                                    </div>
                                </div>
                                <div className="category-wrap   img d-flex align-items-end" style={{ backgroundImage: 'url(images/category-2.jpg)' }}>
                                    <div className="text px-3 py-1">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="category-wrap   img mb-4 d-flex align-items-end" style={{ backgroundImage: 'url(images/category-3.jpg)' }}>
                            <div className="text px-3 py-1">
                            </div>
                        </div>
                        <div className="category-wrap   img d-flex align-items-end" style={{ backgroundImage: 'url(images/category-4.jpg)' }}>
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