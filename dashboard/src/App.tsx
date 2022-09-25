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
                </Routes>
            )}
        </>
    );
}

export default App;
