import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface IsAdminProps {
    children: JSX.Element;
    role: string;
}

const IsAdmin: FunctionComponent<IsAdminProps> = ({
    children,
    role,
}) => {
    return role === "admin" ? children : <Navigate replace to="/" />;
};

export default IsAdmin;
