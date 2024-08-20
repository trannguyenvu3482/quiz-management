import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/users/userSlice";
import { postLogOutUser } from "../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import "./Header.scss";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "react-i18next";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const account = useSelector((state) => state.users.account);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  // console.log(account, isAuthenticated);

  const handleLogout = async () => {
    const res = await postLogOutUser({
      email: "account.email",
      refresh_token: account.refresh_token,
    });

    console.log(res);

    if (res && res.EC === 0) {
      dispatch(logout());
      toast.success("Logout successfully");
      navigate("/");
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Vu Tran
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              {t("Header.Home")}
            </NavLink>
            <NavLink className="nav-link" to="/users">
              {t("Header.Users")}
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              {t("Header.Admin")}
            </NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button
                  className="btn btn-clear btn-login"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="btn btn-dark btn-signup"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown
                title={t("Header.Settings.Title")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  {t("Header.Settings.Logout")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  {t("Header.Settings.Profile")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <LanguageDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  );
};

export default Header;
