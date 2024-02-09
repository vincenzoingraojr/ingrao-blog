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

export type AnalyticsResponse = {
  __typename?: 'AnalyticsResponse';
  uniqueVisitors: Scalars['Int'];
  uniqueVisitorsVariation: Scalars['Float'];
  views: Scalars['Int'];
  viewsByDay: Array<ViewByDay>;
  viewsVariation: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Float'];
  commentId: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isEdited?: Maybe<Scalars['Boolean']>;
  isReplyTo?: Maybe<Scalars['String']>;
  postId: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
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
  createComment: CommentResponse;
  createIssue: NewsletterResponse;
  createPost: PostResponse;
  deleteAccount: ExtendedUserResponse;
  deleteComment: Scalars['Boolean'];
  deleteIssue: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUserFromDashboard: UserResponse;
  editEmailAddress: UserResponse;
  editProfile: UserResponse;
  editPublishedIssue: NewsletterResponse;
  editPublishedPost: PostResponse;
  editUnpublishedIssue: NewsletterResponse;
  editUnpublishedPost: PostResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  notAuthModifyPassword: UserResponse;
  passwordSetup: UserResponse;
  publishIssue: NewsletterResponse;
  publishPost: PostResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendMessage?: Maybe<UserResponse>;
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  subscribeToNewsletter: UserResponse;
  unpublishIssue: Scalars['Boolean'];
  unpublishPost: Scalars['Boolean'];
  unsubscribeFromNewsletter: UserResponse;
  updateComment: CommentResponse;
  verifyEmailAddress: UserResponse;
  viewPage: Scalars['Boolean'];
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


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  isReplyTo: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationCreateIssueArgs = {
  title: Scalars['String'];
};


export type MutationCreatePostArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  origin: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
  hasReplies: Scalars['Boolean'];
};


