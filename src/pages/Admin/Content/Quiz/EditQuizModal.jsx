import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const OPTIONS = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];

const EditQuizModal = ({ quiz, show, handleClose, handleEditQuiz }) => {
  const [editingQuiz, setEditingQuiz] = useState({
    id: "",
    name: "",
    description: "",
    difficulty: "",
    image: "",
  });

  useEffect(() => {
    setEditingQuiz(quiz);
  }, [quiz]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Editing quiz {editingQuiz.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={editingQuiz.name}
              onChange={(e) =>
                setEditingQuiz({ ...editingQuiz, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={editingQuiz.description}
              onChange={(e) =>
                setEditingQuiz({ ...editingQuiz, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Difficulty</Form.Label>
            <Select
              defaultValue={editingQuiz.difficulty || "EASY"}
              options={OPTIONS}
              onChange={(e) =>
                setEditingQuiz({ ...editingQuiz, difficulty: e.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleEditQuiz(editingQuiz)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditQuizModal;
