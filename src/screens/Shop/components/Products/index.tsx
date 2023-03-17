import Product from './product';
import SaleProduct from './sale_product';

function Products(props) {
    return (
        <div className="row">

            {
                props.products.map((item, index) => (
                    item.is_sale
                        ?
                        <SaleProduct
                            id={item.id}
                            key={index}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            salePercent={1 - (item.sale_price / item.price)}
                            salePrice={item.sale_price}
                        />
                        :
                        <Product
                            id={item.id}
                            key={index}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                ))
            }

        </div>
    );
}

export default Products;