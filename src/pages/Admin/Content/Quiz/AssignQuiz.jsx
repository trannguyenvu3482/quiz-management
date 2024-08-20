import { useState, useEffect } from "react";
import Select from "react-select";
import {
  assignQuizToUser,
  getAllUsers,
  getQuizById,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchQuizList();
    fetchUserList();
  }, []);

  const fetchQuizList = async () => {
    const res = await getQuizById("all");

    if (res && res.EC === 0) {
      let quizList = res.DT.map((quiz) => ({
        label: `${quiz.id} - ${quiz.description}`,
        value: quiz.id,
      }));

      setListQuiz(quizList);
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const fetchUserList = async () => {
    const res = await getAllUsers();
    console.log(res);
    if (res && res.EC === 0) {
      let userList = res.DT.map((user) => ({
        label: `${user.id} - ${user.username} - ${user.email}`,
        value: user.id,
      }));

      console.log(userList);

      setListUser(userList);
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const handleAssignQuiz = async () => {
    console.log(selectedQuiz, selectedUser);

    if (!selectedQuiz.value || !selectedUser.value) {
      toast.error("Please select quiz and user");
      return;
    }

    const res = await assignQuizToUser(selectedQuiz.value, selectedUser.value);

    if (res && res.EC === 0) {
      toast.success("Assign quiz successfully");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div>
      <div className="assign-quiz-container flex justify-center gap-10">
        <div className="w-6/12">
          <label>Select quiz</label>
          <Select
            className=""
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="w-6/12">
          <label>Select user</label>
          <Select
            className=""
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
          />
        </div>
      </div>
      <button
        className="btn btn-warning mt-4 w-full p-2"
        onClick={handleAssignQuiz}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignQuiz;
