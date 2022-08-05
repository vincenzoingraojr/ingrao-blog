import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { ControlContainer } from "../../../styles/global";
import More from "../../icons/More";

interface PopoverProps {
    content: JSX.Element;
}

const PopoverContainer = styled.div.attrs(
    (props: { visible: boolean }) => props
)`
    display: ${(props) => (props.visible ? "flex" : "none")};
    flex-direction: column;
    border: 2px solid #000000;
    background-color: #ffffff;
`;

const Popover: FunctionComponent<PopoverProps> = ({ content }) => {
    const [visible, setVisibility] = useState(false);
  
    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: "bottom-end",
        }
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    function handleDocumentClick(event: any) {
        if (referenceRef !== null && referenceRef.current !== null && referenceRef.current.contains(event.target)) {
            return;
        }

        setVisibility(false);
    }

    function handleDropdownClick(event: any) {
        event.stopPropagation();
        setVisibility(!visible);
    }

    return (
        <React.Fragment>
            <ControlContainer
                role="button"
                ref={referenceRef}
                size={26}
                onClick={handleDropdownClick}
            >
                <More />
            </ControlContainer>
            <div ref={popperRef} style={styles.popper} {...attributes.popper}>
                <PopoverContainer style={styles.offset} visible={visible}>
                    {content}
                </PopoverContainer>
            </div>
        </React.Fragment>
    );
};

export default Popover;
