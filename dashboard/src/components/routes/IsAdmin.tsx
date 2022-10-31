import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface IsAdminProps {
    children: JSX.Element;
    isAdmin: boolean;
}

const IsAdmin: FunctionComponent<IsAdminProps> = ({
    children,
    isAdmin,
}) => {
    return isAdmin ? children : <Navigate replace to="/" />;
};

export default IsAdmin;
