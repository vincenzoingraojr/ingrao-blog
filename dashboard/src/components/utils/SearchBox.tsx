import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { useMeQuery } from "../../generated/graphql";
import { LoadingContainer, PageText } from "../../styles/global";
import Close from "../icons/Close";
import Magnifier from "../icons/Magnifier";
import SmallIssueComponent from "../layouts/items/SmallIssueComponent";
import SmallPostComponent from "../layouts/items/SmallPostComponent";
import UserComponent from "../layouts/items/UserComponent";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

interface SearchBoxComponentProps {
    data: any;
    type: string;
    nocontrol?: boolean;
}

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SearchBoxHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    border: 2px solid #000000;
    width: 100%;
`;

const MagnifierContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    input[type="text"] {
        color: #000000;
    }

    input[type="text"]::placeholder {
        color: #000000;
        opacity: 1;
    }
`;

const CloseButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: transparent;
    cursor: pointer;

    &:hover, &:focus {
        background-color: blue;
    }
`;

const SearchBoxContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SearchBoxComponent: FunctionComponent<SearchBoxComponentProps> = ({ data, type, nocontrol }) => {
    const [value, setValue] = useState("");

    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    });

    const { data: meData, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "dash" },
    });

    function handleInputChange(e: any) {
        const query = e.target.value;
        const dataItems = data || [];

        const filteredData = dataItems.filter((dataItem: any) => {
            if (type === "user") {
                return (
                    dataItem.firstName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.lastName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.role
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.email
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );
            } else if (type === "post") {
                return (
                    dataItem.title
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.description
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.slogan
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.slug
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );                
            } else {
                return (
                    dataItem.title
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    dataItem.subject
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );  
            }
        });

        setState({
            filteredData,
            query,
        });
    }

    const { filteredData, query } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const dataItems = hasSearchResults ? filteredData : data;
    const noResults = query !== emptyQuery && dataItems.length === 0;

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <LoadingComponent />
                </LoadingContainer>
            ) : (
                <>
                    {meData && meData.me && !error ? (
                        <SearchBox>
                            <SearchBoxHeader>
                                <MagnifierContainer>
                                    <Magnifier type="small" isActive={false} />
                                </MagnifierContainer>
                                <SearchInputContainer>
                                    <input
                                        type="text"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoFocus
                                        aria-required
                                        placeholder={"Search"}
                                        aria-label={"Search"}
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value);
                                            handleInputChange(e);
                                        }}
                                    />
                                </SearchInputContainer>
                                {value ? (
                                    <CloseButtonContainer
                                        role="button"
                                        tabIndex={0}
                                        title="Clear search input"
                                        aria-label="Clear search input"
                                        onMouseDown={() => {
                                            setValue("");
                                            setState({
                                                filteredData: [],
                                                query: emptyQuery,
                                            });
                                        }}
                                    >
                                        <Close type="small" />
                                    </CloseButtonContainer>
                                ) : null}
                            </SearchBoxHeader>
                            <SearchBoxContent>
                                {noResults ? (
                                    <PageText>No results for "{query}".</PageText>
                                ) : (
                                    <>
                                        {type === "user" ? (
                                            <>
                                                {dataItems.map((user: any) => {
                                                    return (
                                                        <UserComponent key={user.id} user={user} nocontrol={nocontrol} />
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {type === "post" ? (
                                                    <>
                                                        {dataItems.map((post: any) => {
                                                            return (
                                                                <SmallPostComponent key={post.id} post={post} />
                                                            );
                                                        })}
                                                    </>
                                                ) : (
                                                    <>
                                                        {dataItems.map((issue: any) => {
                                                            return (
                                                                <SmallIssueComponent key={issue.id} issue={issue} />
                                                            );
                                                        })}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </SearchBoxContent>
                        </SearchBox>
                    ) : (
                        <ErrorComponent />
                    )}
                </>
            )}
        </>
    );
}

export default SearchBoxComponent;