export type MutationDeleteIssueArgs = {
  id: Scalars['Int'];
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


export type MutationEditPublishedIssueArgs = {
  content?: InputMaybe<Scalars['String']>;
  newsletterCover?: InputMaybe<Scalars['String']>;
  newsletterId: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
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


export type MutationEditUnpublishedIssueArgs = {
  content?: InputMaybe<Scalars['String']>;
  newsletterCover?: InputMaybe<Scalars['String']>;
  newsletterId: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
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


export type MutationPublishIssueArgs = {
  newsletterId: Scalars['String'];
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
  newsletterSubscribed: Scalars['Boolean'];
  password: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUnpublishIssueArgs = {
  id: Scalars['Int'];
};


export type MutationUnpublishPostArgs = {
  postId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationViewPageArgs = {
  pathname: Scalars['String'];
};

export type Newsletter = {
  __typename?: 'Newsletter';
  author: User;
  authorId: Scalars['Float'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  draft: Scalars['Boolean'];
  id: Scalars['Int'];
  isEdited?: Maybe<Scalars['Boolean']>;
  newsletterCover?: Maybe<Scalars['String']>;
  newsletterId: Scalars['String'];
  subject?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type NewsletterResponse = {
  __typename?: 'NewsletterResponse';
  errors?: Maybe<Array<FieldError>>;
  issue?: Maybe<Newsletter>;
  status?: Maybe<Scalars['String']>;
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
  isEdited?: Maybe<Scalars['Boolean']>;
  postCover?: Maybe<Scalars['String']>;
  publishedOn?: Maybe<Scalars['String']>;
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
  commentReplies: Array<Comment>;
  dashNewsletterFeed: Array<Newsletter>;
  dashPostFeed: Array<Post>;
  dashUsers: Array<User>;
  draftNewsletterFeed: Array<Newsletter>;
  draftPostFeed: Array<Post>;
  findNewsletterById?: Maybe<Newsletter>;
  findNewsletterIssue?: Maybe<Newsletter>;
  findPost?: Maybe<Post>;
  findPostBySlug?: Maybe<Post>;
  findUser?: Maybe<User>;
  me?: Maybe<User>;
  newsletterBlogFeed: Array<Newsletter>;
  newsletterPersonalFeed: Array<Newsletter>;
  personalComments: Array<Comment>;
  postComments: Array<Comment>;
  postFeed: Array<Post>;
  subscribedUsers: Array<User>;
  summary: AnalyticsResponse;
  userFrequencies: UserFrequenciesResponse;
};


export type QueryCommentRepliesArgs = {
  commentId: Scalars['String'];
};


export type QueryFindNewsletterByIdArgs = {
  newsletterId?: InputMaybe<Scalars['String']>;
};


export type QueryFindNewsletterIssueArgs = {
  id?: InputMaybe<Scalars['Int']>;
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


export type QueryPostCommentsArgs = {
  postId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  birthDate: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  issues?: Maybe<Array<Newsletter>>;
  lastName: Scalars['String'];
  newsletterSubscribed: Scalars['Boolean'];
  posts?: Maybe<Array<Post>>;
  profilePicture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserFrequenciesResponse = {
  __typename?: 'UserFrequenciesResponse';
  authenticatedUsers: Scalars['Int'];
  unAuthenticatedUsers: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ViewByDay = {
  __typename?: 'ViewByDay';
  date: Scalars['String'];
  views: Scalars['Int'];
};

export type AddDashUserMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String'];
  gender: Scalars['String'];
  role: Scalars['String'];
  birthDate: Scalars['DateTime'];
}>;


export type AddDashUserMutation = { __typename?: 'Mutation', addDashUser?: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, newsletterSubscribed: boolean, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type AuthSendVerificationEmailMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type AuthSendVerificationEmailMutation = { __typename?: 'Mutation', authSendVerificationEmail: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type ChangeRoleMutationVariables = Exact<{
  id: Scalars['Int'];
  role: Scalars['String'];
}>;


export type ChangeRoleMutation = { __typename?: 'Mutation', changeRole: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, newsletterSubscribed: boolean, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type CreateIssueMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateIssueMutation = { __typename?: 'Mutation', createIssue: { __typename?: 'NewsletterResponse', status?: string | null | undefined, issue?: { __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type CreatePostMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', status?: string | null | undefined, post?: { __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type DashNewsletterFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type DashNewsletterFeedQuery = { __typename?: 'Query', dashNewsletterFeed: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } }> };

export type DashPostFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type DashPostFeedQuery = { __typename?: 'Query', dashPostFeed: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

export type DashUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type DashUsersQuery = { __typename?: 'Query', dashUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined }> };

export type DeleteAccountMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'ExtendedUserResponse', status?: string | null | undefined, ok?: boolean | null | undefined } };

export type DeleteIssueMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteIssueMutation = { __typename?: 'Mutation', deleteIssue: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DeleteUserFromDashboardMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserFromDashboardMutation = { __typename?: 'Mutation', deleteUserFromDashboard: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type DraftNewsletterFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftNewsletterFeedQuery = { __typename?: 'Query', draftNewsletterFeed: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } }> };

export type DraftPostFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftPostFeedQuery = { __typename?: 'Query', draftPostFeed: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

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


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditPublishedIssueMutationVariables = Exact<{
  newsletterId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  newsletterCover?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type EditPublishedIssueMutation = { __typename?: 'Mutation', editPublishedIssue: { __typename?: 'NewsletterResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditPublishedPostMutationVariables = Exact<{
  postId: Scalars['Int'];
  slug: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  slogan?: InputMaybe<Scalars['String']>;
  postCover?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type EditPublishedPostMutation = { __typename?: 'Mutation', editPublishedPost: { __typename?: 'PostResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditUnpublishedIssueMutationVariables = Exact<{
  newsletterId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  newsletterCover?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type EditUnpublishedIssueMutation = { __typename?: 'Mutation', editUnpublishedIssue: { __typename?: 'NewsletterResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditUnpublishedPostMutationVariables = Exact<{
  postId: Scalars['Int'];
  slug: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  slogan?: InputMaybe<Scalars['String']>;
  postCover?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
}>;


export type EditUnpublishedPostMutation = { __typename?: 'Mutation', editUnpublishedPost: { __typename?: 'PostResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type FindNewsletterByIdQueryVariables = Exact<{
  newsletterId?: InputMaybe<Scalars['String']>;
}>;


export type FindNewsletterByIdQuery = { __typename?: 'Query', findNewsletterById?: { __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined };

export type FindNewsletterIssueQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type FindNewsletterIssueQuery = { __typename?: 'Query', findNewsletterIssue?: { __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined };

export type FindPostQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type FindPostQuery = { __typename?: 'Query', findPost?: { __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } } | null | undefined };

export type FindPostBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type FindPostBySlugQuery = { __typename?: 'Query', findPostBySlug?: { __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } } | null | undefined };

export type FindUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', accessToken?: string | null | undefined, status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{
  origin: Scalars['String'];
}>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined };

export type NewsletterPersonalFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsletterPersonalFeedQuery = { __typename?: 'Query', newsletterPersonalFeed: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } }> };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type PasswordSetupMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type PasswordSetupMutation = { __typename?: 'Mutation', passwordSetup: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type PostFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type PostFeedQuery = { __typename?: 'Query', postFeed: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

export type PublishIssueMutationVariables = Exact<{
  newsletterId: Scalars['String'];
}>;


export type PublishIssueMutation = { __typename?: 'Mutation', publishIssue: { __typename?: 'NewsletterResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type PublishPostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type PublishPostMutation = { __typename?: 'Mutation', publishPost: { __typename?: 'PostResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SendRecoveryEmailMutationVariables = Exact<{
  email: Scalars['String'];
  origin: Scalars['String'];
}>;


export type SendRecoveryEmailMutation = { __typename?: 'Mutation', sendRecoveryEmail: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SubscribedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscribedUsersQuery = { __typename?: 'Query', subscribedUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined }> };

export type SummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type SummaryQuery = { __typename?: 'Query', summary: { __typename?: 'AnalyticsResponse', views: number, viewsVariation: number, uniqueVisitors: number, uniqueVisitorsVariation: number, viewsByDay: Array<{ __typename?: 'ViewByDay', views: number, date: string }> } };

export type UnpublishIssueMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnpublishIssueMutation = { __typename?: 'Mutation', unpublishIssue: boolean };

export type UnpublishPostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type UnpublishPostMutation = { __typename?: 'Mutation', unpublishPost: boolean };

export type UnsubscribeFromNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnsubscribeFromNewsletterMutation = { __typename?: 'Mutation', unsubscribeFromNewsletter: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined } };

export type UserFrequenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFrequenciesQuery = { __typename?: 'Query', userFrequencies: { __typename?: 'UserFrequenciesResponse', authenticatedUsers: number, unAuthenticatedUsers: number } };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined } };


export const AddDashUserDocument = gql`
    mutation addDashUser($email: String!, $firstName: String!, $lastName: String!, $title: String!, $gender: String!, $role: String!, $birthDate: DateTime!) {
  addDashUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    title: $title
    gender: $gender
    role: $role
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
      newsletterSubscribed
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
        isEdited
        updatedAt
        publishedOn
      }
      issues {
        id
        newsletterId
        draft
        authorId
        title
        subject
        newsletterCover
        content
        createdAt
        isEdited
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
export type AddDashUserMutationFn = Apollo.MutationFunction<AddDashUserMutation, AddDashUserMutationVariables>;

/**
 * __useAddDashUserMutation__
 *
 * To run a mutation, you first call `useAddDashUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDashUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDashUserMutation, { data, loading, error }] = useAddDashUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      title: // value for 'title'
 *      gender: // value for 'gender'
 *      role: // value for 'role'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useAddDashUserMutation(baseOptions?: Apollo.MutationHookOptions<AddDashUserMutation, AddDashUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDashUserMutation, AddDashUserMutationVariables>(AddDashUserDocument, options);
      }
export type AddDashUserMutationHookResult = ReturnType<typeof useAddDashUserMutation>;
export type AddDashUserMutationResult = Apollo.MutationResult<AddDashUserMutation>;
export type AddDashUserMutationOptions = Apollo.BaseMutationOptions<AddDashUserMutation, AddDashUserMutationVariables>;
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
export const ChangeRoleDocument = gql`
    mutation changeRole($id: Int!, $role: String!) {
  changeRole(id: $id, role: $role) {
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
      newsletterSubscribed
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
        isEdited
        updatedAt
        publishedOn
      }
      issues {
        id
        newsletterId
        draft
        authorId
        title
        subject
        newsletterCover
        content
        createdAt
        isEdited
        updatedAt
      }
    }
    status
    errors {
      field
      message
    }
  }
}
    `;
export type ChangeRoleMutationFn = Apollo.MutationFunction<ChangeRoleMutation, ChangeRoleMutationVariables>;

/**
 * __useChangeRoleMutation__
 *
 * To run a mutation, you first call `useChangeRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRoleMutation, { data, loading, error }] = useChangeRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useChangeRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeRoleMutation, ChangeRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeRoleMutation, ChangeRoleMutationVariables>(ChangeRoleDocument, options);
      }
export type ChangeRoleMutationHookResult = ReturnType<typeof useChangeRoleMutation>;
export type ChangeRoleMutationResult = Apollo.MutationResult<ChangeRoleMutation>;
export type ChangeRoleMutationOptions = Apollo.BaseMutationOptions<ChangeRoleMutation, ChangeRoleMutationVariables>;
export const CreateIssueDocument = gql`
    mutation createIssue($title: String!) {
  createIssue(title: $title) {
    issue {
      id
      newsletterId
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
        newsletterSubscribed
        profilePicture
        createdAt
        updatedAt
      }
      title
      subject
      newsletterCover
      content
      createdAt
      isEdited
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
export type CreateIssueMutationFn = Apollo.MutationFunction<CreateIssueMutation, CreateIssueMutationVariables>;

/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateIssueMutation(baseOptions?: Apollo.MutationHookOptions<CreateIssueMutation, CreateIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, options);
      }
export type CreateIssueMutationHookResult = ReturnType<typeof useCreateIssueMutation>;
export type CreateIssueMutationResult = Apollo.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = Apollo.BaseMutationOptions<CreateIssueMutation, CreateIssueMutationVariables>;
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
        newsletterSubscribed
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
      isEdited
      updatedAt
      publishedOn
    }
    status
    errors {
      field
      message
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DashNewsletterFeedDocument = gql`
    query dashNewsletterFeed {
  dashNewsletterFeed {
    id
    newsletterId
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
      newsletterSubscribed
      profilePicture
      createdAt
      updatedAt
    }
    title
    subject
    newsletterCover
    content
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useDashNewsletterFeedQuery__
 *
 * To run a query within a React component, call `useDashNewsletterFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashNewsletterFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashNewsletterFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashNewsletterFeedQuery(baseOptions?: Apollo.QueryHookOptions<DashNewsletterFeedQuery, DashNewsletterFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashNewsletterFeedQuery, DashNewsletterFeedQueryVariables>(DashNewsletterFeedDocument, options);
      }
export function useDashNewsletterFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashNewsletterFeedQuery, DashNewsletterFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashNewsletterFeedQuery, DashNewsletterFeedQueryVariables>(DashNewsletterFeedDocument, options);
        }
export type DashNewsletterFeedQueryHookResult = ReturnType<typeof useDashNewsletterFeedQuery>;
export type DashNewsletterFeedLazyQueryHookResult = ReturnType<typeof useDashNewsletterFeedLazyQuery>;
export type DashNewsletterFeedQueryResult = Apollo.QueryResult<DashNewsletterFeedQuery, DashNewsletterFeedQueryVariables>;
export const DashPostFeedDocument = gql`
    query dashPostFeed {
  dashPostFeed {
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
      newsletterSubscribed
      createdAt
      updatedAt
    }
    title
    description
    slogan
    postCover
    content
    createdAt
    isEdited
    updatedAt
    publishedOn
  }
}
    `;

/**
 * __useDashPostFeedQuery__
 *
 * To run a query within a React component, call `useDashPostFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashPostFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashPostFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashPostFeedQuery(baseOptions?: Apollo.QueryHookOptions<DashPostFeedQuery, DashPostFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashPostFeedQuery, DashPostFeedQueryVariables>(DashPostFeedDocument, options);
      }
export function useDashPostFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashPostFeedQuery, DashPostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashPostFeedQuery, DashPostFeedQueryVariables>(DashPostFeedDocument, options);
        }
export type DashPostFeedQueryHookResult = ReturnType<typeof useDashPostFeedQuery>;
export type DashPostFeedLazyQueryHookResult = ReturnType<typeof useDashPostFeedLazyQuery>;
export type DashPostFeedQueryResult = Apollo.QueryResult<DashPostFeedQuery, DashPostFeedQueryVariables>;
export const DashUsersDocument = gql`
    query dashUsers {
  dashUsers {
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
    newsletterSubscribed
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
      isEdited
      updatedAt
      publishedOn
    }
    issues {
      id
      newsletterId
      draft
      authorId
      title
      subject
      newsletterCover
      content
      createdAt
      isEdited
      updatedAt
    }
  }
}
    `;

/**
 * __useDashUsersQuery__
 *
 * To run a query within a React component, call `useDashUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashUsersQuery(baseOptions?: Apollo.QueryHookOptions<DashUsersQuery, DashUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashUsersQuery, DashUsersQueryVariables>(DashUsersDocument, options);
      }
export function useDashUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashUsersQuery, DashUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashUsersQuery, DashUsersQueryVariables>(DashUsersDocument, options);
        }
export type DashUsersQueryHookResult = ReturnType<typeof useDashUsersQuery>;
export type DashUsersLazyQueryHookResult = ReturnType<typeof useDashUsersLazyQuery>;
export type DashUsersQueryResult = Apollo.QueryResult<DashUsersQuery, DashUsersQueryVariables>;
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
export const DeleteIssueDocument = gql`
    mutation deleteIssue($id: Int!) {
  deleteIssue(id: $id)
}
    `;
export type DeleteIssueMutationFn = Apollo.MutationFunction<DeleteIssueMutation, DeleteIssueMutationVariables>;

/**
 * __useDeleteIssueMutation__
 *
 * To run a mutation, you first call `useDeleteIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIssueMutation, { data, loading, error }] = useDeleteIssueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIssueMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIssueMutation, DeleteIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIssueMutation, DeleteIssueMutationVariables>(DeleteIssueDocument, options);
      }
export type DeleteIssueMutationHookResult = ReturnType<typeof useDeleteIssueMutation>;
export type DeleteIssueMutationResult = Apollo.MutationResult<DeleteIssueMutation>;
export type DeleteIssueMutationOptions = Apollo.BaseMutationOptions<DeleteIssueMutation, DeleteIssueMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($postId: Int!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

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
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteUserFromDashboardDocument = gql`
    mutation deleteUserFromDashboard($id: Int!) {
  deleteUserFromDashboard(id: $id) {
    status
  }
}
    `;
export type DeleteUserFromDashboardMutationFn = Apollo.MutationFunction<DeleteUserFromDashboardMutation, DeleteUserFromDashboardMutationVariables>;

/**
 * __useDeleteUserFromDashboardMutation__
 *
 * To run a mutation, you first call `useDeleteUserFromDashboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserFromDashboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserFromDashboardMutation, { data, loading, error }] = useDeleteUserFromDashboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserFromDashboardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserFromDashboardMutation, DeleteUserFromDashboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserFromDashboardMutation, DeleteUserFromDashboardMutationVariables>(DeleteUserFromDashboardDocument, options);
      }
export type DeleteUserFromDashboardMutationHookResult = ReturnType<typeof useDeleteUserFromDashboardMutation>;
export type DeleteUserFromDashboardMutationResult = Apollo.MutationResult<DeleteUserFromDashboardMutation>;
export type DeleteUserFromDashboardMutationOptions = Apollo.BaseMutationOptions<DeleteUserFromDashboardMutation, DeleteUserFromDashboardMutationVariables>;
export const DraftNewsletterFeedDocument = gql`
    query draftNewsletterFeed {
  draftNewsletterFeed {
    id
    newsletterId
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
      newsletterSubscribed
      profilePicture
      createdAt
      updatedAt
    }
    title
    subject
    newsletterCover
    content
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useDraftNewsletterFeedQuery__
 *
 * To run a query within a React component, call `useDraftNewsletterFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftNewsletterFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftNewsletterFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useDraftNewsletterFeedQuery(baseOptions?: Apollo.QueryHookOptions<DraftNewsletterFeedQuery, DraftNewsletterFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftNewsletterFeedQuery, DraftNewsletterFeedQueryVariables>(DraftNewsletterFeedDocument, options);
      }
export function useDraftNewsletterFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftNewsletterFeedQuery, DraftNewsletterFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftNewsletterFeedQuery, DraftNewsletterFeedQueryVariables>(DraftNewsletterFeedDocument, options);
        }
export type DraftNewsletterFeedQueryHookResult = ReturnType<typeof useDraftNewsletterFeedQuery>;
export type DraftNewsletterFeedLazyQueryHookResult = ReturnType<typeof useDraftNewsletterFeedLazyQuery>;
export type DraftNewsletterFeedQueryResult = Apollo.QueryResult<DraftNewsletterFeedQuery, DraftNewsletterFeedQueryVariables>;
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
      newsletterSubscribed
      createdAt
      updatedAt
    }
    title
    description
    slogan
    postCover
    content
    createdAt
    isEdited
    updatedAt
    publishedOn
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
export function useDraftPostFeedQuery(baseOptions?: Apollo.QueryHookOptions<DraftPostFeedQuery, DraftPostFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftPostFeedQuery, DraftPostFeedQueryVariables>(DraftPostFeedDocument, options);
      }
export function useDraftPostFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftPostFeedQuery, DraftPostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftPostFeedQuery, DraftPostFeedQueryVariables>(DraftPostFeedDocument, options);
        }
export type DraftPostFeedQueryHookResult = ReturnType<typeof useDraftPostFeedQuery>;
export type DraftPostFeedLazyQueryHookResult = ReturnType<typeof useDraftPostFeedLazyQuery>;
export type DraftPostFeedQueryResult = Apollo.QueryResult<DraftPostFeedQuery, DraftPostFeedQueryVariables>;
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
      newsletterSubscribed
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
        isEdited
        updatedAt
        publishedOn
      }
      issues {
        id
        newsletterId
        draft
        authorId
        title
        subject
        newsletterCover
        content
        createdAt
        isEdited
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
export const EditPublishedIssueDocument = gql`
    mutation editPublishedIssue($newsletterId: String!, $title: String, $subject: String, $newsletterCover: String, $content: String) {
  editPublishedIssue(
    newsletterId: $newsletterId
    title: $title
    subject: $subject
    newsletterCover: $newsletterCover
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
export type EditPublishedIssueMutationFn = Apollo.MutationFunction<EditPublishedIssueMutation, EditPublishedIssueMutationVariables>;

/**
 * __useEditPublishedIssueMutation__
 *
 * To run a mutation, you first call `useEditPublishedIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPublishedIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPublishedIssueMutation, { data, loading, error }] = useEditPublishedIssueMutation({
 *   variables: {
 *      newsletterId: // value for 'newsletterId'
 *      title: // value for 'title'
 *      subject: // value for 'subject'
 *      newsletterCover: // value for 'newsletterCover'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditPublishedIssueMutation(baseOptions?: Apollo.MutationHookOptions<EditPublishedIssueMutation, EditPublishedIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPublishedIssueMutation, EditPublishedIssueMutationVariables>(EditPublishedIssueDocument, options);
      }
export type EditPublishedIssueMutationHookResult = ReturnType<typeof useEditPublishedIssueMutation>;
export type EditPublishedIssueMutationResult = Apollo.MutationResult<EditPublishedIssueMutation>;
export type EditPublishedIssueMutationOptions = Apollo.BaseMutationOptions<EditPublishedIssueMutation, EditPublishedIssueMutationVariables>;
export const EditPublishedPostDocument = gql`
    mutation editPublishedPost($postId: Int!, $slug: String!, $title: String, $description: String, $slogan: String, $postCover: String, $content: String) {
  editPublishedPost(
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
export type EditPublishedPostMutationFn = Apollo.MutationFunction<EditPublishedPostMutation, EditPublishedPostMutationVariables>;

/**
 * __useEditPublishedPostMutation__
 *
 * To run a mutation, you first call `useEditPublishedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPublishedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPublishedPostMutation, { data, loading, error }] = useEditPublishedPostMutation({
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
export function useEditPublishedPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPublishedPostMutation, EditPublishedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPublishedPostMutation, EditPublishedPostMutationVariables>(EditPublishedPostDocument, options);
      }
export type EditPublishedPostMutationHookResult = ReturnType<typeof useEditPublishedPostMutation>;
export type EditPublishedPostMutationResult = Apollo.MutationResult<EditPublishedPostMutation>;
export type EditPublishedPostMutationOptions = Apollo.BaseMutationOptions<EditPublishedPostMutation, EditPublishedPostMutationVariables>;
export const EditUnpublishedIssueDocument = gql`
    mutation editUnpublishedIssue($newsletterId: String!, $title: String, $subject: String, $newsletterCover: String, $content: String) {
  editUnpublishedIssue(
    newsletterId: $newsletterId
    title: $title
    subject: $subject
    newsletterCover: $newsletterCover
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
export type EditUnpublishedIssueMutationFn = Apollo.MutationFunction<EditUnpublishedIssueMutation, EditUnpublishedIssueMutationVariables>;

/**
 * __useEditUnpublishedIssueMutation__
 *
 * To run a mutation, you first call `useEditUnpublishedIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUnpublishedIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUnpublishedIssueMutation, { data, loading, error }] = useEditUnpublishedIssueMutation({
 *   variables: {
 *      newsletterId: // value for 'newsletterId'
 *      title: // value for 'title'
 *      subject: // value for 'subject'
 *      newsletterCover: // value for 'newsletterCover'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditUnpublishedIssueMutation(baseOptions?: Apollo.MutationHookOptions<EditUnpublishedIssueMutation, EditUnpublishedIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUnpublishedIssueMutation, EditUnpublishedIssueMutationVariables>(EditUnpublishedIssueDocument, options);
      }
export type EditUnpublishedIssueMutationHookResult = ReturnType<typeof useEditUnpublishedIssueMutation>;
export type EditUnpublishedIssueMutationResult = Apollo.MutationResult<EditUnpublishedIssueMutation>;
export type EditUnpublishedIssueMutationOptions = Apollo.BaseMutationOptions<EditUnpublishedIssueMutation, EditUnpublishedIssueMutationVariables>;
export const EditUnpublishedPostDocument = gql`
    mutation editUnpublishedPost($postId: Int!, $slug: String!, $title: String, $description: String, $slogan: String, $postCover: String, $content: String) {
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
export type EditUnpublishedPostMutationFn = Apollo.MutationFunction<EditUnpublishedPostMutation, EditUnpublishedPostMutationVariables>;

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
export function useEditUnpublishedPostMutation(baseOptions?: Apollo.MutationHookOptions<EditUnpublishedPostMutation, EditUnpublishedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUnpublishedPostMutation, EditUnpublishedPostMutationVariables>(EditUnpublishedPostDocument, options);
      }
export type EditUnpublishedPostMutationHookResult = ReturnType<typeof useEditUnpublishedPostMutation>;
export type EditUnpublishedPostMutationResult = Apollo.MutationResult<EditUnpublishedPostMutation>;
export type EditUnpublishedPostMutationOptions = Apollo.BaseMutationOptions<EditUnpublishedPostMutation, EditUnpublishedPostMutationVariables>;
export const FindNewsletterByIdDocument = gql`
    query findNewsletterById($newsletterId: String) {
  findNewsletterById(newsletterId: $newsletterId) {
    id
    newsletterId
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
      newsletterSubscribed
      profilePicture
      createdAt
      updatedAt
    }
    title
    subject
    newsletterCover
    content
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useFindNewsletterByIdQuery__
 *
 * To run a query within a React component, call `useFindNewsletterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNewsletterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNewsletterByIdQuery({
 *   variables: {
 *      newsletterId: // value for 'newsletterId'
 *   },
 * });
 */
export function useFindNewsletterByIdQuery(baseOptions?: Apollo.QueryHookOptions<FindNewsletterByIdQuery, FindNewsletterByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNewsletterByIdQuery, FindNewsletterByIdQueryVariables>(FindNewsletterByIdDocument, options);
      }
export function useFindNewsletterByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNewsletterByIdQuery, FindNewsletterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNewsletterByIdQuery, FindNewsletterByIdQueryVariables>(FindNewsletterByIdDocument, options);
        }
export type FindNewsletterByIdQueryHookResult = ReturnType<typeof useFindNewsletterByIdQuery>;
export type FindNewsletterByIdLazyQueryHookResult = ReturnType<typeof useFindNewsletterByIdLazyQuery>;
export type FindNewsletterByIdQueryResult = Apollo.QueryResult<FindNewsletterByIdQuery, FindNewsletterByIdQueryVariables>;
export const FindNewsletterIssueDocument = gql`
    query findNewsletterIssue($id: Int) {
  findNewsletterIssue(id: $id) {
    id
    newsletterId
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
      newsletterSubscribed
      profilePicture
      createdAt
      updatedAt
    }
    title
    subject
    newsletterCover
    content
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useFindNewsletterIssueQuery__
 *
 * To run a query within a React component, call `useFindNewsletterIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNewsletterIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNewsletterIssueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindNewsletterIssueQuery(baseOptions?: Apollo.QueryHookOptions<FindNewsletterIssueQuery, FindNewsletterIssueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNewsletterIssueQuery, FindNewsletterIssueQueryVariables>(FindNewsletterIssueDocument, options);
      }
export function useFindNewsletterIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNewsletterIssueQuery, FindNewsletterIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNewsletterIssueQuery, FindNewsletterIssueQueryVariables>(FindNewsletterIssueDocument, options);
        }
export type FindNewsletterIssueQueryHookResult = ReturnType<typeof useFindNewsletterIssueQuery>;
export type FindNewsletterIssueLazyQueryHookResult = ReturnType<typeof useFindNewsletterIssueLazyQuery>;
export type FindNewsletterIssueQueryResult = Apollo.QueryResult<FindNewsletterIssueQuery, FindNewsletterIssueQueryVariables>;
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
      newsletterSubscribed
      createdAt
      updatedAt
    }
    title
    description
    slogan
    postCover
    content
    createdAt
    isEdited
    updatedAt
    publishedOn
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
export function useFindPostQuery(baseOptions?: Apollo.QueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
      }
export function useFindPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostQuery, FindPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostQuery, FindPostQueryVariables>(FindPostDocument, options);
        }
export type FindPostQueryHookResult = ReturnType<typeof useFindPostQuery>;
export type FindPostLazyQueryHookResult = ReturnType<typeof useFindPostLazyQuery>;
export type FindPostQueryResult = Apollo.QueryResult<FindPostQuery, FindPostQueryVariables>;
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
      newsletterSubscribed
      createdAt
      updatedAt
    }
    title
    description
    slogan
    postCover
    content
    createdAt
    isEdited
    updatedAt
    publishedOn
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
export const FindUserDocument = gql`
    query findUser($id: Int!) {
  findUser(id: $id) {
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
    newsletterSubscribed
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
      isEdited
      updatedAt
      publishedOn
    }
    issues {
      id
      newsletterId
      draft
      authorId
      title
      subject
      newsletterCover
      content
      createdAt
      isEdited
      updatedAt
    }
  }
}
    `;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
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
      newsletterSubscribed
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
        isEdited
        updatedAt
        publishedOn
      }
      issues {
        id
        newsletterId
        draft
        authorId
        title
        subject
        newsletterCover
        content
        createdAt
        isEdited
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
    newsletterSubscribed
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
      isEdited
      updatedAt
      publishedOn
    }
    issues {
      id
      newsletterId
      draft
      authorId
      title
      subject
      newsletterCover
      content
      createdAt
      isEdited
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
export const NewsletterPersonalFeedDocument = gql`
    query newsletterPersonalFeed {
  newsletterPersonalFeed {
    id
    newsletterId
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
      newsletterSubscribed
      profilePicture
      createdAt
      updatedAt
    }
    title
    subject
    newsletterCover
    content
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useNewsletterPersonalFeedQuery__
 *
 * To run a query within a React component, call `useNewsletterPersonalFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsletterPersonalFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsletterPersonalFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsletterPersonalFeedQuery(baseOptions?: Apollo.QueryHookOptions<NewsletterPersonalFeedQuery, NewsletterPersonalFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsletterPersonalFeedQuery, NewsletterPersonalFeedQueryVariables>(NewsletterPersonalFeedDocument, options);
      }
export function useNewsletterPersonalFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsletterPersonalFeedQuery, NewsletterPersonalFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsletterPersonalFeedQuery, NewsletterPersonalFeedQueryVariables>(NewsletterPersonalFeedDocument, options);
        }
export type NewsletterPersonalFeedQueryHookResult = ReturnType<typeof useNewsletterPersonalFeedQuery>;
export type NewsletterPersonalFeedLazyQueryHookResult = ReturnType<typeof useNewsletterPersonalFeedLazyQuery>;
export type NewsletterPersonalFeedQueryResult = Apollo.QueryResult<NewsletterPersonalFeedQuery, NewsletterPersonalFeedQueryVariables>;
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
export const PasswordSetupDocument = gql`
    mutation passwordSetup($token: String!, $confirmPassword: String!, $password: String!) {
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
export type PasswordSetupMutationFn = Apollo.MutationFunction<PasswordSetupMutation, PasswordSetupMutationVariables>;

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
export function usePasswordSetupMutation(baseOptions?: Apollo.MutationHookOptions<PasswordSetupMutation, PasswordSetupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasswordSetupMutation, PasswordSetupMutationVariables>(PasswordSetupDocument, options);
      }
export type PasswordSetupMutationHookResult = ReturnType<typeof usePasswordSetupMutation>;
export type PasswordSetupMutationResult = Apollo.MutationResult<PasswordSetupMutation>;
export type PasswordSetupMutationOptions = Apollo.BaseMutationOptions<PasswordSetupMutation, PasswordSetupMutationVariables>;
export const PostFeedDocument = gql`
    query postFeed {
  postFeed {
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
      newsletterSubscribed
      createdAt
      updatedAt
    }
    title
    description
    slogan
    postCover
    content
    createdAt
    isEdited
    updatedAt
    publishedOn
  }
}
    `;

/**
 * __usePostFeedQuery__
 *
 * To run a query within a React component, call `usePostFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostFeedQuery(baseOptions?: Apollo.QueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
      }
export function usePostFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostFeedQuery, PostFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostFeedQuery, PostFeedQueryVariables>(PostFeedDocument, options);
        }
export type PostFeedQueryHookResult = ReturnType<typeof usePostFeedQuery>;
export type PostFeedLazyQueryHookResult = ReturnType<typeof usePostFeedLazyQuery>;
export type PostFeedQueryResult = Apollo.QueryResult<PostFeedQuery, PostFeedQueryVariables>;
export const PublishIssueDocument = gql`
    mutation publishIssue($newsletterId: String!) {
  publishIssue(newsletterId: $newsletterId) {
    errors {
      field
      message
    }
    status
  }
}
    `;
export type PublishIssueMutationFn = Apollo.MutationFunction<PublishIssueMutation, PublishIssueMutationVariables>;

/**
 * __usePublishIssueMutation__
 *
 * To run a mutation, you first call `usePublishIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishIssueMutation, { data, loading, error }] = usePublishIssueMutation({
 *   variables: {
 *      newsletterId: // value for 'newsletterId'
 *   },
 * });
 */
export function usePublishIssueMutation(baseOptions?: Apollo.MutationHookOptions<PublishIssueMutation, PublishIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishIssueMutation, PublishIssueMutationVariables>(PublishIssueDocument, options);
      }
export type PublishIssueMutationHookResult = ReturnType<typeof usePublishIssueMutation>;
export type PublishIssueMutationResult = Apollo.MutationResult<PublishIssueMutation>;
export type PublishIssueMutationOptions = Apollo.BaseMutationOptions<PublishIssueMutation, PublishIssueMutationVariables>;
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
export type PublishPostMutationFn = Apollo.MutationFunction<PublishPostMutation, PublishPostMutationVariables>;

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
export function usePublishPostMutation(baseOptions?: Apollo.MutationHookOptions<PublishPostMutation, PublishPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishPostMutation, PublishPostMutationVariables>(PublishPostDocument, options);
      }
export type PublishPostMutationHookResult = ReturnType<typeof usePublishPostMutation>;
export type PublishPostMutationResult = Apollo.MutationResult<PublishPostMutation>;
export type PublishPostMutationOptions = Apollo.BaseMutationOptions<PublishPostMutation, PublishPostMutationVariables>;
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
export const SubscribedUsersDocument = gql`
    query subscribedUsers {
  subscribedUsers {
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
    newsletterSubscribed
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
      isEdited
      updatedAt
      publishedOn
    }
    issues {
      id
      newsletterId
      draft
      authorId
      title
      subject
      newsletterCover
      content
      createdAt
      isEdited
      updatedAt
    }
  }
}
    `;

/**
 * __useSubscribedUsersQuery__
 *
 * To run a query within a React component, call `useSubscribedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscribedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscribedUsersQuery(baseOptions?: Apollo.QueryHookOptions<SubscribedUsersQuery, SubscribedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubscribedUsersQuery, SubscribedUsersQueryVariables>(SubscribedUsersDocument, options);
      }
export function useSubscribedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscribedUsersQuery, SubscribedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubscribedUsersQuery, SubscribedUsersQueryVariables>(SubscribedUsersDocument, options);
        }
export type SubscribedUsersQueryHookResult = ReturnType<typeof useSubscribedUsersQuery>;
export type SubscribedUsersLazyQueryHookResult = ReturnType<typeof useSubscribedUsersLazyQuery>;
export type SubscribedUsersQueryResult = Apollo.QueryResult<SubscribedUsersQuery, SubscribedUsersQueryVariables>;
export const SummaryDocument = gql`
    query summary {
  summary {
    views
    viewsByDay {
      views
      date
    }
    viewsVariation
    uniqueVisitors
    uniqueVisitorsVariation
  }
}
    `;

/**
 * __useSummaryQuery__
 *
 * To run a query within a React component, call `useSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useSummaryQuery(baseOptions?: Apollo.QueryHookOptions<SummaryQuery, SummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SummaryQuery, SummaryQueryVariables>(SummaryDocument, options);
      }
export function useSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SummaryQuery, SummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SummaryQuery, SummaryQueryVariables>(SummaryDocument, options);
        }
export type SummaryQueryHookResult = ReturnType<typeof useSummaryQuery>;
export type SummaryLazyQueryHookResult = ReturnType<typeof useSummaryLazyQuery>;
export type SummaryQueryResult = Apollo.QueryResult<SummaryQuery, SummaryQueryVariables>;
export const UnpublishIssueDocument = gql`
    mutation unpublishIssue($id: Int!) {
  unpublishIssue(id: $id)
}
    `;
export type UnpublishIssueMutationFn = Apollo.MutationFunction<UnpublishIssueMutation, UnpublishIssueMutationVariables>;

/**
 * __useUnpublishIssueMutation__
 *
 * To run a mutation, you first call `useUnpublishIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishIssueMutation, { data, loading, error }] = useUnpublishIssueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnpublishIssueMutation(baseOptions?: Apollo.MutationHookOptions<UnpublishIssueMutation, UnpublishIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpublishIssueMutation, UnpublishIssueMutationVariables>(UnpublishIssueDocument, options);
      }
export type UnpublishIssueMutationHookResult = ReturnType<typeof useUnpublishIssueMutation>;
export type UnpublishIssueMutationResult = Apollo.MutationResult<UnpublishIssueMutation>;
export type UnpublishIssueMutationOptions = Apollo.BaseMutationOptions<UnpublishIssueMutation, UnpublishIssueMutationVariables>;
export const UnpublishPostDocument = gql`
    mutation unpublishPost($postId: Int!) {
  unpublishPost(postId: $postId)
}
    `;
export type UnpublishPostMutationFn = Apollo.MutationFunction<UnpublishPostMutation, UnpublishPostMutationVariables>;

/**
 * __useUnpublishPostMutation__
 *
 * To run a mutation, you first call `useUnpublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishPostMutation, { data, loading, error }] = useUnpublishPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnpublishPostMutation(baseOptions?: Apollo.MutationHookOptions<UnpublishPostMutation, UnpublishPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpublishPostMutation, UnpublishPostMutationVariables>(UnpublishPostDocument, options);
      }
export type UnpublishPostMutationHookResult = ReturnType<typeof useUnpublishPostMutation>;
export type UnpublishPostMutationResult = Apollo.MutationResult<UnpublishPostMutation>;
export type UnpublishPostMutationOptions = Apollo.BaseMutationOptions<UnpublishPostMutation, UnpublishPostMutationVariables>;
export const UnsubscribeFromNewsletterDocument = gql`
    mutation unsubscribeFromNewsletter {
  unsubscribeFromNewsletter {
    status
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
      newsletterSubscribed
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
        isEdited
        updatedAt
        publishedOn
      }
      issues {
        id
        newsletterId
        draft
        authorId
        title
        subject
        newsletterCover
        content
        createdAt
        isEdited
        updatedAt
      }
    }
  }
}
    `;
export type UnsubscribeFromNewsletterMutationFn = Apollo.MutationFunction<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>;

/**
 * __useUnsubscribeFromNewsletterMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromNewsletterMutation, { data, loading, error }] = useUnsubscribeFromNewsletterMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnsubscribeFromNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>(UnsubscribeFromNewsletterDocument, options);
      }
export type UnsubscribeFromNewsletterMutationHookResult = ReturnType<typeof useUnsubscribeFromNewsletterMutation>;
export type UnsubscribeFromNewsletterMutationResult = Apollo.MutationResult<UnsubscribeFromNewsletterMutation>;
export type UnsubscribeFromNewsletterMutationOptions = Apollo.BaseMutationOptions<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>;
export const UserFrequenciesDocument = gql`
    query userFrequencies {
  userFrequencies {
    authenticatedUsers
    unAuthenticatedUsers
  }
}
    `;

/**
 * __useUserFrequenciesQuery__
 *
 * To run a query within a React component, call `useUserFrequenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFrequenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFrequenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserFrequenciesQuery(baseOptions?: Apollo.QueryHookOptions<UserFrequenciesQuery, UserFrequenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFrequenciesQuery, UserFrequenciesQueryVariables>(UserFrequenciesDocument, options);
      }
export function useUserFrequenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFrequenciesQuery, UserFrequenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFrequenciesQuery, UserFrequenciesQueryVariables>(UserFrequenciesDocument, options);
        }
export type UserFrequenciesQueryHookResult = ReturnType<typeof useUserFrequenciesQuery>;
export type UserFrequenciesLazyQueryHookResult = ReturnType<typeof useUserFrequenciesLazyQuery>;
export type UserFrequenciesQueryResult = Apollo.QueryResult<UserFrequenciesQuery, UserFrequenciesQueryVariables>;
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