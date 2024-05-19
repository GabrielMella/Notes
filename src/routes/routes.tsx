import { Route, Routes } from "react-router-dom";

import Dashboard from "_features/Dashboard/";
import LoginPage from "_features/Auth/loginForm";
import NotFound from "_features/NotFound/404";
import PrivateRoute from "_utils/PrivateRoute";
import RegisterPage from "_features/Register";

export const RouteList = () => {
    return (
        <Routes>
            <Route path="/"  element={<LoginPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}