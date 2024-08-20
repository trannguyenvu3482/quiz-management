import { useEffect, useState } from "react";
import CrudModal from "./UserCrudModal";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import UserTable from "./UserTable";
import {
  getAllUsers,
  getAllUsersWithPaginate,
} from "../../../services/apiService";
import UserDeleteModal from "./UserDeleteModal";
import UserTablePaginate from "./UserTablePaginate";

const LIMIT_USER = 6;
const ManageUser = () => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userUpdate, setUserUpdate] = useState({});
  const [userDelete, setUserDelete] = useState({});
  const [userView, setUserView] = useState({});
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Admin",
      email: "admin@gmail.com",
      role: "ADMIN",
      image: "",
    },
    {
      id: 2,
      username: "Admin 2",
      email: "admin2@gmail.com",
      role: "ADMIN",
      image: "",
    },
  ]);
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, [show]);

  const fetchListUsersWithPaginate = async (page) => {
    const res = await getAllUsersWithPaginate(page, LIMIT_USER);
    if (res && res.EC === 0) {
      console.log(res.DT);
      setUsers(res.DT.users);
      setMaxPage(res.DT.totalPages);
    }
  };

  const handleUpdateUser = (user) => {
    setUserUpdate(user);
    handleShow();
  };

  const handleViewUser = (user) => {
    setUserView(user);
    handleShow();
  };

  const handleDeleteUser = (user) => {
    setUserDelete(user);
    setShowDelete(true);
  };

  const handleClose = () => {
    setShow(false);
    setUserUpdate({});
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setUserDelete({});
  };

  const handleShow = () => setShow(true);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={handleShow}>
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className="table-users">
          {/* <UserTable
            users={users}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
          /> */}
          <UserTablePaginate
            users={users}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            maxPage={maxPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <CrudModal
          show={show}
          onClose={handleClose}
          fetchListUsers={fetchListUsersWithPaginate}
          userUpdate={userUpdate}
          userView={userView}
          setCurrentPage={setCurrentPage}
        />
        <UserDeleteModal
          show={showDelete}
          userDelete={userDelete}
          onClose={handleCloseDelete}
          fetchListUsers={fetchListUsersWithPaginate}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
