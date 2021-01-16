import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function AddProductModal(props) {
	const { buttonLabel, className, input, handleAdd } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);
	const toggleAdd = () => {
		handleAdd();
		setModal(!modal);
	};

	return (
		<div className={className}>
			<Button
				color="danger"
				onClick={toggle}
				style={{ width: "200px", height: "50px" }}
			>
				{buttonLabel}
			</Button>
			<Modal
				isOpen={modal}
				toggle={toggle}
				contentClassName="bg-dark"
				style={{ color: "#f64b3c" }}
			>
				<ModalHeader toggle={toggle} style={{ border: "none" }}>
					Product Detail
				</ModalHeader>
				<ModalBody>{input}</ModalBody>
				<ModalFooter style={{ border: "none" }}>
					<Button color="danger" onClick={toggleAdd}>
						Add Product
					</Button>{" "}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default AddProductModal;
