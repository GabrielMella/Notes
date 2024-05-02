import { useRoutes } from "react-router-dom";

import Home from "../pages/home";
import LoginPage from "../pages/auth/loginPage";
import NotFound from "../pages/NotFound/404";

export const RouteList = () => {

    return useRoutes([
        { path: "/home", element: <Home /> },
        { path: "/login", element: <LoginPage /> },
        { path: "*", element: < NotFound /> }
    ]);
}