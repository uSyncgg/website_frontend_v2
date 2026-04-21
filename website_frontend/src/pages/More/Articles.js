import { HeaderImage, EventTypeImages, SeoData } from "components";

export const Articles = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="uSync articles showcase the disorganization in esports and how uSync brings the community together. Check out uSync's articles to learn more!"
                canonicalPath={"/more/articles"}
            />

            <HeaderImage imageClass={"articlesPage"} title={"uSync Articles"} />
            <EventTypeImages page={"Articles"} />
        </div>
    );
}
