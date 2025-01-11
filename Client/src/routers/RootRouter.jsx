import { createBrowserRouter } from "react-router";
import App from "../App";
import RouteProtector from "../middlewares/route-protector";
import HomePage from "../pages/user-side/home/home-page";
import ErrorPage from "../Error-page";



const router = createBrowserRouter(
    [
        {
            path: "/",
            element:(
               <RouteProtector>
                <App/>
               </RouteProtector> 
            ),
            children:[
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: '/products',  // Protected route
                    element: <div className="">products</div>,
                  },
            ]
        },
        {
            path: "*",
            element: <ErrorPage />,
          },
    ]
)

export default router;