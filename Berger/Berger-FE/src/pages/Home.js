import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { fetchProductsAction, addToCartAction } from "../redux/actions";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Bounce from "react-reveal/Bounce";
import gsap from "gsap";

function Home(props) {
	const [disabled] = useState(false);
	const [getProducts, setGetProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);

	// const disable = () => {
	// 	setDisabled(!disabled);
	// 	setTimeout(() => {
	// 		setDisabled(false);
	// 	}, 500);
	// };
	const handleHover = (e) => {
		gsap.to(e.target, {
			duration: 0.3,
			y: 3,
			skewX: 4,
			ease: "power1.inOut",
		});
	};
	// };
	const handleExit = (e) => {
		gsap.to(e.target, {
			duration: 0.3,
			y: -3,
			skewX: 0,
			ease: "power1.inOut",
		});
	};
	const handleAddToCart = (id) => {
		if (props.userID !== 0) {
			props.addToCartAction(id);
			swal({
				title: "Added to cart!",
				icon: "success",
			});
		} else {
			swal({
				title: "You need to login first!",
				icon: "warning",
			});
		}
	};
	useEffect(() => {
		props.fetchProductsAction();
	}, []);

	const renderProducts = () => {
		return getProducts.map((val) => {
			return (
				<div key={val.id} className="m-4">
					<Bounce right>
						<div className="d-flex flex-column">
							<Link to={`/product-detail?${val.id}`}>
								<div>
									<img
										src={val.image}
										alt="img not found"
										height="130px"
										width="170px"
									/>
								</div>
							</Link>
							<div className="d-flex justify-content-between">
								<div>
									<h6>{val.name}</h6>
									<p>{val.price}</p>
								</div>
								<div>
									<Button
										color="warning"
										onClick={() => handleAddToCart(val.id)}
									>
										add to cart
									</Button>
								</div>
							</div>
						</div>
					</Bounce>
				</div>
			);
		});
	};
	const filterCategory = (i) => {
		setSelectedCategory(i);
		if (getProducts.length !== 0) {
			setGetProducts([]);
		} else {
			if (i === 1) {
				axios
					.get(`${api_url}/products`)
					.then((res) => {
						setGetProducts(res.data);
					})
					.catch((err) => {});
			} else {
				axios
					.get(`${api_url}/products?category=${i}`)
					.then((res) => {
						setGetProducts(res.data);
					})
					.catch((err) => {});
			}
		}
	};
	const categoryDetail = () => {
		if (selectedCategory === 1 && getProducts.length !== 0) {
			return <h2>Pick your favorite burger from all sizes!</h2>;
		} else if (selectedCategory === 2 && getProducts.length !== 0) {
			return <h2>Best option if you wanna stay sharp and lean!</h2>;
		} else if (selectedCategory === 3 && getProducts.length !== 0) {
			return <h2>The safe option that everyone loves!</h2>;
		} else if (selectedCategory === 4 && getProducts.length !== 0) {
			return <h2>GO WILD!</h2>;
		} else {
			return <h2>Select your category!</h2>;
		}
	};
	return (
		<div
			className="d-flex p-3 align-items-center justify-content-center main-body "
			style={{ width: "100%", height: "auto", paddingTop: "40px" }}
		>
			<div className="d-flex w-50 flex-column">
				<p
					className="clickable clickable-category"
					onClick={() => filterCategory(1)}
					onMouseOver={(e) => handleHover(e)}
					onMouseOut={(e) => handleExit(e)}
				>
					All Burgers
				</p>
				<div className="d-flex flex-wrap ">
					{selectedCategory === 1 ? renderProducts() : null}
				</div>

				<p
					className="clickable clickable-category"
					onClick={() => filterCategory(2)}
					disabled={disabled}
					onMouseOver={(e) => handleHover(e)}
					onMouseOut={(e) => handleExit(e)}
				>
					Small Burgers
				</p>
				<div className="d-flex flex-wrap justify-content-center">
					{selectedCategory === 2 ? renderProducts() : null}
				</div>
				<p
					className="clickable clickable-category "
					onClick={() => filterCategory(3)}
					onMouseOver={(e) => handleHover(e)}
					onMouseOut={(e) => handleExit(e)}
				>
					Medium Burgers
				</p>
				<div className="d-flex flex-wrap justify-content-center">
					{selectedCategory === 3 ? renderProducts() : null}
				</div>
				<p
					className="clickable clickable-category"
					onClick={() => filterCategory(4)}
					onMouseOver={(e) => handleHover(e)}
					onMouseOut={(e) => handleExit(e)}
				>
					Large Burger
				</p>
				<div className="d-flex flex-wrap justify-content-center">
					{selectedCategory === 4 ? renderProducts() : null}
				</div>
			</div>
			<div>{categoryDetail()}</div>
		</div>
	);
}
const mapStateToProps = ({ product, user }) => {
	return {
		productList: product.productList,
		userID: user.id,
	};
};
export default connect(mapStateToProps, {
	fetchProductsAction,
	addToCartAction,
})(Home);
