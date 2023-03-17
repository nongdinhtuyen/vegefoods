import {Link} from 'react-router-dom';

function CaroselItem(props) {
    const {
        image,
        text,
        memo
    } = props
    return (
        <div>
            <div className="slider-item" style={{ backgroundImage: `url(${image})` }} >
                <div className="overlay" />
                <div className="container">
                    <div className="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">
                        <div className="col-md-12 text-center">
                            <h1 className="mb-2">{text}</h1>
                            <h2 className="subheading mb-4">{memo}</h2>
                            <p><Link to="/shop" class="btn btn-primary">View Details</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaroselItem;