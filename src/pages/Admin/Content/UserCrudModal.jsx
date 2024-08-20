import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postCreateNewUser, putUpdateUser } from "../../../services/apiService";
import _ from "lodash";

const UserCrudModal = ({
  show,
  onClose,
  fetchListUsers,
  userUpdate,
  userView,
  setCurrentPage,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    role: "USER",
    userImage: "",
  });
  const [modalTitle, setModalTitle] = useState("Create User");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(userUpdate)) {
      console.log(userUpdate);
      setData({
        email: userUpdate.email,
        password: userUpdate.password,
        username: userUpdate.username,
        role: userUpdate.role,
        userImage: userUpdate.image,
      });
      setPreviewImage(
        userUpdate.image ? `data:image/jpeg;base64,${userUpdate.image}` : ""
      );
      setModalTitle("Update User");
    } else {
      setData({
        email: "",
        password: "",
        username: "",
        role: "USER",
        userImage: "",
      });
      setPreviewImage("");
      setModalTitle("Create User");
    }
  }, [userUpdate]);

  useEffect(() => {
    if (!_.isEmpty(userView)) {
      setData({
        email: userView.email,
        password: userView.password,
        username: userView.username,
        role: userView.role,
        userImage: userView.image,
      });
      setPreviewImage(
        userView.image ? `data:image/jpeg;base64,${userView.image}` : ""
      );
      setModalTitle("View User");
    }
  }, [userView]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setData({ ...data, userImage: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateData = (data) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(data.email)) {
      return "Invalid email";
    }

    if (data.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmitCreateUser = async () => {
    // Validation
    const error = validateData(data);
    if (error) {
      toast.error(error);
      return;
    }

    // Submit data to server
    console.log(data);
    const res = await postCreateNewUser(data);
    console.log(res);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseModal();
      await fetchListUsers(1);
      setCurrentPage(1);
    }

    if (res && res.EC === 1) {
      toast.error(res.EM);
    }
  };

  const handleUpdateUser = async () => {
    const updatedData = {
      id: userUpdate.id,
      ...data,
    };
    const res = await putUpdateUser(updatedData);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleCloseModal();
      await fetchListUsers(1);
    }

    if (res && res.EC === 1) {
      toast.error(res.EM);
    }
  };

  const handleCloseModal = () => {
    // Reset form data
    setData({
      email: "",
      password: "",
      username: "",
      role: "USER",
      userImage: "",
    });

    // Close modal
    onClose();
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleCloseModal}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={data.email || ""}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                disabled={!_.isEmpty(userUpdate)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={data.password || ""}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                disabled={!_.isEmpty(userUpdate)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={data.username || ""}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                value={data.role || "USER"}
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputImage" className="form-label label-upload">
                <FcPlus />
                Upload your image
              </label>
              <input
                id="inputImage"
                type="file"
                className="form-control input"
                hidden
                accept="image/*"
                onChange={handleUploadImage}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {!_.isEmpty(userUpdate) ? (
            <Button variant="warning" onClick={handleUpdateUser}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmitCreateUser}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCrudModal;
