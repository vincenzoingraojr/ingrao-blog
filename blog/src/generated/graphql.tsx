import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ExtendedUserResponse = {
  __typename?: 'ExtendedUserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  ok?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDashUser?: Maybe<UserResponse>;
  authSendVerificationEmail: UserResponse;
  changePassword: UserResponse;
  changeRole: UserResponse;
  createPost: PostResponse;
  deleteAccount: ExtendedUserResponse;
  deletePost: Scalars['Boolean'];
  deleteUserFromDashboard: UserResponse;
  editEmailAddress: UserResponse;
  editProfile: UserResponse;
  editPublishedPost: PostResponse;
  editUnpublishedPost: PostResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  notAuthModifyPassword: UserResponse;
  passwordSetup: UserResponse;
  publishPost: PostResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendMessage?: Maybe<UserResponse>;
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  unpublishPost: Scalars['Boolean'];
  verifyEmailAddress: UserResponse;
};


export type MutationAddDashUserArgs = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  role: Scalars['String'];
  title: Scalars['String'];
};


export type MutationAuthSendVerificationEmailArgs = {
  origin: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  origin: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangeRoleArgs = {
  id: Scalars['Int'];
  role: Scalars['String'];
};


export type MutationCreatePostArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  origin: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
};


export type MutationDeleteUserFromDashboardArgs = {
  id: Scalars['Int'];
};


export type MutationEditEmailAddressArgs = {
  confirmEmail: Scalars['String'];
  email: Scalars['String'];
  origin: Scalars['String'];
};


export type MutationEditProfileArgs = {
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  origin: Scalars['String'];
  profilePicture: Scalars['String'];
  title: Scalars['String'];
};


