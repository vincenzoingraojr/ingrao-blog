import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ModifyPassword from "./pages/ModifyPassword";
import RecoverPassword from "./pages/RecoverPassword";
import { setAccessToken } from "./utils/token";
import Preloader from "./components/utils/Preloader";
import Index from "./pages/Index";
import Modal from "./components/utils/modal/Modal";
import Logout from "./pages/Logout";
import ProfilePage from "./pages/profile/ProfilePage";
import ViewPost from "./pages/ViewPost";
import AccountSettings from "./pages/settings/account-settings/AccountSettings";
import EditEmailAddress from "./pages/settings/account-settings/EditEmailAddress";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailAddress from "./pages/settings/account-settings/VerifyEmailAddress";
import ChangePassword from "./pages/settings/account-settings/ChangePassword";
import { useMeQuery } from "./generated/graphql";
import DeleteAccount from "./pages/settings/DeleteAccount";

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ORIGIN!, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            setAccessToken(accessToken);
            if (accessToken) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            setLoading(false);
        });
    }, []);
    
    const { data: meData, loading: meLoading } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "blog" },
    });

    document.body.classList.remove("not-scrolling");

    if (loading || meLoading || !meData) {
        return <Preloader />;
    }

    let state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route
                    path="/"
                    element={
                        <Index />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Log in"
                                    modalContent={<Login />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Sign up"
                                    modalContent={<Signup />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/recover-password"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<RecoverPassword />}
                        />
                    }
                />
                <Route
                    path="/verify/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<VerifyEmail />}
                        />
                    }
                />
                <Route
                    path="/modify-password/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<ModifyPassword />}
                        />
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<Logout />}
                        />
                    }
                />
                <Route
                    path="/post/:slug"
                    element={
                        <ViewPost />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ProfilePage />}
                        />
                    }
                />
                <Route
                    path="/settings/account"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<AccountSettings />}
                        />
                    }
                />
                <Route
                    path="/settings/account/email-address"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Edit email address"
                                    modalContent={<EditEmailAddress />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/account/verify-email/:token"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Edit your email address"
                                    modalContent={<VerifyEmailAddress />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/account/password"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Change your password"
                                    modalContent={<ChangePassword />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/delete-account"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<DeleteAccount />}
                        />
                    }
                />
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <IsNotAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Log in"
                                        modalContent={<Login />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <IsNotAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Sign up"
                                        modalContent={<Signup />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/settings/account/email-address"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Edit email address"
                                        modalContent={<EditEmailAddress />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/settings/account/verify-email/:token"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Edit your email address"
                                        modalContent={<VerifyEmailAddress />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/settings/account/password"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Change your password"
                                        modalContent={<ChangePassword />}
                                    />
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
