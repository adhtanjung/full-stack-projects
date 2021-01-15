import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { api_url } from "../helpers/api_url";

function ProductDetail(props) {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = () => {
			const id = props.location.search.split("?")[1];
			axios
				.get(`${api_url}/products/${id}`)
				.then((res) => {
					setProduct(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchProduct();
	}, []);
	const handleAddToCart = () => {
		const data = {
			name: product.name,
			image: product.image,
			category: product.category,
			price: product.price,
		};
		axios
			.post(`${api_url}/cart`, data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			{product.name}

			<div>
				<Button onClick={handleAddToCart}>add to cart</Button>
			</div>
		</div>
	);
}

export default ProductDetail;
