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

export type AuthSendVerificationEmailMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type AuthSendVerificationEmailMutation = { __typename?: 'Mutation', authSendVerificationEmail: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type BlogFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogFeedQuery = { __typename?: 'Query', blogFeed: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, newsletterSubscribed: boolean } }> };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type CommentRepliesQueryVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type CommentRepliesQuery = { __typename?: 'Query', commentReplies: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['Int'];
  isReplyTo: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined, comment?: { __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } } | null | undefined } };

export type DeleteAccountMutationVariables = Exact<{
  origin: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'ExtendedUserResponse', status?: string | null | undefined, ok?: boolean | null | undefined } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
  hasReplies: Scalars['Boolean'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

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


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type FindNewsletterByIdQueryVariables = Exact<{
  newsletterId?: InputMaybe<Scalars['String']>;
}>;


export type FindNewsletterByIdQuery = { __typename?: 'Query', findNewsletterById?: { __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } } | null | undefined };

export type FindPostBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type FindPostBySlugQuery = { __typename?: 'Query', findPostBySlug?: { __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  origin: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', accessToken?: string | null | undefined, status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{
  origin: Scalars['String'];
}>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, newsletterSubscribed: boolean, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined };

export type NewsletterBlogFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsletterBlogFeedQuery = { __typename?: 'Query', newsletterBlogFeed: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, newsletterSubscribed: boolean, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string } }> };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type PersonalCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonalCommentsQuery = { __typename?: 'Query', personalComments: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

export type PostCommentsQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']>;
}>;


export type PostCommentsQuery = { __typename?: 'Query', postComments: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } }> };

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
  newsletterSubscribed: Scalars['Boolean'];
  birthDate: Scalars['DateTime'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, createdAt: string, updatedAt: string, newsletterSubscribed: boolean, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type SubscribeToNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToNewsletterMutation = { __typename?: 'Mutation', subscribeToNewsletter: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined } };

export type UnsubscribeFromNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnsubscribeFromNewsletterMutation = { __typename?: 'Mutation', unsubscribeFromNewsletter: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string, posts?: Array<{ __typename?: 'Post', id: number, slug: string, draft: boolean, authorId: number, title?: string | null | undefined, description?: string | null | undefined, slogan?: string | null | undefined, postCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, publishedOn?: string | null | undefined }> | null | undefined, issues?: Array<{ __typename?: 'Newsletter', id: number, newsletterId: string, draft: boolean, authorId: number, title?: string | null | undefined, subject?: string | null | undefined, newsletterCover?: string | null | undefined, content?: string | null | undefined, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined, comments?: Array<{ __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string }> | null | undefined } | null | undefined } };

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: number, commentId: string, postId: number, authorId: number, isReplyTo?: string | null | undefined, content?: string | null | undefined, isDeleted: boolean, createdAt: string, isEdited?: boolean | null | undefined, updatedAt: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, birthDate: string, gender: string, title: string, verified: boolean, role: string, profilePicture?: string | null | undefined, newsletterSubscribed: boolean, createdAt: string, updatedAt: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type ViewPageMutationVariables = Exact<{
  pathname: Scalars['String'];
}>;


export type ViewPageMutation = { __typename?: 'Mutation', viewPage: boolean };


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
      newsletterSubscribed
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
export const CommentRepliesDocument = gql`
    query commentReplies($commentId: String!) {
  commentReplies(commentId: $commentId) {
    id
    commentId
    postId
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
    isReplyTo
    content
    isDeleted
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __useCommentRepliesQuery__
 *
 * To run a query within a React component, call `useCommentRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentRepliesQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCommentRepliesQuery(baseOptions: Apollo.QueryHookOptions<CommentRepliesQuery, CommentRepliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentRepliesQuery, CommentRepliesQueryVariables>(CommentRepliesDocument, options);
      }
export function useCommentRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentRepliesQuery, CommentRepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentRepliesQuery, CommentRepliesQueryVariables>(CommentRepliesDocument, options);
        }
