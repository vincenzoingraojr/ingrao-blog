import { FunctionComponent } from "react";
import styled from "styled-components";

interface PageContentLayoutProps {
    content: JSX.Element;
}

const PageContentContainer = styled.div`
    display: block;
    padding-top: 48px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 72px;
`;

const PageContentLayout: FunctionComponent<PageContentLayoutProps> = ({
    content,
}) => {
    return <PageContentContainer>{content}</PageContentContainer>;
};

export default PageContentLayout;
