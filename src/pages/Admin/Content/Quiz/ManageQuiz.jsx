import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { postAddQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import QuizTable from "./QuizTable";
import { Accordion } from "react-bootstrap";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
const options = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];

const ManageQuiz = () => {
  const [quizInfo, setQuizInfo] = useState({
    name: "",
    description: "",
    difficulty: "EASY",
    image: null,
  });
  const [reload, setReload] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      console.log(e.target.files[0].name);
      setQuizInfo({ ...quizInfo, image: e.target.files[0] });
      return;
    }

    setQuizInfo({ ...quizInfo, [name]: value });
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();

    if (!quizInfo.name || !quizInfo.description) {
      toast.error("Please fill in name and description");
      return;
    }

    const res = await postAddQuiz(quizInfo);
    console.log(res);

    if (res && res.EC === 0) {
      setQuizInfo({
        name: "",
        description: "",
        difficulty: "EASY",
        image: null,
      });
      setReload(!reload);
      toast.success("Add quiz successfully");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container p-2">
      <Accordion className="mt-2" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <form>
              <fieldset className="rounded-sm border">
                <legend className="font-md float-none w-auto px-3">
                  Add new quiz
                </legend>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Your quiz name"
                    name="name"
                    value={quizInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Your quiz description"
                    value={quizInfo.description}
                    onChange={handleInputChange}
                    required
                  />
                </FloatingLabel>
                <div className="mt-4 w-full">
                  <Select
                    options={options}
                    placeholder="Quiz difficulty"
                    defaultValue={quizInfo.type}
                    onChange={(e) =>
                      setQuizInfo({ ...quizInfo, difficulty: e.value })
                    }
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Upload image</label>
                  <input
                    className="form-control mt-1"
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-warning mt-3 w-full py-2"
                  onClick={handleAddQuiz}
                >
                  Add quiz
                </button>
              </fieldset>
            </form>
            <div className="quiz-table p-2">
              <h1 className="text-2xl font-bold">Manage Quizzes</h1>
              <QuizTable reload={reload} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
