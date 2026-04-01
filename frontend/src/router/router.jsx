import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/book/CartPage";
import CheckoutPage from "../pages/book/CheckoutPage";
import SingleBook from "../pages/book/SingleBook";
import OrderPage from "../pages/book/Order";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/cart",
                    element: <CartPage />
                },
                {
                    path: "/checkout",
                    element: <CheckoutPage />
                },
                {
                    path: "/books/:id",
                    element: <SingleBook/>
                },
                {
                    path:"/orders",
                    element:<OrderPage/>
                },
                {
                    path:"/user-dashboard",
                    element:<UserDashboard/>
                }
            ]

        }
    ]
)
export default router