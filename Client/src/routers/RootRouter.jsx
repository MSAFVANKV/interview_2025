import { createBrowserRouter } from "react-router";
import App from "../App";
import RouteProtector from "../middlewares/route-protector";
import HomePage from "../pages/user-side/home/home-page";
import ErrorPage from "../Error-page";
import CartPage from "../pages/user-side/carts/cart-page";
import LoginPage from "../pages/user-side/auth/login/login-page";
import ProductsAddPage from "../pages/adminside/products/add/products-add-page";
import ProductAllPage from "../pages/adminside/products/all/product-all-page";
import ProductLayout from "../layout/ProductLayout";
import AdminApp from "../Admin-App";
import ProductUsePage from "../pages/user-side/products/product-use-page";
import BannersPage from "../pages/adminside/banners/banners-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProtector>
        <App />
      </RouteProtector>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart", // Protected route
        element: <CartPage />,
      },
      {
        path: "/login", // Protected route
        element: <LoginPage />,
      },
      {
        path: "/product/:id", // Protected route
        element: <ProductUsePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <RouteProtector>
        <AdminApp />
      </RouteProtector>
    ),
    children: [
      {
        path: "products",
        element: <ProductLayout />, // Parent layout for Products
        children: [
          { path: "add", element: <ProductsAddPage /> },
          { path: "all", element: <ProductAllPage /> },
          //   { path: "category", element: <CategoryPage /> },
        ],
      },
      {
        path:"banners",
        element:(
          <BannersPage/>
        )
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
