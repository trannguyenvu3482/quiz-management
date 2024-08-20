import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "../../services/apiService.js";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 px-40">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => (
          <Card key={`quiz-${index}`} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={
                quiz.image
                  ? `data:image/jpeg;base64,${quiz.image}`
                  : `https://placehold.co/600x400?text=No+Quiz+Image`
              }
            />
            <Card.Body>
              <Card.Title>Đề số {quiz.id}</Card.Title>
              <Card.Text>{quiz.description}</Card.Text>
            </Card.Body>

            <Card.Footer>
              <Button
                variant="primary"
                onClick={() =>
                  navigate(`/quiz/${quiz.id}`, {
                    state: { quizTitle: quiz.description, quizId: quiz.id },
                  })
                }
              >
                Bắt đầu
              </Button>
            </Card.Footer>
          </Card>
        ))}

      {arrQuiz && arrQuiz.length === 0 && <h1>You don't have any quiz now</h1>}
    </div>
  );
};

export default ListQuiz;
