import axios from "../utils/axiosConfig";
const postCreateNewUser = (data) => {
  return axios.post("api/v1/participant", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const getAllUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const putUpdateUser = (data) => {
  return axios.put("api/v1/participant", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteOneUser = (id) => {
  return axios.delete(`api/v1/participant/`, {
    data: { id },
  });
};

const loginUser = (data) => {
  return axios.post("api/v1/login", { ...data, delay: 1000 });
};

const registerUser = (email, username, password) => {
  return axios.post("api/v1/register", { email, username, password });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postAddQuiz = (data) => {
  return axios.post("api/v1/quiz", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getQuizById = (id) => {
  return axios.get(`api/v1/quiz/${id}`);
};

const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const putUpdateQuiz = (data) => {
  return axios.put("api/v1/quiz", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  return axios.post(
    "api/v1/question",
    { quiz_id, description, questionImage },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const postCreateNewAnswerForQuestion = (
  question_id,
  description,
  correct_answer
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const assignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (id) => {
  return axios.get(`api/v1/quiz-with-qa/${id}`);
};

const postUpsertQuiz = (data) => {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
};

const postLogOutUser = (data) => {
  return axios.post("api/v1/logout", { ...data });
};

const getOverview = () => {
  return axios.get("api/v1/overview");
};

const getHistory = () => {
  return axios.get("api/v1/history");
};

const postUpdateProfile = (data) => {
  return axios.post("api/v1/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  postCreateNewUser,
  getAllUsers,
  getAllUsersWithPaginate,
  putUpdateUser,
  deleteOneUser,
  loginUser,
  registerUser,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postAddQuiz,
  getQuizById,
  deleteQuiz,
  putUpdateQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  assignQuizToUser,
  getQuizWithQA,
  postUpsertQuiz,
  postLogOutUser,
  getOverview,
  getHistory,
  postUpdateProfile,
};
