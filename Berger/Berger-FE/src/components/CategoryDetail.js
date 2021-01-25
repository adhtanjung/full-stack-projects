import React from "react";
import LightSpeed from "react-reveal/LightSpeed";

function CategoryDetail(props) {
	const { selectedCategory } = props;
	console.log(selectedCategory);
	const Categorydetail = () => {
		if (selectedCategory === 1) {
			return <h2 className="clickable-category">It’s burger o’clock</h2>;
		} else if (selectedCategory === 2) {
			return <h2 className="clickable-category">Burgers cure what ails you</h2>;
		} else if (selectedCategory === 3) {
			return <h2 className="clickable-category">Extra cheese, please!</h2>;
		} else if (selectedCategory === 4) {
			return <h2 className="clickable-category">GO WILD!</h2>;
		} else {
			return <h2 className="clickable-category">Select your category!</h2>;
		}
	};
	return (
		<LightSpeed right key={selectedCategory}>
			{Categorydetail()}
		</LightSpeed>
	);
}

export default CategoryDetail;
