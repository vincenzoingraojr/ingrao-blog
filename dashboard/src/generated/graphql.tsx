import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type FieldError = {
    __typename?: "FieldError";
    field?: Maybe<Scalars["String"]>;
    message: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    addDashUser?: Maybe<UserResponse>;
    createPost: PostResponse;
    deletePost: Scalars["Boolean"];
    editPublishedPost: PostResponse;
    editUnpublishedPost: PostResponse;
    login?: Maybe<UserResponse>;
    logout: Scalars["Boolean"];
    notAuthModifyPassword: UserResponse;
    passwordSetup: UserResponse;
    publishPost: PostResponse;
    revokeRefreshTokensForUser: Scalars["Boolean"];
    sendRecoveryEmail: UserResponse;
    signup?: Maybe<UserResponse>;
    unpublishPost: Scalars["Boolean"];
    verifyEmailAddress: UserResponse;
};

export type MutationAddDashUserArgs = {
    birthDate: Scalars["DateTime"];
    email: Scalars["String"];
    firstName: Scalars["String"];
    gender: Scalars["String"];
    lastName: Scalars["String"];
    role: Scalars["String"];
    title: Scalars["String"];
};

export type MutationCreatePostArgs = {
    slug: Scalars["String"];
};

export type MutationDeletePostArgs = {
    postId: Scalars["Int"];
};

export type MutationEditPublishedPostArgs = {
    content?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
    postCover?: InputMaybe<Scalars["String"]>;
    postId: Scalars["Int"];
    slogan?: InputMaybe<Scalars["String"]>;
    slug: Scalars["String"];
    title?: InputMaybe<Scalars["String"]>;
};

export type MutationEditUnpublishedPostArgs = {
    content?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
    postCover?: InputMaybe<Scalars["String"]>;
    postId: Scalars["Int"];
    slogan?: InputMaybe<Scalars["String"]>;
    slug: Scalars["String"];
    title?: InputMaybe<Scalars["String"]>;
};

export type MutationLoginArgs = {
    email: Scalars["String"];
    origin: Scalars["String"];
    password: Scalars["String"];
};

export type MutationNotAuthModifyPasswordArgs = {
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
    token: Scalars["String"];
};

export type MutationPasswordSetupArgs = {
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
    token: Scalars["String"];
};

