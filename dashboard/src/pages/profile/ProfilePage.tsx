import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { SidebarLayoutTitle } from "../../components/layouts/sublayouts/SidebarLayout";
import LoadingComponent from "../../components/utils/LoadingComponent";
import {
    MeDocument,
    MeQuery,
    useEditProfileMutation,
    useMeQuery,
    User,
} from "../../generated/graphql";
import {
    Button,
    FlexRow24,
    ImageButtonContainer,
    LoadingContainer,
    PageBlock,
    PageText,
    Status,
} from "../../styles/global";
import ProfilePageComponent from "./ProfilePageComponent";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/input/InputField";
import SelectField from "../../components/input/select/SelectField";
import { useRef, useState } from "react";
import profilePicture from "../../images/profile-picture.svg";
import Upload from "../../components/icons/Upload";
import Close from "../../components/icons/Close";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfilePageContent = styled.div`
    display: block;
`;

const EditProfileFormContainer = styled.div`
    display: block;
`;

const EditProfileButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

const EditProfileFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ProfileLargeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 24px;
    margin-bottom: 24px;
`;

const CoverImageContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #151414;
    width: 128px;
    height: 128px;
    border-radius: 64px;
    align-items: center;
    justify-content: center;

    img {
        width: 128px;
        height: 128px;
        border-radius: 64px;
        opacity: 0.6;
        object-fit: cover;
        object-position: center;
    }
`;

const CoverImageButtonsContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    z-index: 1000;
`;

const UploadCoverImageButton = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;

    input[type="file"] {
        position: absolute;
        width: 40px;
        height: 40px;
        visibility: hidden;
    }
`;

const ProfileLargeInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ProfileName = styled(PageText)`
    font-weight: 700;
    font-size: 24px;
`;

