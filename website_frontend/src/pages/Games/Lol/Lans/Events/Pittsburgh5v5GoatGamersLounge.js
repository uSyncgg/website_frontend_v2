import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const Pittsburgh5v5GoatGamersLounge = () => {
    const { data, error } = useEvent("lans", "League of Legends", "5v5 Pittsburgh - Goat Gamers Lounge");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"5v5 Pittsburgh - Goat Gamers Lounge - League of Legends"}
                description="Pittsburgh League players join us for an in-person 5v5 League of Legends tournament at Goat Gamers Lounge. All ranks and experience levels are welcome."
                canonicalPath={"/lans/5v5-pittsburgh-goat-gamers-lounge"}
            />

            <HeaderImage title={"5v5 Pittsburgh - Goat Gamers Lounge"} imageUrl={data?.header_img} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 29 - 30th, 2026", "Pittsburgh, PA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Prize Pool Based on Entrants"
                        , "League of Legends 5v5 Summoner's Rift"
                        , "20 Teams MAX"
                        , "Open to All Ranks"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Venue Fee: $30","Spectator Pass: $5"]} footer={<ExternalButton host={"5v5 Pittsburgh - Goat Gamers Lounge"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/league-of-legends-5v5-pittsburgh-goat-gamers-lounge-1/details"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/lans"} />
            </div>
        </div>
    );
}
