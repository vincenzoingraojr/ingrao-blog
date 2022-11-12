import Head from "../components/Head";
import PageLayout from "../components/layouts/PageLayout";
import PageContentLayout from "../components/layouts/sublayouts/PageContentLayout";
import StandardPageLayout from "../components/layouts/sublayouts/StandardPageLayout";
import { WritingContainer } from "../styles/global";

function AboutPage() {
    return (
        <>
            <Head
                title="About me and the blog | ingrao.blog"
                description="In this page you can find out more about me and discover what's the purpose of this blog."
            />
            <PageLayout content={
                <PageContentLayout content={
                    <StandardPageLayout 
                        title="About me"
                        description="In this page you can find out more about me and discover what’s the purpose of this blog."
                        content={
                            <WritingContainer>
                                <p>
                                    Hello, my name is Vincenzo Ingrao Jr. <br />
                                    I’m a science and engineering student, and ever since I was a child I’ve always loved technology and science. My dream is to become a scientist and an inventor, so I can create new things that will improve life on Earth (and beyond) for everyone.
                                </p>
                                <h2>What’s ingrao.blog?</h2>
                                <p>
                                    ingrao.blog is my personal blog, but I wouldn’t call it a simple blog. It’s a full-stack web application that relies on modern technologies which allows me to post scientific articles, talk about technology and innovation with a lot of people — through a custom comment system (that will be implemented later this year) — and promote my projects on Internet.
                                </p>
                            </WritingContainer>
                        }       
                    />
                } />
            } />
        </>
    );
}

export default AboutPage;