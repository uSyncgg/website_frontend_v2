import { HeaderImage, EventTypeImages } from "components";

export const Articles = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"articlesPage"} title={"uSync Articles"} />
            <EventTypeImages page={"Articles"} />
        </div>
    );
}
