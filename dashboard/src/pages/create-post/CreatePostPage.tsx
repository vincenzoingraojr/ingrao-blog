import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import {
    LinkButton,
    LinkButtonText,
    OptionContainer,
    OptionsContainer,
    OptionTitle,
    PageBlock,
    PageText,
} from "../../styles/global";
import styled from "styled-components";
import Add from "../../components/icons/Add";
import { Outlet, useLocation } from "react-router-dom";

const CreateNewPostButton = styled(LinkButton)`
    color: #ffffff;
    background-color: blue;
`;

function CreatePostPage() {
    const location = useLocation();

    return (
        <>
            <Head
                title="Create a new post | dashboard.ingrao.blog"
                description="In this page you can create a new post and update the existing ones."
            />
            <PageLayout
                content={
                    <PageContentLayout
                        content={
                            <OptionsContainer>
                                <OptionContainer>
                                    <OptionTitle>Create a new post</OptionTitle>
                                    <PageText>
                                        Click on the following button to create
                                        a new post.
                                    </PageText>
                                    <PageBlock>
                                        <CreateNewPostButton
                                            to="/create-post/new"
                                            state={{
                                                backgroundLocation: location,
                                            }}
                                        >
                                            <Add color={"#ffffff"} />
                                            <LinkButtonText>
                                                Create post
                                            </LinkButtonText>
                                        </CreateNewPostButton>
                                        <Outlet />
                                    </PageBlock>
                                </OptionContainer>
                            </OptionsContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default CreatePostPage;