export type MutationEditPublishedPostArgs = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  postCover?: InputMaybe<Scalars['String']>;
  postId: Scalars['Int'];
  slogan?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationEditUnpublishedPostArgs = {
  content?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  postCover?: InputMaybe<Scalars['String']>;
  postId: Scalars['Int'];
  slogan?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  origin: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNotAuthModifyPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPasswordSetupArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPublishPostArgs = {
  postId: Scalars['Int'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float'];
};


export type MutationSendMessageArgs = {
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  subject: Scalars['String'];
};


export type MutationSendRecoveryEmailArgs = {
  email: Scalars['String'];
  origin: Scalars['String'];
};


export type MutationSignupArgs = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUnpublishPostArgs = {
  postId: Scalars['Int'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Float'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  draft: Scalars['Boolean'];
  id: Scalars['Int'];
  postCover?: Maybe<Scalars['String']>;
  slogan?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
  status?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  blogFeed: Array<Post>;
  dashPostFeed: Array<Post>;
  dashUsers: Array<User>;
  draftPostFeed: Array<Post>;
  findPost?: Maybe<Post>;
  findPostBySlug?: Maybe<Post>;
  findUser?: Maybe<User>;
  me?: Maybe<User>;
  postFeed: Array<Post>;
};


export type QueryFindPostArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryFindPostBySlugArgs = {
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryMeArgs = {
  origin: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthDate: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profilePicture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AuthSendVerificationEmailMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type AuthSendVerificationEmailMutation = { __typename?: 'Mutation', authSendVerificationEmail: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type BlogFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogFeedQuery = { __typename?: 'Query', blogFeed: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } }> };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type DeleteAccountMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'ExtendedUserResponse', status?: string | null | undefined, ok?: boolean | null | undefined } };

export type EditEmailAddressMutationVariables = Exact<{
  confirmEmail: Scalars['String'];
  email: Scalars['String'];
  origin: Scalars['String'];
}>;


export type EditEmailAddressMutation = { __typename?: 'Mutation', editEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profilePicture: Scalars['String'];
  title: Scalars['String'];
  gender: Scalars['String'];
  origin: Scalars['String'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type FindPostBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type FindPostBySlugQuery = { __typename?: 'Query', findPostBySlug?: { __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', accessToken?: string | null | undefined, status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{
  origin: Scalars['String'];
}>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string }> | null | undefined } | null | undefined };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SendMessageMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  subject: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type SendRecoveryEmailMutationVariables = Exact<{
  email: Scalars['String'];
  origin: Scalars['String'];
}>;


export type SendRecoveryEmailMutation = { __typename?: 'Mutation', sendRecoveryEmail: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  title: Scalars['String'];
  gender: Scalars['String'];
  birthDate: Scalars['DateTime'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined } };


export const AuthSendVerificationEmailDocument = gql`
    mutation authSendVerificationEmail($origin: String!) {
  authSendVerificationEmail(origin: $origin) {
    status
  }
}
    `;
export type AuthSendVerificationEmailMutationFn = Apollo.MutationFunction<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;

/**
 * __useAuthSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useAuthSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSendVerificationEmailMutation, { data, loading, error }] = useAuthSendVerificationEmailMutation({
 *   variables: {
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useAuthSendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>(AuthSendVerificationEmailDocument, options);
      }
export type AuthSendVerificationEmailMutationHookResult = ReturnType<typeof useAuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationResult = Apollo.MutationResult<AuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;
export const BlogFeedDocument = gql`
    query blogFeed {
  blogFeed {
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
      createdAt
      updatedAt
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
 * __useBlogFeedQuery__
 *
 * To run a query within a React component, call `useBlogFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlogFeedQuery(baseOptions?: Apollo.QueryHookOptions<BlogFeedQuery, BlogFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogFeedQuery, BlogFeedQueryVariables>(BlogFeedDocument, options);
      }
export function useBlogFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogFeedQuery, BlogFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogFeedQuery, BlogFeedQueryVariables>(BlogFeedDocument, options);
        }
export type BlogFeedQueryHookResult = ReturnType<typeof useBlogFeedQuery>;
export type BlogFeedLazyQueryHookResult = ReturnType<typeof useBlogFeedLazyQuery>;
export type BlogFeedQueryResult = Apollo.QueryResult<BlogFeedQuery, BlogFeedQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($currentPassword: String!, $confirmPassword: String!, $password: String!, $origin: String!) {
  changePassword(
    currentPassword: $currentPassword
    confirmPassword: $confirmPassword
    password: $password
    origin: $origin
  ) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount($origin: String!) {
  deleteAccount(origin: $origin) {
    status
    ok
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const EditEmailAddressDocument = gql`
    mutation editEmailAddress($confirmEmail: String!, $email: String!, $origin: String!) {
  editEmailAddress(confirmEmail: $confirmEmail, email: $email, origin: $origin) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type EditEmailAddressMutationFn = Apollo.MutationFunction<EditEmailAddressMutation, EditEmailAddressMutationVariables>;

/**
 * __useEditEmailAddressMutation__
 *
 * To run a mutation, you first call `useEditEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmailAddressMutation, { data, loading, error }] = useEditEmailAddressMutation({
 *   variables: {
 *      confirmEmail: // value for 'confirmEmail'
 *      email: // value for 'email'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useEditEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEmailAddressMutation, EditEmailAddressMutationVariables>(EditEmailAddressDocument, options);
      }
export type EditEmailAddressMutationHookResult = ReturnType<typeof useEditEmailAddressMutation>;
export type EditEmailAddressMutationResult = Apollo.MutationResult<EditEmailAddressMutation>;
export type EditEmailAddressMutationOptions = Apollo.BaseMutationOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($firstName: String!, $lastName: String!, $profilePicture: String!, $title: String!, $gender: String!, $origin: String!) {
  editProfile(
    firstName: $firstName
    lastName: $lastName
    profilePicture: $profilePicture
    title: $title
    gender: $gender
    origin: $origin
  ) {
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
      createdAt
      updatedAt
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
    status
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      profilePicture: // value for 'profilePicture'
 *      title: // value for 'title'
 *      gender: // value for 'gender'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FindPostBySlugDocument = gql`
    query findPostBySlug($slug: String) {
  findPostBySlug(slug: $slug) {
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
      createdAt
      updatedAt
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
 * __useFindPostBySlugQuery__
 *
 * To run a query within a React component, call `useFindPostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFindPostBySlugQuery(baseOptions?: Apollo.QueryHookOptions<FindPostBySlugQuery, FindPostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostBySlugQuery, FindPostBySlugQueryVariables>(FindPostBySlugDocument, options);
      }
export function useFindPostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostBySlugQuery, FindPostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostBySlugQuery, FindPostBySlugQueryVariables>(FindPostBySlugDocument, options);
        }
export type FindPostBySlugQueryHookResult = ReturnType<typeof useFindPostBySlugQuery>;
export type FindPostBySlugLazyQueryHookResult = ReturnType<typeof useFindPostBySlugLazyQuery>;
export type FindPostBySlugQueryResult = Apollo.QueryResult<FindPostBySlugQuery, FindPostBySlugQueryVariables>;
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
      createdAt
      updatedAt
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
    createdAt
    updatedAt
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
export function useMeQuery(baseOptions: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotAuthModifyPasswordDocument = gql`
    mutation notAuthModifyPassword($token: String!, $confirmPassword: String!, $password: String!) {
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
export type NotAuthModifyPasswordMutationFn = Apollo.MutationFunction<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;

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
export function useNotAuthModifyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>(NotAuthModifyPasswordDocument, options);
      }
export type NotAuthModifyPasswordMutationHookResult = ReturnType<typeof useNotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationResult = Apollo.MutationResult<NotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationOptions = Apollo.BaseMutationOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($name: String!, $email: String!, $subject: String!, $message: String!) {
  sendMessage(name: $name, email: $email, subject: $subject, message: $message) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      subject: // value for 'subject'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
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
export type SendRecoveryEmailMutationFn = Apollo.MutationFunction<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;

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
export function useSendRecoveryEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>(SendRecoveryEmailDocument, options);
      }
export type SendRecoveryEmailMutationHookResult = ReturnType<typeof useSendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationResult = Apollo.MutationResult<SendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationOptions = Apollo.BaseMutationOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;
export const SignupDocument = gql`
    mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!, $title: String!, $gender: String!, $birthDate: DateTime!) {
  signup(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
    title: $title
    gender: $gender
    birthDate: $birthDate
  ) {
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
      createdAt
      updatedAt
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
    status
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      title: // value for 'title'
 *      gender: // value for 'gender'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const VerifyEmailAddressDocument = gql`
    mutation verifyEmailAddress($token: String!) {
  verifyEmailAddress(token: $token) {
    status
  }
}
    `;
export type VerifyEmailAddressMutationFn = Apollo.MutationFunction<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(VerifyEmailAddressDocument, options);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = Apollo.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = Apollo.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;