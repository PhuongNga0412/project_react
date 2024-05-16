import { fetchAllUser } from "../services/UserService";
import { useEffect, useState } from "react";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import _ from "lodash";

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    useEffect(() => {
        //call api
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            console.log(res);
            setTotalUsers(res.total);
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
    };

    return (
        <>
            <div className="my-3 add-new">
                <b>List Users:</b>
                <button
                    className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => {
                                                handleEditUser(item);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDeleteUser(item)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={() => setIsShowModalAddNew(false)}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={() => setIsShowModalEdit(false)}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={() => setIsShowModalDelete(false)}
            />
        </>
    );
};
export default TableUsers;
