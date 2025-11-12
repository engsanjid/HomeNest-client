
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../router/PrivateRoute";
import Root from "../root/root";
import Home from "../component/Home/Home";
import AllProperties from "../page/AllProperties/AllProperties";
import AddProperty from "../page/AddProperty/AddProperties";
import MyProperties from "../page/MyProperties/MyProperties";
import MyRatings from "../page/MyRatings/MyRatings";
import LoginPage from "../Contexts/AuthContext/Login";
import RegisterPage from "../Contexts/AuthContext/Register";
import ErrorPage from "../error/error";
import PropertyDetails from "../page/Property-customise/PropertyDetails";
import UpdateProperty from "../page/Property-customise/UpdateProperty";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },

     
      { path: "/all-properties", loader: () => fetch("http://localhost:5000/all-properties"), element: <AllProperties /> },

      {
        path: "/details/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`),
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },

     {
        path: "/add-property",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },

       {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },

    
      {
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },

      {
        path: "/update-property/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateProperty />
          </PrivateRoute>
        ),
      },

     
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
