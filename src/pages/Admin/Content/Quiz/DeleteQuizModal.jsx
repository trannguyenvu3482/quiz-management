import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const DeleteQuizModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure that you are deleting this quiz?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteQuizModal;
