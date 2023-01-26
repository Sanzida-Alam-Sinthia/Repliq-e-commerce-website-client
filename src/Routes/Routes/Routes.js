import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllCustomers from "../../Pages/AdminDashboard/AllCustomers/AllCustomers";
import AllProducts from "../../Pages/AdminDashboard/AllProducts/AllProducts";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }

        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard/allusers',
                element: <AllCustomers></AllCustomers>
            },

            // {
            //     path: '/dashboard/addproduct',
            //     element: <AddAProduct></AddAProduct>
            // },
            {
                path: '/dashboard/myproduct',
                element: <AllProducts></AllProducts>
            },
            // {
            //     path: '/dashboard/myorders',
            //     element: <MyOrders></MyOrders>
            // }
        ]

    }
]);