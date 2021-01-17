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
import { Spinner } from "reactstrap";
import spinnerGif from "../components/Rolling-1s-200px.svg";
import CategoryDetail from "../components/CategoryDetail";
import LightSpeed from "react-reveal/LightSpeed";

function Home(props) {
	const [disabled] = useState(false);
	const [getProducts, setGetProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [onLoad, setOnLoad] = useState(false);

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
										src={onLoad ? val.image : spinnerGif}
										alt="img not found"
										height={onLoad ? "130px" : ""}
										width={onLoad ? "170px" : "30px"}
										onLoad={() => setOnLoad(true)}
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
					.catch((err) => {
						console.log(err);
					});
			} else {
				axios
					.get(`${api_url}/products?category=${i}`)
					.then((res) => {
						setGetProducts(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	if (props.loading) {
		return <Spinner type="grow" />;
	}
	return (
		<div
			className="d-flex p-3 align-items-center justify-content-center main-body pt-5 pl-5"
			style={{ width: "100%", height: "auto", paddingTop: "40px" }}
		>
			<div className="d-flex w-50 flex-column">
				<LightSpeed left>
					<p
						className="clickable clickable-category"
						onClick={() => filterCategory(1)}
						onMouseOver={(e) => handleHover(e)}
						onMouseOut={(e) => handleExit(e)}
					>
						All Burgers
					</p>
				</LightSpeed>
				<div className="d-flex flex-wrap ">
					{selectedCategory === 1 ? renderProducts() : null}
				</div>
				<LightSpeed left>
					<p
						className="clickable clickable-category"
						onClick={() => filterCategory(2)}
						disabled={disabled}
						onMouseOver={(e) => handleHover(e)}
						onMouseOut={(e) => handleExit(e)}
					>
						Small Burgers
					</p>
				</LightSpeed>

				<div className="d-flex flex-wrap">
					{selectedCategory === 2 ? renderProducts() : null}
				</div>
				<LightSpeed left>
					<p
						className="clickable clickable-category "
						onClick={() => filterCategory(3)}
						onMouseOver={(e) => handleHover(e)}
						onMouseOut={(e) => handleExit(e)}
					>
						Medium Burgers
					</p>
				</LightSpeed>

				<div className="d-flex flex-wrap">
					{selectedCategory === 3 ? renderProducts() : null}
				</div>
				<LightSpeed left>
					<p
						className="clickable clickable-category"
						onClick={() => filterCategory(4)}
						onMouseOver={(e) => handleHover(e)}
						onMouseOut={(e) => handleExit(e)}
					>
						Large Burger
					</p>
				</LightSpeed>
				<div className="d-flex flex-wrap">
					{selectedCategory === 4 ? renderProducts() : null}
				</div>
			</div>
			<div className="d-flex w-50 justify-content-center">
				<CategoryDetail
					selectedCategory={selectedCategory}
					getProducts={getProducts}
				/>
			</div>
		</div>
	);
}
const mapStateToProps = ({ product, user }) => {
	return {
		productList: product.productList,
		userID: user.id,
		loading: product.loading,
	};
};
export default connect(mapStateToProps, {
	fetchProductsAction,
	addToCartAction,
})(Home);
