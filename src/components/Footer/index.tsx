
function Footer(props) {

  const scrollToTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }
    return (

        <>
            <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
                <div className="container py-4">
                    ie<div className="row d-flex justify-content-center py-5">
                        <div className="col-md-6">
                            <h2 style={{ fontSize: '22px' }} className="mb-0">Subcribe to our Newsletter</h2>
                            <span>Get e-mail updates about our latest shops and special offers</span>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <input type="text" className="form-control" placeholder="Enter email address" />
                                    <input type="submit" value="Subscribe" className="submit px-3" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="ftco-footer ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="mouse">
                            <div onClick={scrollToTop} className="mouse-icon">
                                <div className="mouse-wheel"><span className="ion-ios-arrow-up"></span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Vegefoods</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li><a href="#"><span className="icon-twitter"></span></a></li>
                                    <li><a href="#"><span className="icon-facebook"></span></a></li>
                                    <li><a href="#"><span className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Menu</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="py-2 d-block">Shop</a></li>
                                    <li><a href="#" className="py-2 d-block">About</a></li>
                                    <li><a href="#" className="py-2 d-block">Journal</a></li>
                                    <li><a href="#" className="py-2 d-block">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Help</h2>
                                <div className="d-flex">
                                    <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                                        <li><a href="#" className="py-2 d-block">Shipping Information</a></li>
                                        <li><a href="#" className="py-2 d-block">Returns &amp; Exchange</a></li>
                                        <li><a href="#" className="py-2 d-block">Terms &amp; Conditions</a></li>
                                        <li><a href="#" className="py-2 d-block">Privacy Policy</a></li>
                                    </ul>
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="py-2 d-block">FAQs</a></li>
                                        <li><a href="#" className="py-2 d-block">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Have a Questions?</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                        <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                                        <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;