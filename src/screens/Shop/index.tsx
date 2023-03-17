import { useEffect, useState } from 'react';
import { Breadcrumb } from '../../components';
import { Categories, CustomPagination, Products } from './components';
import { connect } from 'react-redux';
import category_actions from '../../redux/actions/category';
import product_actions from '../../redux/actions/product';


function Shop(props) {
	const [category, setCategory] = useState(null)

	useEffect(
		() => {
			props.fetchCategory()
			props.fetchProducts({ size: 12 })
		}
		, [])

	useEffect(() => {
		if (category === null) {
			props.fetchProducts({ size: 12 })
		}
		else {
			props.fetchProducts({ size: 12, cateid: category })
		}
	}, [category])

	const onPageChange = (page, size) => {
		if (category === null) {
			props.fetchProducts({ page: page, size: 12 })
		}
		else {
			props.fetchProducts({ page: page, size: 12, cateid: category })
		}
	}

	const onCategoryChange = (id) => {
		setCategory(id || null)
	}

	return (
		<>
			<Breadcrumb />
			<section className="ftco-section">
				<div className="container">
					<Categories
						categories={props.category}
						onCategoryChange={onCategoryChange}
					/>
					<Products
						products={props.product}
					/>
					<CustomPagination
						total={props.total_count}
						onPageChange={onPageChange}
					/>
				</div>
			</section>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		category: state.category.category,
		product: state.product.product,
		total_count: state.product.total_count,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCategory: () => {
			dispatch(category_actions.onFetchCategory())
		},
		fetchProducts: (data) => {
			dispatch(product_actions.onFetchProducts(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);