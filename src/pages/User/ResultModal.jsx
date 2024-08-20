import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ResultModal = ({ show, setShow, onClose, result, onShowAnswers }) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result of your quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex items-center gap-4 text-xl">
              Total questions:{" "}
              <span className="bg-gray-200 px-4 py-3 font-bold">
                {result.countTotal}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xl">
              Total correct answers:{" "}
              <span className="flex items-center justify-center bg-gray-200 px-4 py-3 text-center font-bold">
                {result.countCorrect}
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onShowAnswers}>
            Show answers
          </Button>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultModal;
