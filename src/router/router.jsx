
import { createBrowserRouter } from "react-router-dom";
 import ErrorPage from "../error/error";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
   

      

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
