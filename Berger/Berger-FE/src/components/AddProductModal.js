import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function AddProductModal(props) {
	const { buttonLabel, className, input } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);
	return (
		<div className={className}>
			<Button
				color="danger"
				onClick={toggle}
				style={{ width: "200px", height: "50px" }}
			>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Product Detail</ModalHeader>
				<ModalBody>{input}</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>
						Do Something
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