export type MutationPublishPostArgs = {
    postId: Scalars["Int"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
    id: Scalars["Float"];
};

export type MutationSendRecoveryEmailArgs = {
    email: Scalars["String"];
    origin: Scalars["String"];
};

export type MutationSignupArgs = {
    birthDate: Scalars["DateTime"];
    email: Scalars["String"];
    firstName: Scalars["String"];
    gender: Scalars["String"];
    lastName: Scalars["String"];
    password: Scalars["String"];
    title: Scalars["String"];
};

export type MutationUnpublishPostArgs = {
    postId: Scalars["Int"];
};

export type MutationVerifyEmailAddressArgs = {
    token: Scalars["String"];
};

export type Post = {
    __typename?: "Post";
    author: User;
    authorId: Scalars["Float"];
    content?: Maybe<Scalars["String"]>;
    createdAt: Scalars["String"];
    description?: Maybe<Scalars["String"]>;
    draft: Scalars["Boolean"];
    id: Scalars["Int"];
    postCover?: Maybe<Scalars["String"]>;
    slogan?: Maybe<Scalars["String"]>;
    slug: Scalars["String"];
    title?: Maybe<Scalars["String"]>;
    updatedAt: Scalars["String"];
};

export type PostResponse = {
    __typename?: "PostResponse";
    errors?: Maybe<Array<FieldError>>;
    post?: Maybe<Post>;
    status?: Maybe<Scalars["String"]>;
};

export type Query = {
    __typename?: "Query";
    draftPostFeed: Array<Post>;
    findPost?: Maybe<Post>;
    me?: Maybe<User>;
    postFeed: Array<Post>;
};

export type QueryFindPostArgs = {
    id?: InputMaybe<Scalars["Int"]>;
};

export type QueryMeArgs = {
    origin: Scalars["String"];
};

export type User = {
    __typename?: "User";
    birthDate: Scalars["String"];
    email: Scalars["String"];
    firstName: Scalars["String"];
    gender: Scalars["String"];
    id: Scalars["Int"];
    lastName: Scalars["String"];
    posts?: Maybe<Array<Post>>;
    profilePicture?: Maybe<Scalars["String"]>;
    role: Scalars["String"];
    title: Scalars["String"];
    verified: Scalars["Boolean"];
};

export type UserResponse = {
    __typename?: "UserResponse";
    accessToken?: Maybe<Scalars["String"]>;
    errors?: Maybe<Array<FieldError>>;
    status?: Maybe<Scalars["String"]>;
    user?: Maybe<User>;
};

export type CreatePostMutationVariables = Exact<{
    slug: Scalars["String"];
}>;

export type CreatePostMutation = {
    __typename?: "Mutation";
    createPost: {
        __typename?: "PostResponse";
        status?: string | null | undefined;
        post?:
            | {
                  __typename?: "Post";
                  id: number;
                  slug: string;
                  draft: boolean;
                  authorId: number;
                  title?: string | null | undefined;
                  description?: string | null | undefined;
                  slogan?: string | null | undefined;
                  postCover?: string | null | undefined;
                  content?: string | null | undefined;
                  createdAt: string;
                  updatedAt: string;
                  author: {
                      __typename?: "User";
                      id: number;
                      firstName: string;
                      lastName: string;
                      email: string;
                      birthDate: string;
                      gender: string;
                      title: string;
                      verified: boolean;
                      role: string;
                      profilePicture?: string | null | undefined;
                  };
              }
            | null
            | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type DeletePostMutationVariables = Exact<{
    postId: Scalars["Int"];
}>;

export type DeletePostMutation = {
    __typename?: "Mutation";
    deletePost: boolean;
};

export type DraftPostFeedQueryVariables = Exact<{ [key: string]: never }>;

export type DraftPostFeedQuery = {
    __typename?: "Query";
    draftPostFeed: Array<{
        __typename?: "Post";
        id: number;
        slug: string;
        draft: boolean;
        authorId: number;
        title?: string | null | undefined;
        description?: string | null | undefined;
        slogan?: string | null | undefined;
        postCover?: string | null | undefined;
        content?: string | null | undefined;
        createdAt: string;
        updatedAt: string;
        author: {
            __typename?: "User";
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            birthDate: string;
            gender: string;
            title: string;
            verified: boolean;
            role: string;
            profilePicture?: string | null | undefined;
        };
    }>;
};

export type EditUnpublishedPostMutationVariables = Exact<{
    postId: Scalars["Int"];
    slug: Scalars["String"];
    title?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
    slogan?: InputMaybe<Scalars["String"]>;
    postCover?: InputMaybe<Scalars["String"]>;
    content?: InputMaybe<Scalars["String"]>;
}>;

export type EditUnpublishedPostMutation = {
    __typename?: "Mutation";
    editUnpublishedPost: {
        __typename?: "PostResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type FindPostQueryVariables = Exact<{
    id?: InputMaybe<Scalars["Int"]>;
}>;

export type FindPostQuery = {
    __typename?: "Query";
    findPost?:
        | {
              __typename?: "Post";
              id: number;
              slug: string;
              draft: boolean;
              authorId: number;
              title?: string | null | undefined;
              description?: string | null | undefined;
              slogan?: string | null | undefined;
              postCover?: string | null | undefined;
              content?: string | null | undefined;
              createdAt: string;
              updatedAt: string;
              author: {
                  __typename?: "User";
                  id: number;
                  firstName: string;
                  lastName: string;
                  email: string;
                  birthDate: string;
                  gender: string;
                  title: string;
                  verified: boolean;
                  role: string;
                  profilePicture?: string | null | undefined;
              };
          }
        | null
        | undefined;
};

export type LoginMutationVariables = Exact<{
    email: Scalars["String"];
    password: Scalars["String"];
    origin: Scalars["String"];
}>;

export type LoginMutation = {
    __typename?: "Mutation";
    login?:
        | {
              __typename?: "UserResponse";
              accessToken?: string | null | undefined;
              status?: string | null | undefined;
              user?:
                  | {
                        __typename?: "User";
                        id: number;
                        firstName: string;
                        lastName: string;
                        email: string;
                        birthDate: string;
                        gender: string;
                        title: string;
                        verified: boolean;
                        role: string;
                        profilePicture?: string | null | undefined;
                        posts?:
                            | Array<{
                                  __typename?: "Post";
                                  id: number;
                                  slug: string;
                                  draft: boolean;
                                  authorId: number;
                                  title?: string | null | undefined;
                                  description?: string | null | undefined;
                                  slogan?: string | null | undefined;
                                  postCover?: string | null | undefined;
                                  content?: string | null | undefined;
                                  createdAt: string;
                                  updatedAt: string;
                              }>
                            | null
                            | undefined;
                    }
                  | null
                  | undefined;
              errors?:
                  | Array<{
                        __typename?: "FieldError";
                        field?: string | null | undefined;
                        message: string;
                    }>
                  | null
                  | undefined;
          }
        | null
        | undefined;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type MeQueryVariables = Exact<{
    origin: Scalars["String"];
}>;

export type MeQuery = {
    __typename?: "Query";
    me?:
        | {
              __typename?: "User";
              id: number;
              firstName: string;
              lastName: string;
              email: string;
              birthDate: string;
              gender: string;
              title: string;
              verified: boolean;
              role: string;
              profilePicture?: string | null | undefined;
              posts?:
                  | Array<{
                        __typename?: "Post";
                        id: number;
                        slug: string;
                        draft: boolean;
                        authorId: number;
                        title?: string | null | undefined;
                        description?: string | null | undefined;
                        slogan?: string | null | undefined;
                        postCover?: string | null | undefined;
                        content?: string | null | undefined;
                        createdAt: string;
                        updatedAt: string;
                    }>
                  | null
                  | undefined;
          }
        | null
        | undefined;
};

export type NotAuthModifyPasswordMutationVariables = Exact<{
    token: Scalars["String"];
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
}>;

export type NotAuthModifyPasswordMutation = {
    __typename?: "Mutation";
    notAuthModifyPassword: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type PasswordSetupMutationVariables = Exact<{
    token: Scalars["String"];
    confirmPassword: Scalars["String"];
    password: Scalars["String"];
}>;

export type PasswordSetupMutation = {
    __typename?: "Mutation";
    passwordSetup: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type PublishPostMutationVariables = Exact<{
    postId: Scalars["Int"];
}>;

export type PublishPostMutation = {
    __typename?: "Mutation";
    publishPost: {
        __typename?: "PostResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export type SendRecoveryEmailMutationVariables = Exact<{
    email: Scalars["String"];
    origin: Scalars["String"];
}>;

export type SendRecoveryEmailMutation = {
    __typename?: "Mutation";
    sendRecoveryEmail: {
        __typename?: "UserResponse";
        status?: string | null | undefined;
        errors?:
            | Array<{
                  __typename?: "FieldError";
                  field?: string | null | undefined;
                  message: string;
              }>
            | null
            | undefined;
    };
};

export const CreatePostDocument = gql`
    mutation createPost($slug: String!) {
        createPost(slug: $slug) {
            post {
                id
                slug
                draft
                authorId
                author {
                    id
                    firstName
                    lastName
                    email
                    birthDate
                    gender
                    title
                    verified
                    role
                    profilePicture
                }
                title
                description
                slogan
                postCover
                content
                createdAt
                updatedAt
            }
            status
            errors {
                field
                message
            }
        }
    }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
    CreatePostMutation,
    CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCreatePostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreatePostMutation,
        CreatePostMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        options
    );
}
export type CreatePostMutationHookResult = ReturnType<
    typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
    Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
    CreatePostMutation,
    CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
    mutation deletePost($postId: Int!) {
        deletePost(postId: $postId)
    }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
    DeletePostMutation,
    DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeletePostMutation,
        DeletePostMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        options
    );
}
export type DeletePostMutationHookResult = ReturnType<
    typeof useDeletePostMutation
>;
export type DeletePostMutationResult =
    Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
    DeletePostMutation,
    DeletePostMutationVariables
>;
export const DraftPostFeedDocument = gql`
    query draftPostFeed {
        draftPostFeed {
            id
            slug
            draft
            authorId
            author {
                id
                firstName
                lastName
                email
                birthDate
                gender
                title
                verified
                role
                profilePicture
            }
            title
            description
            slogan
            postCover
            content
            createdAt
            updatedAt
        }
    }
`;

/**
 * __useDraftPostFeedQuery__
 *
 * To run a query within a React component, call `useDraftPostFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftPostFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftPostFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useDraftPostFeedQuery(
    baseOptions?: Apollo.QueryHookOptions<
        DraftPostFeedQuery,
        DraftPostFeedQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<DraftPostFeedQuery, DraftPostFeedQueryVariables>(
        DraftPostFeedDocument,
        options
    );
}
export function useDraftPostFeedLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        DraftPostFeedQuery,
        DraftPostFeedQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<DraftPostFeedQuery, DraftPostFeedQueryVariables>(
        DraftPostFeedDocument,
        options
    );
}
export type DraftPostFeedQueryHookResult = ReturnType<
    typeof useDraftPostFeedQuery
>;
export type DraftPostFeedLazyQueryHookResult = ReturnType<
    typeof useDraftPostFeedLazyQuery
>;
export type DraftPostFeedQueryResult = Apollo.QueryResult<
    DraftPostFeedQuery,
    DraftPostFeedQueryVariables
>;
export const EditUnpublishedPostDocument = gql`
    mutation editUnpublishedPost(
        $postId: Int!
        $slug: String!
        $title: String
        $description: String
        $slogan: String
        $postCover: String
        $content: String
    ) {
        editUnpublishedPost(
            postId: $postId
            slug: $slug
            title: $title
            description: $description
            slogan: $slogan
            postCover: $postCover
            content: $content
        ) {
            errors {
                field
                message
            }
            status
        }
    }
`;
export type EditUnpublishedPostMutationFn = Apollo.MutationFunction<
    EditUnpublishedPostMutation,
    EditUnpublishedPostMutationVariables
>;

/**
 * __useEditUnpublishedPostMutation__
 *
 * To run a mutation, you first call `useEditUnpublishedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUnpublishedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUnpublishedPostMutation, { data, loading, error }] = useEditUnpublishedPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      slogan: // value for 'slogan'
 *      postCover: // value for 'postCover'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditUnpublishedPostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditUnpublishedPostMutation,
        EditUnpublishedPostMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        EditUnpublishedPostMutation,
        EditUnpublishedPostMutationVariables
    >(EditUnpublishedPostDocument, options);
}
export type EditUnpublishedPostMutationHookResult = ReturnType<
    typeof useEditUnpublishedPostMutation
>;
export type EditUnpublishedPostMutationResult =
    Apollo.MutationResult<EditUnpublishedPostMutation>;
export type EditUnpublishedPostMutationOptions = Apollo.BaseMutationOptions<
    EditUnpublishedPostMutation,
    EditUnpublishedPostMutationVariables
>;
export const FindPostDocument = gql`
    query findPost($id: Int) {
        findPost(id: $id) {
            id
            slug
            draft
            authorId
            author {
                id
                firstName
                lastName
                email
                birthDate
                gender
                title
                verified
                role
                profilePicture
            }
            title
            description
            slogan
            postCover
            content
            createdAt
            updatedAt
        }
    }
`;

/**
 * __useFindPostQuery__
 *
 * To run a query within a React component, call `useFindPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPostQuery(
    baseOptions?: Apollo.QueryHookOptions<FindPostQuery, FindPostQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<FindPostQuery, FindPostQueryVariables>(
        FindPostDocument,
        options
    );
}
export function useFindPostLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        FindPostQuery,
        FindPostQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<FindPostQuery, FindPostQueryVariables>(
        FindPostDocument,
        options
    );
}
export type FindPostQueryHookResult = ReturnType<typeof useFindPostQuery>;
export type FindPostLazyQueryHookResult = ReturnType<
    typeof useFindPostLazyQuery
>;
export type FindPostQueryResult = Apollo.QueryResult<
    FindPostQuery,
    FindPostQueryVariables
>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $origin: String!) {
        login(email: $email, password: $password, origin: $origin) {
            user {
                id
                firstName
                lastName
                email
                birthDate
                gender
                title
                verified
                role
                profilePicture
                posts {
                    id
                    slug
                    draft
                    authorId
                    title
                    description
                    slogan
                    postCover
                    content
                    createdAt
                    updatedAt
                }
            }
            errors {
                field
                message
            }
            accessToken
            status
        }
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        options
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const MeDocument = gql`
    query Me($origin: String!) {
        me(origin: $origin) {
            id
            firstName
            lastName
            email
            birthDate
            gender
            title
            verified
            role
            profilePicture
            posts {
                id
                slug
                draft
                authorId
                title
                description
                slogan
                postCover
                content
                createdAt
                updatedAt
            }
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useMeQuery(
    baseOptions: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotAuthModifyPasswordDocument = gql`
    mutation notAuthModifyPassword(
        $token: String!
        $confirmPassword: String!
        $password: String!
    ) {
        notAuthModifyPassword(
            token: $token
            confirmPassword: $confirmPassword
            password: $password
        ) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type NotAuthModifyPasswordMutationFn = Apollo.MutationFunction<
    NotAuthModifyPasswordMutation,
    NotAuthModifyPasswordMutationVariables
>;

/**
 * __useNotAuthModifyPasswordMutation__
 *
 * To run a mutation, you first call `useNotAuthModifyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotAuthModifyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notAuthModifyPasswordMutation, { data, loading, error }] = useNotAuthModifyPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useNotAuthModifyPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NotAuthModifyPasswordMutation,
        NotAuthModifyPasswordMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        NotAuthModifyPasswordMutation,
        NotAuthModifyPasswordMutationVariables
    >(NotAuthModifyPasswordDocument, options);
}
export type NotAuthModifyPasswordMutationHookResult = ReturnType<
    typeof useNotAuthModifyPasswordMutation
>;
export type NotAuthModifyPasswordMutationResult =
    Apollo.MutationResult<NotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationOptions = Apollo.BaseMutationOptions<
    NotAuthModifyPasswordMutation,
    NotAuthModifyPasswordMutationVariables
>;
export const PasswordSetupDocument = gql`
    mutation passwordSetup(
        $token: String!
        $confirmPassword: String!
        $password: String!
    ) {
        passwordSetup(
            token: $token
            confirmPassword: $confirmPassword
            password: $password
        ) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type PasswordSetupMutationFn = Apollo.MutationFunction<
    PasswordSetupMutation,
    PasswordSetupMutationVariables
>;

/**
 * __usePasswordSetupMutation__
 *
 * To run a mutation, you first call `usePasswordSetupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordSetupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordSetupMutation, { data, loading, error }] = usePasswordSetupMutation({
 *   variables: {
 *      token: // value for 'token'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePasswordSetupMutation(
    baseOptions?: Apollo.MutationHookOptions<
        PasswordSetupMutation,
        PasswordSetupMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        PasswordSetupMutation,
        PasswordSetupMutationVariables
    >(PasswordSetupDocument, options);
}
export type PasswordSetupMutationHookResult = ReturnType<
    typeof usePasswordSetupMutation
>;
export type PasswordSetupMutationResult =
    Apollo.MutationResult<PasswordSetupMutation>;
export type PasswordSetupMutationOptions = Apollo.BaseMutationOptions<
    PasswordSetupMutation,
    PasswordSetupMutationVariables
>;
export const PublishPostDocument = gql`
    mutation publishPost($postId: Int!) {
        publishPost(postId: $postId) {
            errors {
                field
                message
            }
            status
        }
    }
`;
export type PublishPostMutationFn = Apollo.MutationFunction<
    PublishPostMutation,
    PublishPostMutationVariables
>;

/**
 * __usePublishPostMutation__
 *
 * To run a mutation, you first call `usePublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishPostMutation, { data, loading, error }] = usePublishPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePublishPostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        PublishPostMutation,
        PublishPostMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        PublishPostMutation,
        PublishPostMutationVariables
    >(PublishPostDocument, options);
}
export type PublishPostMutationHookResult = ReturnType<
    typeof usePublishPostMutation
>;
export type PublishPostMutationResult =
    Apollo.MutationResult<PublishPostMutation>;
export type PublishPostMutationOptions = Apollo.BaseMutationOptions<
    PublishPostMutation,
    PublishPostMutationVariables
>;
export const SendRecoveryEmailDocument = gql`
    mutation sendRecoveryEmail($email: String!, $origin: String!) {
        sendRecoveryEmail(email: $email, origin: $origin) {
            status
            errors {
                field
                message
            }
        }
    }
`;
export type SendRecoveryEmailMutationFn = Apollo.MutationFunction<
    SendRecoveryEmailMutation,
    SendRecoveryEmailMutationVariables
>;

/**
 * __useSendRecoveryEmailMutation__
 *
 * To run a mutation, you first call `useSendRecoveryEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRecoveryEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRecoveryEmailMutation, { data, loading, error }] = useSendRecoveryEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useSendRecoveryEmailMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendRecoveryEmailMutation,
        SendRecoveryEmailMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SendRecoveryEmailMutation,
        SendRecoveryEmailMutationVariables
    >(SendRecoveryEmailDocument, options);
}
export type SendRecoveryEmailMutationHookResult = ReturnType<
    typeof useSendRecoveryEmailMutation
>;
export type SendRecoveryEmailMutationResult =
    Apollo.MutationResult<SendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationOptions = Apollo.BaseMutationOptions<
    SendRecoveryEmailMutation,
    SendRecoveryEmailMutationVariables
>;
