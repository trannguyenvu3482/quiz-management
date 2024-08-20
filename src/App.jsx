import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <PerfectScrollbar>
          <div className="app-content h-[calc(100vh-50px)]">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default App;
