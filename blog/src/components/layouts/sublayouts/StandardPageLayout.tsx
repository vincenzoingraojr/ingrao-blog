import { FunctionComponent } from "react";
import styled from "styled-components";
import { devices } from "../../../styles/devices";
import { PageText } from "../../../styles/global";

interface StandardPageLayoutProps {
    title: string;
    description: string;
    content: JSX.Element;
}

const StandardPageLayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-left: 0px;
    padding-right: 0px;

    @media (min-width: 580px) {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media ${devices.tablet} {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

const StandardPageLayoutTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

const PageDescription = styled(PageText)`
    font-family: "Source Serif Pro", serif;
    padding-bottom: 24px;
    border-bottom: 2px solid #000000;
`;

const StandardPageLayoutContent = styled.div`
    display: block;
`;

const StandardPageLayout: FunctionComponent<StandardPageLayoutProps> = ({
    title,
    description,
    content,
}) => {
    return (
        <StandardPageLayoutWrapper>
            <StandardPageLayoutTitle>
                {title}
            </StandardPageLayoutTitle>
            <PageDescription>
                {description}
            </PageDescription>
            <StandardPageLayoutContent>
                {content}
            </StandardPageLayoutContent>
        </StandardPageLayoutWrapper>
    );
};

export default StandardPageLayout;
