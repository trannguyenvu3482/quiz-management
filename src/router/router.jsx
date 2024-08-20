import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import User from "../pages/User/User";
import Admin from "../pages/Admin/Admin";
import Home from "../pages/Home/Home";
import ManageUser from "../pages/Admin/Content/ManageUser";
import Dashboard from "../pages/Admin/Content/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DetailQuiz from "../pages/User/DetailQuiz";
import ManageQuiz from "../pages/Admin/Content/Quiz/ManageQuiz";
import Questions from "../pages/Admin/Content/Question/Questions";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/User/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/users",
        element: <PrivateRoute component={User} />,
      },
      {
        path: "/profile",
        element: <PrivateRoute component={UserProfile} />,
      },
    ],
  },
  {
    path: "/admins",
    element: <PrivateRoute component={Admin} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "manage-users",
        element: <ManageUser />,
      },
      {
        path: "manage-quiz",
        element: <ManageQuiz />,
      },
      {
        path: "manage-questions",
        element: <Questions />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/quiz/:id",
    element: <DetailQuiz />,
  },
]);

export default router;
