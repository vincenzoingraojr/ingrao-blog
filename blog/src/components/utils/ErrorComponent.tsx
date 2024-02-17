import styled from "styled-components";
import { Button, PageBlock, PageText } from "../../styles/global";
import { useNavigate } from "react-router-dom";

const GeneralErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

const RefreshButton = styled(Button)`
    background-color: blue;
    color: #ffffff;
`;

function ErrorComponent() {
    const navigate = useNavigate();

    return (
        <GeneralErrorContainer>
            <PageText>
                An error has occurred. Refresh or close and reopen the page.
            </PageText>
            <PageBlock>
                <RefreshButton
                    type="button"
                    title="Refresh page"
                    role="button"
                    aria-label="Refresh page"
                    onClick={() => {
                        navigate(0);
                    }}
                >
                    Refresh page
                </RefreshButton>
            </PageBlock>
        </GeneralErrorContainer>
    );
}

export default ErrorComponent;