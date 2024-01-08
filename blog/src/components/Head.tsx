import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useViewPageMutation } from "../generated/graphql";

interface HeadProps {
    title: string;
    description: string;
    blogPost?: boolean;
    image?: string;
}

const Head: FunctionComponent<HeadProps> = ({ title, description, blogPost, image }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [viewPage] = useViewPageMutation();

    useEffect(() => {
        viewPage({
            variables: {
                pathname,
            },
        });
    }, [pathname, viewPage]);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                property="og:image"
                content={image ? image : "https://storage.ingrao.blog/brand/logo.png"}
            />
            <meta name="twitter:card" content={blogPost ? "summary_large_image" : "summary"} />
            <meta
                property="twitter:image"
                content={image ? image : "https://storage.ingrao.blog/brand/logo.png"}
            />
        </Helmet>
    );
};

export default Head;
