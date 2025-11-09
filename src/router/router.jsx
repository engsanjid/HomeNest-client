
import { createBrowserRouter } from "react-router-dom";
 import ErrorPage from "../error/error";
import Home from "../component/Home/Home";
import Root from "../root/root";




const router = createBrowserRouter([
  {
    path: "/",
   Component:Root,
    errorElement: <ErrorPage />,
    children: [
   
      {  
        index: true, 
         Component:Home
      },
      

      
      

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
