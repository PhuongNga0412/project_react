import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { putUpdateUser } from "../services/UserService";

const ModalEditUser = (props) => {
    const { handleClose, show, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updateAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
            });
            handleClose();
            toast.success("Update user success");
        }
    };
    console.log("check", dataUserEdit);

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit A User</Modal.Title>
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
                    <Button variant="primary" onClick={handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ModalEditUser;
