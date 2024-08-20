import { useEffect, useState } from "react";
import Select from "react-select";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { InputGroup } from "react-bootstrap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _, { cloneDeep } from "lodash";
import { FaSave } from "react-icons/fa";
import Lightbox from "react-18-image-lightbox";
import {
  getQuizById,
  getQuizWithQA,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",

      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [currentPreviewImage, setCurrentPreviewImage] = useState({
    imageFile: "",
    imageName: "",
  });
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuizList();
  }, []);

  const fetchQuizList = async () => {
    const res = await getQuizById("all");

    if (res && res.EC === 0) {
      let quizList = res.DT.map((quiz) => ({
        label: `${quiz.id} - ${quiz.description}`,
        value: quiz.id,
      }));

      setListQuiz(quizList);
      console.log(quizList);
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleAddRemoveQuestion = (type, index) => {
    let newQuestions = cloneDeep(questions);
    if (type === "add") {
      newQuestions.splice(index + 1, 0, {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      });
    } else {
      newQuestions.splice(index, 1);
    }
    setQuestions(newQuestions);
  };

  const handleAddRemoveAnswer = (type, questionIndex, answerIndex) => {
    let newQuestions = cloneDeep(questions);
    if (type === "add") {
      newQuestions[questionIndex].answers.splice(answerIndex + 1, 0, {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      });
    } else {
      newQuestions[questionIndex].answers.splice(answerIndex, 1);
    }
    setQuestions(newQuestions);
  };

  const handleCheckbox = (questionIndex, answerIndex) => {
    let newQuestions = cloneDeep(questions);
    newQuestions[questionIndex].answers[answerIndex].isCorrect =
      !newQuestions[questionIndex].answers[answerIndex].isCorrect;
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (e, questionIndex) => {
    let newQuestions = cloneDeep(questions);
    newQuestions[questionIndex].description = e.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    let newQuestions = cloneDeep(questions);
    newQuestions[questionIndex].answers[answerIndex].description =
      e.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionImage = (e, questionIndex) => {
    let newQuestions = cloneDeep(questions);
    newQuestions[questionIndex].imageFile = e.target.files[0];
    newQuestions[questionIndex].imageName = e.target.files[0].name;
    setQuestions(newQuestions);
  };

  const handleSaveQuestions = async () => {
    // Validate questions
    let isValid = true;
    questions.forEach((question) => {
      if (question.description === "") {
        toast.error("Please fill in all questions' description");
        isValid = false;
      }

      question.answers.forEach((answer) => {
        if (answer.description === "") {
          toast.error("Please fill in all answers' description");
          isValid = false;
        }
      });

      if (question.answers.filter((answer) => answer.isCorrect).length === 0) {
        toast.error("Please select at least one correct answer");
        isValid = false;
      }
    });

    if (!isValid) return;

    // Submit questions
    questions.forEach(async (question) => {
      const res1 = await postCreateNewQuestionForQuiz(
        selectedQuiz.value,
        question.description,
        question.imageFile,
      );

      if (res1 && res1.EC === 0) {
        toast.success(res1.EM);
        question.answers.forEach(async (answer) => {
          const res = await postCreateNewAnswerForQuestion(
            res1.DT.id,
            answer.description,
            answer.isCorrect,
          );

          if (res && res.EC === 0) {
            toast.success(res.DT);
          }

          if (res && res.EC !== 0) {
            toast.error(res.EM);
          }
        });
      }

      if (res1 && res1.EC !== 0) {
        toast.error(res1.EM);
      }
    });

    setQuestions(initQuestions);
  };

  const handlePreviewImage = (question) => {
    setCurrentPreviewImage({
      imageFile: question.imageFile,
      imageName: `${question.description} `,
    });
    setIsPreviewImage(true);
  };

  const handleSelectedQuiz = async (selectedOption) => {
    const res = await getQuizById(selectedOption.value);
    setSelectedQuiz(selectedOption);
  };

  return (
    <div className="questions-container p-4">
      <div className="add-new-question mt-4">
        <div className="form-group w-6/12">
          <label>Select quiz</label>
          <Select
            className=""
            defaultValue={selectedQuiz}
            onChange={() => handleSelectedQuiz(selectedQuiz)}
            options={listQuiz}
          />
        </div>
        {!_.isEmpty(selectedQuiz) ? (
          <>
            <p className="mt-4 text-xl">Add questions:</p>
            <div className="questions">
              {questions &&
                questions.length > 0 &&
                questions.map((question, questionIndex) => (
                  <div
                    key={question.id}
                    className="question mt-3 flex flex-col border-b-2 border-gray-400"
                  >
                    <div className="questions-content flex w-full items-center gap-4">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={`Question ${questionIndex + 1}'s description`}
                        className="w-6/12"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                          value={question.description}
                          onChange={(e) =>
                            handleQuestionChange(e, questionIndex)
                          }
                        />
                      </FloatingLabel>
                      <div className="flex w-3/12 items-center justify-center gap-2">
                        <label
                          className="cursor-pointer rounded-md border-2 px-2 py-1 text-blue-600 hover:text-blue-800"
                          htmlFor={question.id}
                        >
                          <BiImageAdd size="30px" />
                        </label>
                        <input
                          id={question.id}
                          type="file"
                          className="form-control"
                          hidden
                          onChange={(e) =>
                            handleQuestionImage(e, questionIndex)
                          }
                        />
                        {question.imageName ? (
                          <span
                            className="cursor-pointer overflow-hidden text-ellipsis hover:font-bold hover:text-blue-300"
                            onClick={() => handlePreviewImage(question)}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          <span>No image was uploaded</span>
                        )}
                      </div>
                      <div className="flex w-3/12">
                        <button
                          className="btn btn-clear flex items-center gap-2 border-none text-red-500 hover:text-red-600"
                          onClick={() =>
                            handleAddRemoveQuestion("add", questionIndex)
                          }
                        >
                          <BsFillPatchPlusFill size="30px" />
                        </button>
                        {questions.length > 1 && (
                          <button
                            className="btn btn-clear flex items-center gap-2 border-none text-green-500 hover:text-green-600"
                            onClick={() =>
                              handleAddRemoveQuestion("remove", questionIndex)
                            }
                          >
                            <BsFillPatchMinusFill size="30px" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="answers-content ml-8 mt-4 w-6/12">
                      {question.answers &&
                        question.answers.length > 0 &&
                        question.answers.map((answer, answerIndex) => (
                          <InputGroup
                            key={answer.id}
                            className="mb-3 flex h-full items-center"
                          >
                            <input
                              className="ml-2 mr-4 h-5 w-5 p-2"
                              type="checkbox"
                              name={`answer-${answerIndex}`}
                              checked={answer.isCorrect}
                              onChange={() =>
                                handleCheckbox(questionIndex, answerIndex)
                              }
                            />
                            <FloatingLabel
                              controlId="floatingInput"
                              label={`Answer ${answerIndex + 1}`}
                              className="h-full"
                            >
                              <Form.Control
                                type="text"
                                placeholder={`Answer ${answerIndex + 1}`}
                                value={answer.description}
                                onChange={(e) =>
                                  handleAnswerChange(
                                    e,
                                    questionIndex,
                                    answerIndex,
                                  )
                                }
                              />
                            </FloatingLabel>
                            <button
                              className="btn btn-clear flex h-full items-center gap-2 border-none text-red-500 hover:text-red-600"
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "add",
                                  questionIndex,
                                  answerIndex,
                                )
                              }
                            >
                              <FiPlusCircle size="30px" />
                            </button>
                            {question.answers.length > 1 && (
                              <button
                                className="btn btn-clear flex items-center gap-2 border-none text-green-500 hover:text-green-600"
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "remove",
                                    questionIndex,
                                    answerIndex,
                                  )
                                }
                              >
                                <FiMinusCircle size="30px" />
                              </button>
                            )}
                          </InputGroup>
                        ))}
                    </div>
                  </div>
                ))}

              {questions && questions.length > 0 && (
                <button
                  className="btn btn-primary btn-lg mt-4 flex items-center gap-1"
                  onClick={handleSaveQuestions}
                >
                  <FaSave size="20px" />
                  Save Questions
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="mt-4 text-xl">Please select a quiz to add questions</p>
        )}
      </div>
      <div className="image-preview">
        {isPreviewImage && (
          <Lightbox
            mainSrc={`${URL.createObjectURL(currentPreviewImage.imageFile)}`}
            imageTitle={currentPreviewImage.imageName}
            onCloseRequest={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuizQA;
