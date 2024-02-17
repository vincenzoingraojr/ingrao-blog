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
import { useMeQuery } from "./generated/graphql";
import AddNewUser from "./pages/settings/manage-users/AddNewUser";
import ChangeRole from "./pages/settings/manage-users/ChangeRole";
import DeleteUser from "./pages/settings/manage-users/DeleteUser";
import IsAdmin from "./components/routes/IsAdmin";
import DeleteAccount from "./pages/settings/DeleteAccount";
import NewsletterDashboard from "./pages/newsletter/NewsletterDashboard";
import NewIssue from "./pages/newsletter/NewIssue";
import PublishIssue from "./pages/newsletter/update-issue/PublishIssue";
import UpdateIssue from "./pages/newsletter/update-issue/UpdateIssue";
import IssuePreview from "./pages/newsletter/update-issue/IssuePreview";
import EditIssue from "./pages/newsletter/EditIssue";
import ViewIssue from "./pages/newsletter/ViewIssue";
import IssuesPage from "./pages/newsletter/IssuesPage";
import SubscribedUsers from "./pages/newsletter/SubscribedUsers";

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ORIGIN as string, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken, role } = await x.json();
            setAccessToken(accessToken);
            if (accessToken) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            if (role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });
    }, []);
    
    const { data: meData, loading: meLoading } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    document.body.classList.remove("not-scrolling");

    if (loading || meLoading || !meData) {
        return <Preloader />;
    }

    let state = location.state as { backgroundLocation: Location };

    return (
        <>
            <Routes location={state && state.backgroundLocation ? state.backgroundLocation : location}>
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
                    path="/newsletter/issue/:newsletterId"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<ViewIssue />}
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
                    path="/newsletter/new-issue"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Create a new issue"
                                    modalContent={<NewIssue />}
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
                    path="/newsletter/publish-issue/:newsletterId"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Publish this newsletter issue"
                                    modalContent={<PublishIssue />}
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
                    path="/newsletter/update-issue/:newsletterId"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<UpdateIssue />}
                        />
                    }
                />
                <Route
                    path="/newsletter/update-issue/:newsletterId/preview"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<IssuePreview />}
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
                    path="/newsletter/edit-issue/:newsletterId"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<EditIssue />}
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
                            children={
                                <IsAdmin isAdmin={isAdmin} children={
                                    <ManageUsers />
                                } />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/manage-posts"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <IsAdmin isAdmin={isAdmin} children={
                                    <ManagePosts />
                                } />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/manage-users/new"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <IsAdmin
                                    isAdmin={isAdmin}
                                    children={
                                        <Modal
                                            headerText="Add a new user"
                                            modalContent={<AddNewUser />}
                                        />
                                    }
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/manage-users/change-role/:id"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <IsAdmin
                                    isAdmin={isAdmin}
                                    children={
                                        <Modal
                                            headerText="Change user role"
                                            modalContent={<ChangeRole />}
                                        />
                                    }
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/settings/manage-users/delete-user/:id"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <IsAdmin
                                    isAdmin={isAdmin}
                                    children={
                                        <Modal
                                            headerText="Delete user"
                                            modalContent={<DeleteUser />}
                                        />
                                    }
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
                <Route
                    path="/newsletter"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<NewsletterDashboard />}
                        />
                    }
                />
                <Route
                    path="/newsletter/issues"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<IssuesPage />}
                        />
                    }
                />
                <Route 
                    path="/newsletter/users"
                    element={
                        <IsAuthenticated 
                            isAuth={isAuth}
                            children={
                                <IsAdmin
                                    isAdmin={isAdmin}
                                    children={
                                        <SubscribedUsers />
                                    }
                                />
                            }
                        />
                    }
                />
            </Routes>
            {state && state.backgroundLocation && (
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
                        path="/newsletter/new-issue"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Create a new issue"
                                        modalContent={<NewIssue />}
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
                        path="/newsletter/publish-issue/:newsletterId"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Publish this newsletter issue"
                                        modalContent={<PublishIssue />}
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
                    <Route
                        path="/settings/manage-users/new"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <IsAdmin
                                        isAdmin={isAdmin}
                                        children={
                                            <Modal
                                                headerText="Add a new user"
                                                modalContent={<AddNewUser />}
                                            />
                                        }
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/settings/manage-users/change-role/:id"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <IsAdmin
                                        isAdmin={isAdmin}
                                        children={
                                            <Modal
                                                headerText="Change user role"
                                                modalContent={<ChangeRole />}
                                            />
                                        }
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="/settings/manage-users/delete-user/:id"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <IsAdmin
                                        isAdmin={isAdmin}
                                        children={
                                            <Modal
                                                headerText="Delete user"
                                                modalContent={<DeleteUser />}
                                            />
                                        }
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
