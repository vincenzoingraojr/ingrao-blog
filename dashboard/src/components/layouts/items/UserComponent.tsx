import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import profilePicture from "../../../images/profile-picture.svg";
import { PageText } from "../../../styles/global";

interface UserComponentProps {
    user: any;
    me: boolean;
}

const UserContainer = styled.div`
    display: block;
    width: 100%;
    cursor: pointer;
`;

const UserInnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const UserProfilePicture = styled.div`
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 36px;

    img {
        width: inherit;
        height: inherit;
        border-radius: 36px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
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
    font-size: 26px;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
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

const ChangeUserRoleLink = styled(Link)`
    color: blue;
`;

const DeleteUserLink = styled(Link)`
    color: red;
`;

const UserComponent: FunctionComponent<UserComponentProps> = ({
    user,
    me,
}) => {
    const navigate = useNavigate();

    return (
        <UserContainer
            onClick={() => {
                navigate(`/user/${user.id}`);
            }}
            role="link"
            title={`${user.firstName} ${user.lastName}'s profile page`}
            aria-label={`${user.firstName} ${user.lastName}'s profile page`}
        >
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
                        {me && (
                            <MeContainer>
                                You
                            </MeContainer>
                        )}
                    </UserMainInfoContainer>
                    <PostSmallText>
                        <b>{user.email}</b>{" "}Role: {user.role}.
                    </PostSmallText>
                    {(user.role === "admin" && !me) && (
                        <PostButtonsContainer>
                            <ChangeUserRoleLink
                                title="Change role"
                                aria-label="Change role"
                                to={`/settings/manage-users/change-role/${user.id}`}
                            >
                                Change role
                            </ChangeUserRoleLink>
                            <DeleteUserLink
                                title="Delete user"
                                aria-label="Delete user"
                                to={`/settings/manage-users/delete-user/${user.id}`}
                            >
                                Delete user
                            </DeleteUserLink>
                        </PostButtonsContainer>
                    )}
                </UserInfoContainer>
            </UserInnerContainer>
        </UserContainer>
    );
};

export default UserComponent;
