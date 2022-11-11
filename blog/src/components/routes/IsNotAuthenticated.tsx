import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface IsNotAuthenticatedProps {
    children: JSX.Element;
    isAuth: boolean;
}

const IsNotAuthenticated: FunctionComponent<IsNotAuthenticatedProps> = ({
    children,
    isAuth,
}) => {
    return isAuth ? <Navigate replace to="/" /> : children;
};

export default IsNotAuthenticated;
