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
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook";
import ManageBooks from "../pages/dashboard/manageBook/ManageBooks";
import AdminRoute from "../router/AdminRoute"
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
                    element: <SingleBook />
                },
                {
                    path: "/orders",
                    element: <OrderPage />
                },
                {
                    path: "/user-dashboard",
                    element: <UserDashboard />
                },
            ]
        },
        {
            path: "/admin",
            element: <AdminLogin />
        },
        {
            path: "/dashboard",
            element: <AdminRoute>
                <DashboardLayout />
            </AdminRoute>,
            children: [
                {
                    path: "",
                    element: <AdminRoute><Dashboard /></AdminRoute>
                },
                {
                    path: "add-new-book",
                    element: <AdminRoute>
                        <AddBook />
                    </AdminRoute>
                },
                {
                    path: "edit-book/:id",
                    element: <AdminRoute>
                        <UpdateBook />
                    </AdminRoute>
                },
                {
                    path: "manage-books",
                    element: <AdminRoute>
                        <ManageBooks />
                    </AdminRoute>
                }
            ]
        }
    ]
)
export default router