function ProfilePage() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    const titleOptions = [
        { value: "Title", label: "Title" },
        { value: "Ms.", label: "Ms." },
        { value: "Mr.", label: "Mr." },
        { value: "Dr.", label: "Dr." },
    ];

    const genderOptions = [
        { value: "Gender", label: "Gender" },
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
        { value: "Non-binary", label: "Non-binary" },
    ];

    const [editProfile] = useEditProfileMutation();

    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<File | null>(null);

    const uploadProfilePictureRef = useRef<HTMLInputElement>(null);
    const profilePictureRef = useRef<HTMLImageElement>(null);
    const [deleteProfilePicture, setDeleteProfilePicture] =
        useState<boolean>(false);

    const [isProfilePictureUploaded, setIsProfilePictureUploaded] =
        useState<boolean>(false);

    return (
        <>
            <Head
                title="Your profile | dashboard.ingrao.blog"
                description="In this page you can view your profile and update your personal information."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <ProfilePageComponent
                                content={
                                    <>
                                        {(loading && !data) || error ? (
                                            <LoadingContainer>
                                                <LoadingComponent />
                                            </LoadingContainer>
                                        ) : (
                                            <>
                                                <SidebarLayoutTitle>
                                                    Welcome,{" "}
                                                    {data?.me?.firstName}
                                                </SidebarLayoutTitle>
                                                <ProfilePageContent>
                                                    <EditProfileFormContainer>
                                                        <Formik
                                                            initialValues={{
                                                                firstName:
                                                                    data?.me
                                                                        ?.firstName ||
                                                                    "",
                                                                lastName:
                                                                    data?.me
                                                                        ?.lastName ||
                                                                    "",
                                                                profilePicture:
                                                                    data?.me
                                                                        ?.profilePicture ||
                                                                    "",
                                                                title:
                                                                    data?.me
                                                                        ?.title ||
                                                                    "Title",
                                                                gender:
                                                                    data?.me
                                                                        ?.gender ||
                                                                    "Gender",
                                                                origin: "dash",
                                                            }}
                                                            onSubmit={async (
                                                                values,
                                                                {
                                                                    setStatus,
                                                                    setErrors,
                                                                }
                                                            ) => {
                                                                let profilePictureName =
                                                                    "";
                                                                let existingProfilePictureName =
                                                                    "";
                                                                let directory =
                                                                    "";

                                                                if (
                                                                    data?.me
                                                                        ?.profilePicture !==
                                                                        "" &&
                                                                    data?.me
                                                                        ?.profilePicture !==
                                                                        null
                                                                ) {
                                                                    existingProfilePictureName =
                                                                        data?.me?.profilePicture?.replace(
                                                                            `https://storage.ingrao.blog/${
                                                                                process
                                                                                    .env
                                                                                    .REACT_APP_ENV ===
                                                                                "development"
                                                                                    ? "local-users"
                                                                                    : "users"
                                                                            }/${
                                                                                data
                                                                                    ?.me
                                                                                    ?.id
                                                                            }/`,
                                                                            ""
                                                                        )!;
                                                                }

                                                                if (
                                                                    selectedProfilePicture !==
                                                                    null
                                                                ) {
                                                                    if (
                                                                        existingProfilePictureName !==
                                                                        ""
                                                                    ) {
                                                                        await axios.delete(
                                                                            `${process.env.REACT_APP_STORAGE_LINK}/${
                                                                                process
                                                                                    .env
                                                                                    .REACT_APP_ENV ===
                                                                                "development"
                                                                                    ? "local-users"
                                                                                    : "users"
                                                                            }/${
                                                                                data
                                                                                    ?.me
                                                                                    ?.id
                                                                            }/${existingProfilePictureName}`
                                                                        );
                                                                    }

                                                                    profilePictureName = `profile-picture-${new Date().getTime()}.jpeg`;
                                                                    directory =
                                                                        process
                                                                            .env
                                                                            .REACT_APP_ENV ===
                                                                        "development"
                                                                            ? `local-users/${data?.me?.id}`
                                                                            : `users/${data?.me?.id}`;

                                                                    let key = `${directory}/${profilePictureName}`;

                                                                    const {
                                                                        url,
                                                                    } = await fetch(
                                                                        `${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`,
                                                                        {
                                                                            method: "POST",
                                                                            headers:
                                                                                {
                                                                                    Accept: "application/json",
                                                                                    "Content-Type":
                                                                                        "application/json",
                                                                                },
                                                                            body: JSON.stringify(
                                                                                {
                                                                                    key: key,
                                                                                }
                                                                            ),
                                                                        }
                                                                    ).then(
                                                                        (res) =>
                                                                            res.json()
                                                                    );

                                                                    setStatus("Uploading the profile picture...");

                                                                    const profilePictureConfig = {
                                                                        onUploadProgress: function(progressEvent: any) {
                                                                            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                                                            setStatus(`Uploading the profile picture: ${percentCompleted}%.`);
                                                                        },
                                                                        headers: {
                                                                            "Content-Type": "multipart/form-data",
                                                                        },
                                                                    };
                                                    
                                                                    await axios.put(url, selectedProfilePicture, profilePictureConfig)
                                                                        .then(() => {
                                                                            setStatus("Your profile picture was uploaded successfully.");
                                                                        }).catch((error) => {
                                                                            setStatus(`An error occurred while uploading your profile picture. Error code: ${error.code}.`);
                                                                        });
                                                                } else if (
                                                                    data?.me
                                                                        ?.profilePicture !==
                                                                        "" &&
                                                                    data?.me
                                                                        ?.profilePicture !==
                                                                        null &&
                                                                    deleteProfilePicture
                                                                ) {
                                                                    await axios.delete(
                                                                        `${process.env.REACT_APP_STORAGE_LINK}/${
                                                                            process
                                                                                .env
                                                                                .REACT_APP_ENV ===
                                                                            "development"
                                                                                ? "local-users"
                                                                                : "users"
                                                                        }/${
                                                                            data
                                                                                ?.me
                                                                                ?.id
                                                                        }/${existingProfilePictureName}`
                                                                    );
                                                                } else {
                                                                    profilePictureName =
                                                                        existingProfilePictureName;
                                                                }
                                                                setSelectedProfilePicture(
                                                                    null
                                                                );
                                                                const response =
                                                                    await editProfile(
                                                                        {
                                                                            variables:
                                                                                {
                                                                                    firstName:
                                                                                        values.firstName,
                                                                                    lastName:
                                                                                        values.lastName,
                                                                                    title: values.title,
                                                                                    gender: values.gender,
                                                                                    profilePicture:
                                                                                        (!isProfilePictureUploaded &&
                                                                                            !deleteProfilePicture &&
                                                                                            data
                                                                                                ?.me
                                                                                                ?.profilePicture !==
                                                                                                "") ||
                                                                                        isProfilePictureUploaded
                                                                                            ? `https://storage.ingrao.blog/${
                                                                                                  process
                                                                                                      .env
                                                                                                      .REACT_APP_ENV ===
                                                                                                  "development"
                                                                                                      ? "local-users"
                                                                                                      : "users"
                                                                                              }/${
                                                                                                  data
                                                                                                      ?.me
                                                                                                      ?.id
                                                                                              }/${profilePictureName}`
                                                                                            : "",
                                                                                    origin: "dash",
                                                                                },
                                                                            update: (
                                                                                store,
                                                                                {
                                                                                    data,
                                                                                }
                                                                            ) => {
                                                                                if (
                                                                                    data
                                                                                ) {
                                                                                    store.writeQuery<MeQuery>(
                                                                                        {
                                                                                            query: MeDocument,
                                                                                            data: {
                                                                                                me: data
                                                                                                    .editProfile
                                                                                                    ?.user as User,
                                                                                            },
                                                                                        }
                                                                                    );
                                                                                }
                                                                            },
                                                                        }
                                                                    );

                                                                if (
                                                                    response
                                                                        .data
                                                                        ?.editProfile
                                                                        .user &&
                                                                    response
                                                                        .data
                                                                        ?.editProfile
                                                                        .errors
                                                                        ?.length ===
                                                                        0
                                                                ) {
                                                                    setStatus(
                                                                        response
                                                                            .data
                                                                            .editProfile
                                                                            .status
                                                                    );
                                                                } else {
                                                                    if (
                                                                        response
                                                                            .data
                                                                            ?.editProfile
                                                                            ?.status
                                                                    ) {
                                                                        setStatus(
                                                                            response
                                                                                .data
                                                                                .editProfile
                                                                                .status
                                                                        );
                                                                    } else {
                                                                        setStatus(
                                                                            null
                                                                        );
                                                                        setErrors(
                                                                            toErrorMap(
                                                                                response
                                                                                    .data
                                                                                    ?.editProfile
                                                                                    ?.errors!
                                                                            )
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {({
                                                                errors,
                                                                status,
                                                                values,
                                                            }) => (
                                                                <Form>
                                                                    <ProfileLargeContainer>
                                                                        <CoverImageContainer>
                                                                            <CoverImageButtonsContainer>
                                                                                <UploadCoverImageButton
                                                                                    role="button"
                                                                                    title="Upload your profile picture"
                                                                                    aria-label="Upload your profile picture"
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            uploadProfilePictureRef.current
                                                                                        ) {
                                                                                            uploadProfilePictureRef.current.click();
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <input
                                                                                        type="file"
                                                                                        name="post-cover"
                                                                                        ref={
                                                                                            uploadProfilePictureRef
                                                                                        }
                                                                                        onChange={(
                                                                                            event
                                                                                        ) => {
                                                                                            let localProfilePicture =
                                                                                                null;
                                                                                            localProfilePicture =
                                                                                                event
                                                                                                    .target
                                                                                                    .files![0];
                                                                                            setSelectedProfilePicture(
                                                                                                localProfilePicture
                                                                                            );
                                                                                            setDeleteProfilePicture(
                                                                                                false
                                                                                            );
                                                                                            setIsProfilePictureUploaded(
                                                                                                true
                                                                                            );
                                                                                            if (
                                                                                                profilePictureRef &&
                                                                                                profilePictureRef.current
                                                                                            ) {
                                                                                                if (
                                                                                                    localProfilePicture !==
                                                                                                    undefined
                                                                                                ) {
                                                                                                    profilePictureRef.current.src =
                                                                                                        URL.createObjectURL(
                                                                                                            localProfilePicture
                                                                                                        );
                                                                                                } else {
                                                                                                    profilePictureRef.current.src =
                                                                                                        profilePicture;
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        accept="image/png , image/jpeg, image/webp"
                                                                                    />
                                                                                    <ImageButtonContainer>
                                                                                        <Upload color="#ffffff" />
                                                                                    </ImageButtonContainer>
                                                                                </UploadCoverImageButton>
                                                                                {selectedProfilePicture ||
                                                                                (data
                                                                                    ?.me
                                                                                    ?.profilePicture !==
                                                                                    "" &&
                                                                                    data
                                                                                        ?.me
                                                                                        ?.profilePicture !==
                                                                                        null) ? (
                                                                                    <PageBlock>
                                                                                        <ImageButtonContainer
                                                                                            role="button"
                                                                                            title="Remove image"
                                                                                            aria-label="Remove image"
                                                                                            onClick={() => {
                                                                                                if (
                                                                                                    uploadProfilePictureRef &&
                                                                                                    uploadProfilePictureRef.current
                                                                                                ) {
                                                                                                    uploadProfilePictureRef.current.value =
                                                                                                        "";
                                                                                                }
                                                                                                if (
                                                                                                    profilePictureRef &&
                                                                                                    profilePictureRef.current
                                                                                                ) {
                                                                                                    profilePictureRef.current.src =
                                                                                                        profilePicture;
                                                                                                }
                                                                                                setSelectedProfilePicture(
                                                                                                    null
                                                                                                );
                                                                                                setDeleteProfilePicture(
                                                                                                    true
                                                                                                );
                                                                                                setIsProfilePictureUploaded(
                                                                                                    false
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <Close
                                                                                                type="normal"
                                                                                                color="#ffffff"
                                                                                            />
                                                                                        </ImageButtonContainer>
                                                                                    </PageBlock>
                                                                                ) : null}
                                                                            </CoverImageButtonsContainer>
                                                                            <img
                                                                                src={
                                                                                    data
                                                                                        ?.me
                                                                                        ?.profilePicture !==
                                                                                        "" &&
                                                                                    data
                                                                                        ?.me
                                                                                        ?.profilePicture !==
                                                                                        null
                                                                                        ? data
                                                                                              ?.me
                                                                                              ?.profilePicture
                                                                                        : profilePicture
                                                                                }
                                                                                ref={
                                                                                    profilePictureRef
                                                                                }
                                                                                title={`${data?.me?.firstName}'s profile picture`}
                                                                                alt={`${data?.me?.firstName} ${data?.me?.lastName}`}
                                                                            />
                                                                        </CoverImageContainer>
                                                                        <ProfileLargeInfoContainer>
                                                                            <ProfileName>
                                                                                {
                                                                                    data
                                                                                        ?.me
                                                                                        ?.firstName
                                                                                }{" "}
                                                                                {
                                                                                    data
                                                                                        ?.me
                                                                                        ?.lastName
                                                                                }
                                                                            </ProfileName>
                                                                            <PageText>
                                                                                Role:{" "}{data?.me?.role}. Joined on{" "}{new Date(
                                                                                    parseInt(
                                                                                        data?.me
                                                                                            ?.createdAt!
                                                                                    )
                                                                                ).toLocaleString("en-us", {
                                                                                    month: "long",
                                                                                    year: "numeric",
                                                                                })}.
                                                                            </PageText>
                                                                        </ProfileLargeInfoContainer>
                                                                    </ProfileLargeContainer>
                                                                    {status ? (
                                                                        <Status>
                                                                            {
                                                                                status
                                                                            }
                                                                        </Status>
                                                                    ) : null}
                                                                    <EditProfileFormContent>
                                                                        <FlexRow24>
                                                                            <SelectField
                                                                                field="title"
                                                                                placeholder="Title"
                                                                                errors={
                                                                                    errors
                                                                                }
                                                                                options={
                                                                                    titleOptions
                                                                                }
                                                                            />
                                                                            <SelectField
                                                                                field="gender"
                                                                                placeholder="Gender"
                                                                                errors={
                                                                                    errors
                                                                                }
                                                                                options={
                                                                                    genderOptions
                                                                                }
                                                                            />
                                                                        </FlexRow24>
                                                                        <InputField
                                                                            field="firstName"
                                                                            type="text"
                                                                            placeholder="First name"
                                                                            value={
                                                                                values.firstName ||
                                                                                ""
                                                                            }
                                                                            errors={
                                                                                errors
                                                                            }
                                                                        />
                                                                        <InputField
                                                                            field="lastName"
                                                                            type="text"
                                                                            placeholder="Last name"
                                                                            value={
                                                                                values.lastName ||
                                                                                ""
                                                                            }
                                                                            errors={
                                                                                errors
                                                                            }
                                                                        />
                                                                        <PageBlock>
                                                                            <EditProfileButton
                                                                                type="submit"
                                                                                title="Save changes"
                                                                                role="button"
                                                                                aria-label="Save changes"
                                                                            >
                                                                                Save
                                                                                changes
                                                                            </EditProfileButton>
                                                                        </PageBlock>
                                                                        <PageText>
                                                                            Do you want to change the email address or password of your account? Go to the <Link to="/settings/account" title="Account settings" aria-label="Account settings">settings page</Link>.
                                                                        </PageText>
                                                                    </EditProfileFormContent>
                                                                </Form>
                                                            )}
                                                        </Formik>
                                                    </EditProfileFormContainer>
                                                </ProfilePageContent>
                                            </>
                                        )}
                                    </>
                                }
                            />
                        }
                    />
                }
            />
        </>
    );
}

export default ProfilePage;
