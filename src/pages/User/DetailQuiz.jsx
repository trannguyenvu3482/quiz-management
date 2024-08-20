import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import { Button } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Question from "./Question";
import { current } from "@reduxjs/toolkit";
import ResultModal from "./ResultModal";

const DetailQuiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [listQuestions, setListQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setResult] = useState({});
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isShowAnswers, setIsShowAnswers] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestion < listQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectAnswer = (status, answerIndex) => {
    const newQuestions = [...listQuestions];
    newQuestions[currentQuestion].answers[answerIndex].isSelected = status;
    setListQuestions(newQuestions);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);

    // Reset all questions

    // Go to quiz page
    navigate("/users");
  };

  const handleFinishQuiz = useCallback(async () => {
    const data = {
      quizId: id * 1,
      answers: listQuestions.map((question) => {
        let userAnswerId = [];

        question.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id * 1);
          }
        });

        return {
          questionId: question.questionId * 1,
          userAnswerId,
        };
      }),
    };

    const res = await postSubmitQuiz(data);
    if (res && res.EC === 0) {
      console.log(res);
      setTimeLeft(0);
      setResult(res.DT);
      setShowResultModal(true);
    } else {
      alert("Submit quiz failed");
    }
  }, [id, listQuestions]);

  const handleShowAnswers = () => {
    setShowResultModal(false);
    setIsShowAnswers(true);

    // Show correct answers
    const newQuestions = [...listQuestions];
    const quizResult = result.quizData;

    newQuestions.forEach((question) => {
      const questionResult = quizResult.find(
        (result) => +result.questionId === +question.questionId,
      );

      if (questionResult) {
        const correctAnswerId = questionResult.systemAnswers[0].id;

        // Check if the answer is isChecked by user and is correct
        question.answers.forEach((answer) => {
          answer.isCorrect = answer.id === correctAnswerId;
        });
      }
    });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDataQuiz(id);
      if (res && res.EC === 0) {
        let data = _.chain(res.DT)
          .groupBy("id")
          .map((value, key) => {
            let answers = [];
            let questionDescription = "";
            let questionImage = "";
            value.forEach((element) => {
              if (element.questionDescription) {
                questionDescription = element.questionDescription;
              }

              if (element.image) {
                questionImage = element.image;
              }

              element.answers.isSelected = false;

              answers.push(element.answers);
            });

            answers = _.orderBy(answers, ["id"], ["asc"]);

            return {
              questionId: key,
              answers,
              questionDescription,
              questionImage,
            };
          })
          .value();

        setListQuestions(data);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      handleFinishQuiz();
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-run the effect
    // when we update it
  }, [timeLeft, handleFinishQuiz]);

  return (
    <div className="detail-quiz-wrapper flex h-screen justify-center bg-gray-100">
      <div className="detail-quiz-container flex h-screen w-full max-w-screen-xl gap-4 bg-white">
        <div className="left-content border-black-400 w-8/12 border-4 p-4">
          <div className="breadcrumbs text-md flex items-center bg-gray-200 pl-2 pt-3">
            <Breadcrumb className="flex items-center">
              <Link className="breadcrumb-item text-blue-400" to="/">
                Home
              </Link>
              <Link className="breadcrumb-item text-blue-400" to="/users">
                Quiz
              </Link>
              <Breadcrumb.Item active>
                Quiz {location?.state?.quizId}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="title mt-2 border-b border-b-gray-400 pb-2 text-4xl font-bold">
            Quiz {location?.state?.quizId}: {location?.state?.quizTitle}
          </div>
          <div className="quiz-body">
            <img src="" alt="" />
          </div>
          <div className="quiz-content mt-4">
            {listQuestions && listQuestions.length > 0 && (
              <Question
                index={currentQuestion}
                question={listQuestions[currentQuestion]}
                onSelectAnswer={handleSelectAnswer}
                isViewingAnswers={isShowAnswers}
              />
            )}
          </div>
          <div className="quiz-footer flex w-full justify-center gap-2">
            <Button
              variant="danger"
              disabled={currentQuestion === 0}
              className="align-center flex justify-center gap-2 text-center"
              onClick={handlePrevQuestion}
            >
              <FaChevronLeft className="h-full" size="10px" />
              <span>Prev</span>
            </Button>
            <Button
              variant="danger"
              className="align-center flex justify-center gap-2 text-center"
              disabled={currentQuestion === listQuestions.length - 1}
              onClick={handleNextQuestion}
            >
              <FaChevronRight className="h-full" size="10px" />
              <span>Next</span>
            </Button>
            <Button
              variant="warning"
              className="align-center flex justify-center gap-2 text-center"
              onClick={handleFinishQuiz}
              disabled={isShowAnswers}
            >
              <FaCheck className="h-full" size="16px" color="black" />
              <span>Finish</span>
            </Button>
          </div>
        </div>
        <div className="right-content border-black-400 w-4/12 border-4 p-4">
          <div className="timer flex items-center justify-center border-b-2 border-gray-300 py-2">
            <h1 className="text-3xl font-bold">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </h1>
          </div>
          <div className="questions-numbers mt-2 flex flex-wrap gap-3">
            {listQuestions.map((question, index) => (
              <button
                key={index}
                className={`question-number h-12 w-12 rounded-full border-2 border-gray-400 text-center text-lg font-bold text-gray-400 ${
                  currentQuestion === index ? "bg-red-400 text-white" : ""
                } ${
                  question.answers.some((answer) => answer.isSelected)
                    ? "bg-green-400 text-white"
                    : ""
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResultModal
        show={showResultModal}
        setShow={setShowResultModal}
        onClose={handleCloseModal}
        result={result}
        onShowAnswers={handleShowAnswers}
      />
    </div>
  );
};

export default DetailQuiz;
