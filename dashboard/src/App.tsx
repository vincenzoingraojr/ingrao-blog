import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ModifyPassword from "./pages/ModifyPassword";
import RecoverPassword from "./pages/RecoverPassword";
import { setAccessToken } from "./utils/token";
import Preloader from "./components/utils/Preloader";
import Index from "./pages/Index";
import CompleteAccount from "./pages/CompleteAccount";
import CreatePostPage from "./pages/create-post/CreatePostPage";
import Modal from "./components/utils/modal/Modal";
import NewPost from "./pages/create-post/NewPost";
import UpdatePost from "./pages/update-post/UpdatePost";
import PublishPost from "./pages/update-post/PublishPost";
import PostPreview from "./pages/update-post/PostPreview";
import Logout from "./pages/Logout";
import ProfilePage from "./pages/profile/ProfilePage";
import PostsPage from "./pages/profile/PostsPage";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";
import AccountSettings from "./pages/settings/account-settings/AccountSettings";
import EditEmailAddress from "./pages/settings/account-settings/EditEmailAddress";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailAddress from "./pages/settings/account-settings/VerifyEmailAddress";
import ChangePassword from "./pages/settings/account-settings/ChangePassword";
import ManageUsers from "./pages/settings/manage-users/ManageUsers";
import ManagePosts from "./pages/settings/manage-posts/ManagePosts";

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

    document.body.classList.remove("not-scrolling");

    if (loading) {
        return <Preloader />;
    }

    let state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route
                    path="/"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Index />}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Login />}
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
                    path="/complete-account/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<CompleteAccount />}
                        />
                    }
                />
                <Route
                    path="/home"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<HomePage />}
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
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ViewPost />}
                        />
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<CreatePostPage />}
                        />
                    }
                />
                <Route
                    path="/create-post/new"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Create a new post"
                                    modalContent={<NewPost />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/publish-post/:id"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Publish this post"
                                    modalContent={<PublishPost />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/update-post/:id"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<UpdatePost />}
                        />
                    }
                />
                <Route
                    path="/update-post/:id/preview"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<PostPreview />}
                        />
                    }
                />
                <Route
                    path="/edit-post/:id"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<EditPost />}
                        />
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
                    path="/profile/posts"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<PostsPage />}
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
                    path="/settings/manage-users"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ManageUsers />}
                        />
                    }
                />
                <Route
                    path="/settings/manage-posts"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ManagePosts />}
                        />
                    }
                />
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/create-post/new"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Create a new post"
                                        modalContent={<NewPost />}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/publish-post/:id"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Publish this post"
                                        modalContent={<PublishPost />}
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
