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
	const [getProducts, setGetProducts] = useState(undefined);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [onLoad, setOnLoad] = useState(false);
	const [selected, setSelected] = useState(false);

	const handleHover = (e) => {
		gsap.to(e.target, {
			duration: 0.3,
			y: 3,
			skewX: 4,
			ease: "power1.inOut",
		});
	};
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
	const handleLoadStart = (e) => {
		gsap.to(e.target, {
			duration: 2.5,
			ease: "power1.out",
			x: -500,
		});
	};
	useEffect(() => {
		props.fetchProductsAction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setGetProducts(props.productList);
	}, []);

	const renderProducts = (i) => {
		if (selectedCategory === i) {
			return getProducts.map((val) => {
				return (
					<div
						key={val.id}
						className="m-4"
						style={{ display: `${selected ? "" : "none"}` }}
					>
						<Bounce right>
							<div className="d-flex flex-column">
								<Link to={`/product-detail?${val.id}`}>
									<div>
										<img
											src={`${onLoad ? api_url + val.image : spinnerGif}  `}
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
		} else {
			return null;
		}
	};
	const filterCategory = async (i) => {
		try {
			setSelectedCategory(i);
			if (selectedCategory === i) {
				setSelected(!selected);
			} else {
				setSelected(true);
			}
			if (i === 1) {
				setGetProducts(props.productList);
			} else {
				const filteredProducts = await props.productList.filter((val) => {
					return val.category === i;
				});
				setGetProducts(filteredProducts);
				console.log(filteredProducts);
			}
		} catch (err) {
			console.log(err);
		}
	};
	console.log(getProducts);
	if (props.loading) {
		return <Spinner type="grow" />;
	}
	return (
		<div
			className="d-flex p-3 align-items-center justify-content-center main-body pt-5 pl-5"
			style={{ width: "100%", height: "auto", paddingTop: "40px" }}
		>
			<div className="d-flex w-50 flex-column">
				<p
					className="clickable clickable-category"
					onClick={() => filterCategory(1)}
					onMouseOver={(e) => handleHover(e)}
					onMouseOut={(e) => handleExit(e)}
					onLoadStart={(e) => handleLoadStart(e)}
				>
					All Burgers
				</p>

				<div className="d-flex flex-wrap ">{renderProducts(1)}</div>
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

				<div className="d-flex flex-wrap">{renderProducts(2)}</div>
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

				<div className="d-flex flex-wrap">{renderProducts(3)}</div>
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
				<div className="d-flex flex-wrap">{renderProducts(4)}</div>
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
