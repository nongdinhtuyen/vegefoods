import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions/user'

function Header(props) {
    const [dropdown, setDropdown] = useState('');

    let dropdownHandle = () => {
        if (dropdown !== '') {
            setDropdown('')
        }
        else {
            setDropdown('show')
        }
    }


    return (
        <>
            <div className="py-1 bg-primary">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
                        <div className="col-lg-12 d-block">
                            <div className="row d-flex">
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
                                    <span className="text">097 800 4683</span>
                                </div>
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                                    <span className="text">sonnam99@gmail.com</span>
                                </div>
                                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                                    <span className="text">3-5 Business days delivery &amp; Free Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Link class="navbar-brand" to="/">Vegefoods</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
	                </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><Link to="/" class="nav-link">Home</Link></li>
                            <li className={`nav-item dropdown ${dropdown}`} onClick={dropdownHandle}>
                                <Link class="nav-link dropdown-toggle" to="#">Shop</Link>
                                <div className={`dropdown-menu ${dropdown}`} >
                                    <Link class="dropdown-item" to="/shop">Shop</Link>
                                    <Link class="dropdown-item" to="/cart">Cart</Link>
                                </div>
                            </li>
                            <li className="nav-item cta cta-colored"><Link to="/cart" class="nav-link"><span className="icon-shopping_cart"></span></Link></li>
                            {
                                props.login ?
                                    <li className="nav-item" onClick={props.onLogout} ><Link to="/login" class="nav-link">Logout</Link></li>
                                    :
                                    <li className="nav-item"><Link to="/login" class="nav-link">Login</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.user.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(actions.onLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);