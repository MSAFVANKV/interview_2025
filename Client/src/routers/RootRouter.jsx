import { createBrowserRouter } from "react-router";
import App from "../App";
import RouteProtector from "../middlewares/route-protector";
import HomePage from "../pages/user-side/home/home-page";
import ErrorPage from "../Error-page";
import CartPage from "../pages/user-side/carts/cart-page";



const router = createBrowserRouter(
    [
        {
            path: "/",
            element:(
            //    <RouteProtector>
                <App/>
            //    </RouteProtector> 
            ),
            children:[
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: '/cart',  // Protected route
                    element: <CartPage />,
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