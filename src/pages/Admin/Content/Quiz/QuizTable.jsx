import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  deleteQuiz,
  getQuizById,
  putUpdateQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import EditQuizModal from "./EditQuizModal";
import CloseQuizModal from "./DeleteQuizModal";
const QuizTable = ({ reload }) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatingQuiz, setUpdatingQuiz] = useState({});
  const [deletingQuiz, setDeletingQuiz] = useState({});

  useEffect(() => {
    const fetchQuizList = async () => {
      const res = await getQuizById("all");

      if (res && res.EC === 0) {
        setListQuiz(res.DT);
      }

      if (res && res.EC !== 0) {
        toast.error(res.EM);
      }
    };

    fetchQuizList();
  }, [showEditModal, showDeleteModal, reload]);

  const handleShowEditModal = (quiz) => {
    setUpdatingQuiz(quiz);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (quiz) => {
    setDeletingQuiz(quiz);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setUpdatingQuiz({});
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setDeletingQuiz({});
    setShowDeleteModal(false);
  };

  const handleDeleteQuiz = async () => {
    const res = await deleteQuiz(deletingQuiz.id);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setShowDeleteModal(false);
      setDeletingQuiz({});
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleEditQuiz = async (newQuiz) => {
    setShowEditModal(false);
    const res = await putUpdateQuiz(newQuiz);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      showEditModal(false);
      setUpdatingQuiz({});
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Table className="mt-4" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quiz difficulty</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz.length > 0 &&
            listQuiz.map((quiz, index) => (
              <tr className="h-20" key={`quiz-${index}`}>
                <td>{index + 1}</td>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td>{quiz.difficulty}</td>
                <td>
                  {quiz.image ? (
                    <img
                      src={`data:image/png;base64,${quiz.image}`}
                      alt={quiz.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning mr-4"
                    onClick={() => handleShowEditModal(quiz)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(quiz)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <EditQuizModal
        quiz={updatingQuiz}
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEditQuiz={handleEditQuiz}
      />
      <CloseQuizModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteQuiz}
      />
    </>
  );
};

export default QuizTable;
