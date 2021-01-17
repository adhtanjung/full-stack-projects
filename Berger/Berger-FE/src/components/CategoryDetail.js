import React from "react";
import LightSpeed from "react-reveal/LightSpeed";

function CategoryDetail(props) {
	const { selectedCategory, getProducts } = props;
	const Categorydetail = () => {
		if (selectedCategory === 1 && getProducts.length !== 0) {
			return (
				<LightSpeed right>
					<h2>Pick your favorite burger from all sizes!</h2>
				</LightSpeed>
			);
		} else if (selectedCategory === 2 && getProducts.length !== 0) {
			return (
				<LightSpeed right>
					<h2>Best option if you wanna stay sharp and lean!</h2>
				</LightSpeed>
			);
		} else if (selectedCategory === 3 && getProducts.length !== 0) {
			return (
				<LightSpeed right>
					<h2>The safe option that everyone loves!</h2>
				</LightSpeed>
			);
		} else if (selectedCategory === 4 && getProducts.length !== 0) {
			return (
				<LightSpeed right>
					<h2>GO WILD!</h2>
				</LightSpeed>
			);
		} else {
			return (
				<LightSpeed right>
					<h2>Select your category!</h2>
				</LightSpeed>
			);
		}
	};
	return <div>{Categorydetail()}</div>;
}

export default CategoryDetail;
