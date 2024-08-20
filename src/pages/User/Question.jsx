import _ from "lodash";

const Question = ({ index, question, onSelectAnswer, isViewingAnswers }) => {
  if (_.isEmpty(question)) {
    return <h1>Loading...</h1>;
  }

  const handleSelectAnswer = (event) => {
    onSelectAnswer(event.target.checked, event.target.id.split("-")[1] * 1);
  };

  return (
    <>
      {question.questionImage && (
        <div className="flex w-full justify-center border-b-2 border-gray-200 pb-3">
          <img
            className="w-96"
            src={`data:image/jpeg;base64,${question.questionImage}`}
            alt=""
          />
        </div>
      )}
      <div className="question mt-2 text-2xl font-bold">
        Question {index + 1}: {question.questionDescription}
      </div>
      <div className="answers">
        {question.answers.map((answer, index) => {
          return (
            <div
              key={`answer-${index}`}
              className="answer flex items-center gap-2"
            >
              <input
                type="checkbox"
                id={`answer-${index}`}
                onChange={handleSelectAnswer}
                checked={answer.isSelected}
                disabled={isViewingAnswers}
              />
              <label htmlFor={`answer-${index}`}>{answer.description}</label>

              {isViewingAnswers && (answer.isSelected || answer.isCorrect) && (
                <div
                  className={`${
                    answer.isCorrect
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                  } rounded-full px-2 py-1`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Question;
