import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import LanguageDropdown from "../../components/Header/LanguageDropdown";
import { NavDropdown } from "react-bootstrap";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container flex">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content w-full">
        <div className="admin-header flex h-[60px] items-center justify-between border-b-2 border-gray-300 px-4">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars size={18} className="cursor-pointer hover:text-gray-500" />
          </span>
          <div className="right-side flex h-full items-center gap-4">
            <LanguageDropdown />
            <NavDropdown
              title={t("Header.Settings.Title")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>{t("Header.Settings.Logout")}</NavDropdown.Item>
              <NavDropdown.Item>
                {t("Header.Settings.Profile")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        <PerfectScrollbar>
          <div className="admin-main h-[calc(100vh-50px)]">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
