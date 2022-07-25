import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface LogoProps {
    type?: string;
}

const LogoContainer = styled(SvgIcon).attrs((props: { size: number }) => props)`
    width: ${(props) => (props.size && `${props.size}px`)};
    height: ${(props) => (props.size && `${props.size}px`)};
    fill: #000000;
    stroke: none;
`;

const Logo: FunctionComponent<LogoProps> = ({ type }) => {
    const [size, setSize] = useState(0);

    useEffect(() => {
        if (type === "index-logo") {
            setSize(144);
        } else if (type === "logo") {
            setSize(48);
        } else {
            setSize(36);
        }
    }, [type]);

    return (
        <LogoContainer size={size}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0H17V3H15V0Z" />
                <path d="M21.134 1.10769L22.866 2.10769L21.366 4.70577L19.634 3.70577L21.134 1.10769Z" />
                <path d="M25.8923 5.13398L26.8923 6.86603L24.2942 8.36603L23.2942 6.63398L25.8923 5.13398Z" />
                <path d="M25 11H28V13H25V11Z" />
                <path d="M26.8923 17.134L25.8923 18.866L23.2942 17.366L24.2942 15.634L26.8923 17.134Z" />
                <path d="M6.10769 18.866L5.10769 17.134L7.70577 15.634L8.70577 17.366L6.10769 18.866Z" />
                <path d="M4 13V11H7V13H4Z" />
                <path d="M5.10769 6.86602L6.10769 5.13397L8.70577 6.63397L7.70577 8.36602L5.10769 6.86602Z" />
                <path d="M9.13397 2.10769L10.866 1.10769L12.366 3.70577L10.634 4.70577L9.13397 2.10769Z" />
                <path d="M22.1271 17.5172C21.3177 18.9669 20.5083 20.4165 20.1915 22.0265C20.0641 22.674 20 23.3323 20 23.9922V26H18V24.3008C18 23.4362 18.0936 22.574 18.2791 21.7294C18.6015 20.2613 19.3333 18.9006 20.0646 17.5407C20.8446 16.0903 21.6242 14.6407 21.9062 13.0626C21.9678 12.7177 22 12.3626 22 12C22 8.68629 19.3137 6 16 6C12.6863 6 10 8.68629 10 12C10 12.3626 10.0322 12.7177 10.0938 13.0626C10.3758 14.6407 11.1554 16.0903 11.9354 17.5407C12.6667 18.9006 13.3985 20.2613 13.7209 21.7294C13.9064 22.574 14 23.4362 14 24.3008V26H12V23.9922C12 23.3323 11.9359 22.674 11.8085 22.0265C11.4917 20.4165 10.6823 18.9669 9.87292 17.5172C9.47578 16.8059 9.07862 16.0945 8.73967 15.3643C8.26497 14.3416 8 13.2017 8 12C8 7.58172 11.5817 4 16 4C20.4183 4 24 7.58172 24 12C24 13.2017 23.735 14.3416 23.2603 15.3643C22.9214 16.0945 22.5242 16.8059 22.1271 17.5172Z" />
                <path d="M12 29V27H20V29H12Z" />
                <path d="M12 30L13 32H19L20 30H12Z" />
            </svg>
        </LogoContainer>
    );
};

export default Logo;
