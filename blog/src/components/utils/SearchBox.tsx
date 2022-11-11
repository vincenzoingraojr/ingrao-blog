import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { useMeQuery } from "../../generated/graphql";
import { LoadingContainer, PageText } from "../../styles/global";
import Close from "../icons/Close";
import Magnifier from "../icons/Magnifier";
import SmallPostComponent from "../layouts/items/SmallPostComponent";
import LoadingComponent from "./LoadingComponent";

interface SearchBoxComponentProps {
    data: any;
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

const SearchBoxComponent: FunctionComponent<SearchBoxComponentProps> = ({ data }) => {
    const [value, setValue] = useState("");

    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    });

    const { data: meData, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
        variables: { origin: "blog" },
    });

    function handleInputChange(e: any) {
        const query = e.target.value;
        const dataItems = data || [];

        const filteredData = dataItems.filter((dataItem: any) => {
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
            {(loading && !meData) || error ? (
                <LoadingContainer>
                    <LoadingComponent />
                </LoadingContainer>
            ) : (
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
                                placeholder={"Search for a blog post"}
                                aria-label={"Search for a blog post"}
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
                                {dataItems.map((post: any) => {
                                    return (
                                        <SmallPostComponent key={post.id} post={post} />
                                    );
                                })}
                            </>
                        )}
                    </SearchBoxContent>
                </SearchBox>
            )}
        </>
    );
}

export default SearchBoxComponent;
