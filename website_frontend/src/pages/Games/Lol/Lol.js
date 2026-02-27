import { HeaderImage, EventTypeImages } from "components";

export const Lol = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"lolGamePage"} />
            <EventTypeImages page={"League of Legends"} />
        </div>
    );
}
