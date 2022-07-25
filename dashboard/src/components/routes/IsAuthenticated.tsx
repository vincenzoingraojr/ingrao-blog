import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface IsAuthenticatedProps {
    children: JSX.Element;
    isAuth: boolean;
}

const IsAuthenticated: FunctionComponent<IsAuthenticatedProps> = ({
    children,
    isAuth,
}) => {
    return isAuth ? children : <Navigate replace to="/" />;
};

export default IsAuthenticated;
