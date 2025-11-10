import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../component/Home/Home";
import AllProperties from "../page/AllProperties/AllProperties";
import AddProperty from "../page/AddProperty/AddProperties";
import MyProperties from "../page/MyProperties/MyProperties";
import MyRatings from "../page/MyRatings/MyRatings";
import LoginPage from "../Contexts/AuthContext/Login";
import RegisterPage from "../Contexts/AuthContext/Register";
import ErrorPage from "../error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-properties", element: <AllProperties /> },
      { path: "/add-property", element: <AddProperty /> },
      { path: "/my-properties", element: <MyProperties /> },
      { path: "/my-ratings", element: <MyRatings /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
