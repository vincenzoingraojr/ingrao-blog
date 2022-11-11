import { FunctionComponent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMeQuery } from "../../../generated/graphql";
import profilePicture from "../../../images/profile-picture.svg";
import { devices } from "../../../styles/devices";
import { PageBlock, PageText, TextButton } from "../../../styles/global";

interface UserComponentProps {
    user: any;
}

const UserContainer = styled.div`
    display: block;
    width: 100%;
`;

const UserInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const UserProfilePicture = styled.div`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 25px;

    img {
        width: inherit;
        height: inherit;
        border-radius: 25px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }

    @media ${devices.mobileL} {
        width: 72px;
        height: 72px;
        border-radius: 36px;

        img {
            border-radius: 36px;
        }
    }
`;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const UserMainInfoContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 4px;
`;

const MeContainer = styled(PageText)`
    padding: 4px;
    font-size: 16px;
    color: #ffffff;
    background-color: #000000;
`;

const UserFullName = styled(PageText)`
    font-weight: 700;
    font-size: 22px;
    text-decoration: none;

    @media ${devices.mobileL} {
        font-size: 26px;
    }
`;

const PostSmallText = styled(PageText)`
    font-size: 16px;
`;

const PostButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 16px;
    column-gap: 12px;
    row-gap: 4px;
`;

const ChangeUserRoleButton = styled(TextButton)`
    color: blue;
`;

const DeleteUserButton = styled(TextButton)`
    color: red;
`;

const UserComponent: FunctionComponent<UserComponentProps> = ({
    user,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    return (
        <UserContainer>
            <UserInnerContainer>
                <UserProfilePicture>
                    <img
                        src={
                            user.profilePicture !== null && user.profilePicture !== ""
                                ? user.profilePicture
                                : profilePicture
                        }
                        title={`${user.firstName}'s profile picture`}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                </UserProfilePicture>
                <UserInfoContainer>
                    <UserMainInfoContainer>
                        <UserFullName>
                            {user.firstName}{" "}{user.lastName}
                        </UserFullName>
                        {(data && data.me && data.me.id === user.id) && (
                            <MeContainer>
                                You
                            </MeContainer>
                        )}
                    </UserMainInfoContainer>
                    <PostSmallText>
                        <b>{user.email}</b>{" "}Role: {user.role}.
                    </PostSmallText>
                    {(data && data.me && data.me.id !== user.id && user.role === "writer") && (
                        <PostButtonsContainer>
                            <PageBlock>
                                <ChangeUserRoleButton
                                    type="button"
                                    role="button"
                                    title="Change user role"
                                    aria-label="Change user role"
                                    onClick={() => {
                                        navigate(`/settings/manage-users/change-role/${user.id}`, { state: { backgroundLocation: location }});
                                    }}
                                >
                                    Change role
                                </ChangeUserRoleButton>
                                <Outlet />
                            </PageBlock>
                            <PageBlock>
                                <DeleteUserButton
                                    type="button"
                                    role="button"
                                    title="Delete user"
                                    aria-label="Delete user"
                                    onClick={() => {
                                        navigate(`/settings/manage-users/delete-user/${user.id}`, { state: { backgroundLocation: location }});
                                    }}
                                >
                                    Delete user
                                </DeleteUserButton>
                                <Outlet />
                            </PageBlock>
                        </PostButtonsContainer>
                    )}
                </UserInfoContainer>
            </UserInnerContainer>
        </UserContainer>
    );
};

export default UserComponent;