export type CommentRepliesQueryHookResult = ReturnType<typeof useCommentRepliesQuery>;
export type CommentRepliesLazyQueryHookResult = ReturnType<typeof useCommentRepliesLazyQuery>;
export type CommentRepliesQueryResult = Apollo.QueryResult<CommentRepliesQuery, CommentRepliesQueryVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($content: String!, $postId: Int!, $isReplyTo: String!) {
  createComment(content: $content, postId: $postId, isReplyTo: $isReplyTo) {
    errors {
      field
      message
    }
    comment {
      id
      commentId
      postId
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
      isReplyTo
      content
      isDeleted
      createdAt
      isEdited
      updatedAt
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *      isReplyTo: // value for 'isReplyTo'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
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
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentId: String!, $hasReplies: Boolean!) {
  deleteComment(commentId: $commentId, hasReplies: $hasReplies)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      hasReplies: // value for 'hasReplies'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
      comments {
        id
        commentId
        postId
        authorId
        isReplyTo
        content
        isDeleted
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
      comments {
        id
        commentId
        postId
        authorId
        isReplyTo
        content
        isDeleted
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
    comments {
      id
      commentId
      postId
      authorId
      isReplyTo
      content
      isDeleted
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
export const NewsletterBlogFeedDocument = gql`
    query newsletterBlogFeed {
  newsletterBlogFeed {
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
 * __useNewsletterBlogFeedQuery__
 *
 * To run a query within a React component, call `useNewsletterBlogFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsletterBlogFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsletterBlogFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsletterBlogFeedQuery(baseOptions?: Apollo.QueryHookOptions<NewsletterBlogFeedQuery, NewsletterBlogFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsletterBlogFeedQuery, NewsletterBlogFeedQueryVariables>(NewsletterBlogFeedDocument, options);
      }
export function useNewsletterBlogFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsletterBlogFeedQuery, NewsletterBlogFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsletterBlogFeedQuery, NewsletterBlogFeedQueryVariables>(NewsletterBlogFeedDocument, options);
        }
export type NewsletterBlogFeedQueryHookResult = ReturnType<typeof useNewsletterBlogFeedQuery>;
export type NewsletterBlogFeedLazyQueryHookResult = ReturnType<typeof useNewsletterBlogFeedLazyQuery>;
export type NewsletterBlogFeedQueryResult = Apollo.QueryResult<NewsletterBlogFeedQuery, NewsletterBlogFeedQueryVariables>;
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
export const PersonalCommentsDocument = gql`
    query personalComments {
  personalComments {
    id
    commentId
    postId
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
    isReplyTo
    content
    isDeleted
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __usePersonalCommentsQuery__
 *
 * To run a query within a React component, call `usePersonalCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonalCommentsQuery(baseOptions?: Apollo.QueryHookOptions<PersonalCommentsQuery, PersonalCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonalCommentsQuery, PersonalCommentsQueryVariables>(PersonalCommentsDocument, options);
      }
export function usePersonalCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalCommentsQuery, PersonalCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonalCommentsQuery, PersonalCommentsQueryVariables>(PersonalCommentsDocument, options);
        }
export type PersonalCommentsQueryHookResult = ReturnType<typeof usePersonalCommentsQuery>;
export type PersonalCommentsLazyQueryHookResult = ReturnType<typeof usePersonalCommentsLazyQuery>;
export type PersonalCommentsQueryResult = Apollo.QueryResult<PersonalCommentsQuery, PersonalCommentsQueryVariables>;
export const PostCommentsDocument = gql`
    query postComments($postId: Int) {
  postComments(postId: $postId) {
    id
    commentId
    postId
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
    isReplyTo
    content
    isDeleted
    createdAt
    isEdited
    updatedAt
  }
}
    `;

/**
 * __usePostCommentsQuery__
 *
 * To run a query within a React component, call `usePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions?: Apollo.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
      }
export function usePostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export type PostCommentsQueryHookResult = ReturnType<typeof usePostCommentsQuery>;
export type PostCommentsLazyQueryHookResult = ReturnType<typeof usePostCommentsLazyQuery>;
export type PostCommentsQueryResult = Apollo.QueryResult<PostCommentsQuery, PostCommentsQueryVariables>;
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
    mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!, $title: String!, $gender: String!, $newsletterSubscribed: Boolean!, $birthDate: DateTime!) {
  signup(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
    title: $title
    gender: $gender
    newsletterSubscribed: $newsletterSubscribed
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
      comments {
        id
        commentId
        postId
        authorId
        isReplyTo
        content
        isDeleted
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
 *      newsletterSubscribed: // value for 'newsletterSubscribed'
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
export const SubscribeToNewsletterDocument = gql`
    mutation subscribeToNewsletter {
  subscribeToNewsletter {
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
      comments {
        id
        commentId
        postId
        authorId
        isReplyTo
        content
        isDeleted
        createdAt
        isEdited
        updatedAt
      }
    }
  }
}
    `;
export type SubscribeToNewsletterMutationFn = Apollo.MutationFunction<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>;

/**
 * __useSubscribeToNewsletterMutation__
 *
 * To run a mutation, you first call `useSubscribeToNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNewsletterMutation, { data, loading, error }] = useSubscribeToNewsletterMutation({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(SubscribeToNewsletterDocument, options);
      }
export type SubscribeToNewsletterMutationHookResult = ReturnType<typeof useSubscribeToNewsletterMutation>;
export type SubscribeToNewsletterMutationResult = Apollo.MutationResult<SubscribeToNewsletterMutation>;
export type SubscribeToNewsletterMutationOptions = Apollo.BaseMutationOptions<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>;
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
      comments {
        id
        commentId
        postId
        authorId
        isReplyTo
        content
        isDeleted
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
export const UpdateCommentDocument = gql`
    mutation updateComment($commentId: String!, $content: String!) {
  updateComment(commentId: $commentId, content: $content) {
    comment {
      id
      commentId
      postId
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
      isReplyTo
      content
      isDeleted
      createdAt
      isEdited
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
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
export const ViewPageDocument = gql`
    mutation viewPage($pathname: String!) {
  viewPage(pathname: $pathname)
}
    `;
export type ViewPageMutationFn = Apollo.MutationFunction<ViewPageMutation, ViewPageMutationVariables>;

/**
 * __useViewPageMutation__
 *
 * To run a mutation, you first call `useViewPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewPageMutation, { data, loading, error }] = useViewPageMutation({
 *   variables: {
 *      pathname: // value for 'pathname'
 *   },
 * });
 */
export function useViewPageMutation(baseOptions?: Apollo.MutationHookOptions<ViewPageMutation, ViewPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewPageMutation, ViewPageMutationVariables>(ViewPageDocument, options);
      }
export type ViewPageMutationHookResult = ReturnType<typeof useViewPageMutation>;
export type ViewPageMutationResult = Apollo.MutationResult<ViewPageMutation>;
export type ViewPageMutationOptions = Apollo.BaseMutationOptions<ViewPageMutation, ViewPageMutationVariables>;