import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteOneUser } from "../../../services/apiService";

const UserDeleteModal = ({
  show,
  onClose,
  userDelete,
  fetchListUsers,
  setCurrentPage,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteOneUser(userDelete.id);
    if (res && res.EC === 0) {
      fetchListUsers(1);
      onClose();
      setCurrentPage(1);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete user <b>{userDelete.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={onClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDeleteModal;
