import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalConfirm = (props) => {
    const { handleClose, show } = props;
    const confirmDelete = () => {};

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Hello</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ModalConfirm;
