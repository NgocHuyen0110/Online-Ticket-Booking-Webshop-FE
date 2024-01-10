
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TokenManager from "../components/TokenManager";

const PrivateRoute = () => {
    const auth = TokenManager.getAccessToken();

    const isAdmin = TokenManager.getClaims()?.roles?.includes("ADMIN")

    return auth && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;