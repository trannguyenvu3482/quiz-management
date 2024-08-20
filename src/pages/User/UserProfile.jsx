import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Breadcrumb,
  Dropdown,
  Pagination,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHistory, postUpdateProfile } from "../../services/apiService";
import { MdModeEdit } from "react-icons/md";

const UserProfile = () => {
  const inputRef = useRef(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [currentHistory, setCurrentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const currentUser = useSelector((state) => state.users.account);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();

        if (response && response.EC === 0) {
          setQuizHistory(response.DT.data);
          setCurrentHistory(response.DT.data.slice(0, 10));
          setMaxPage(Math.ceil(response.DT.data.length / 10));

          console.log(response.DT.data.slice(0, 10));
        } else {
          console.error("Error fetching quiz history: ", response);
        }
      } catch (error) {
        console.error("Error fetching quiz history: ", error);
      }
    };
    fetchHistory();
  }, []);

  const handleInputImage = () => {
    inputRef.current.click();
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setCurrentHistory(quizHistory.slice((page - 1) * 10, page * 10));
  };

  const handleInputImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("username", currentUser.username);
    formData.append("userImage", file);

    try {
      const res = await postUpdateProfile(formData);

      if (res && res.EC === 0) {
        console.log("Updated user profile: ", res);
      } else {
        console.error("Error updating user profile: ", res);
      }
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col px-40">
      <div className="breadcrumbs text-md flex items-center bg-gray-50 pl-2 pt-3">
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
      <div className="flex h-full">
        <div className="left w-4/12 border-2 border-green-500 px-4 py-4">
          <div className="border-b-2 border-gray-400 pb-4">
            <div
              className=" relative h-[200px] w-[200px] cursor-pointer rounded-full text-center shadow-lg hover:opacity-90"
              onClick={(e) => handleInputImage(e)}
            >
              <div className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-center">
                <MdModeEdit size={24} />
              </div>
              <img
                className="h-full w-full rounded-full object-cover"
                src={`data:image/jpeg;base64,${currentUser.image}`}
                alt=""
              />
              <input
                className="form-control mt-1"
                type="file"
                name="image"
                hidden
                ref={inputRef}
                onChange={(e) => handleInputImageChange(e)}
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h1 className="text-2xl font-bold">{currentUser.username}</h1>
              <p className="rounded-lg bg-cyan-500 px-2 text-sm text-white">
                {currentUser.role}
              </p>
            </div>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
          <div className="flex flex-col">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Change password</Accordion.Header>
                <Accordion.Body>
                  <form className="flex flex-col gap-2">
                    <input
                      type="password"
                      placeholder="Old password"
                      className="rounded-lg border-2 border-gray-400 p-2"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="rounded-lg border-2 border-gray-400 p-2"
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="rounded-lg border-2 border-gray-400 p-2"
                    />
                    <button className="rounded-lg bg-blue-500 p-2 text-white">
                      Change password
                    </button>
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="right w-8/12 border-2 border-red-500 px-6">
          <h1 className="my-2 text-center text-2xl font-bold">Quiz History</h1>
          <div className="flex flex-col items-center justify-center">
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quiz name</th>
                  <th>Total question</th>
                  <th>Total correct</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.id}</td>
                    <td>{history.quizHistory.name}</td>
                    <td>{history.total_questions}</td>
                    <td>{history.total_correct}</td>
                    <td>{new Date(history.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              <Pagination.First
                disabled={currentPage === 1}
                onClick={() => goToPage(1)}
              />
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage > 1) {
                    goToPage(currentPage - 1);
                  }
                }}
              />
              {
                // Get first 5 pages
                Array.from(
                  { length: maxPage > 5 ? 5 : maxPage },
                  (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={currentPage === index + 1}
                      onClick={() => goToPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ),
                )
              }

              {
                // Get current page if it is not in the first 5 pages or last 5 pages
                currentPage > 5 && currentPage < maxPage - 4 && (
                  <Pagination.Item active>{currentPage}</Pagination.Item>
                )
              }

              {/* <Pagination.Ellipsis /> */}

              <Dropdown show={isShowDropdown}>
                <Pagination.Ellipsis
                  className="quiz-history-dropdown"
                  id="dropdown-basic"
                  onClick={() => setIsShowDropdown(!isShowDropdown)}
                ></Pagination.Ellipsis>

                <Dropdown.Menu>
                  <div className="flex h-full items-center gap-2">
                    {/* Input */}
                    <input
                      type="number"
                      className="form-control h-full"
                      value={inputPage}
                      onChange={(e) => setInputPage(e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-md h-full"
                      onClick={() => {
                        setIsShowDropdown(!isShowDropdown);
                        goToPage(inputPage);
                      }}
                    >
                      Go
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {
                // Get last 5 pages reverse
                Array.from(
                  { length: maxPage > 5 ? 5 : maxPage },
                  (_, index) => {
                    const arr = [4, 3, 2, 1, 0];
                    const page = maxPage - arr[index];

                    console.log(page, index);

                    return (
                      <Pagination.Item
                        key={index}
                        active={currentPage === page}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  },
                )
              }
              <Pagination.Next
                disabled={currentPage === maxPage}
                onClick={() => {
                  if (currentPage < maxPage) {
                    goToPage(currentPage + 1);
                  }
                }}
              />
              <Pagination.Last
                disabled={currentPage === maxPage}
                onClick={() => goToPage(maxPage)}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
