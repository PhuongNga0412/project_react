import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalAddNew = (props) => {
    const { handleClose, show } = props;
    const [name, setName] = useState(null);
    const [job, setJob] = useState(null);
    const handleSaveUser = () => {
        console.log("name: ", name, "job: ", job);
    };
    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </div>
                        <div class="mb-3">
                            <label className="form-label">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job"
                                value={job}
                                onChange={(event) => {
                                    setJob(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ModalAddNew;
