import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "_store/auth";

const PrivateRoute = () => {
    const { token }  = useAuthStore();

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoute;