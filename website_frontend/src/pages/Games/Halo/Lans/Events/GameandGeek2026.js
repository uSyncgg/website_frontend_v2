import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const GameandGeek2026 = () => {
    const { data, error } = useEvent("lans", "Halo", "Game And Geek Expo 2026");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Game and Geek Expo 2026 - Halo"}
                description="Game and Geek Expo is a high energy celebration of gaming, nostalgia, cosplay, and fandoms, uniting immersive experiences, a curated marketplace, and iconic pop culture all under one roof."
                canonicalPath={"/lans/game-and-geek-2026"}
            />

            <HeaderImage title={"Game and Geek Expo 2026"} imageUrl={data?.header_img} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Sep 5th - 6th, 2026", "Raleigh, NC"]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Prize Pool Based on Entrants"
                        , "Halo Infinite FFA Tournament"
                        , "All Tournaments are Free Entry"
                        , "Various Tournament Titles: CS2, Mario Kart, Fortnite, College Football, SSBU, and More"
                    ]} /> 
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Day Pass: ~$40","VIP Weekend Pass: $51"]} footer={<ExternalButton host={"Game and Geek Expo 2026"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/game-and-geek-expo-2026/details"} />}/> 
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/lans"} />
            </div>
        </div>
    );
}
