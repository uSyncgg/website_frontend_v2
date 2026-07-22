import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const ItalianSerieALeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Italian Series A - Rocket League"}
                description="3v3 Italian Rocket League league for those looking to play on their countries servers. Sign up today and compete for cash."
                canonicalPath={"/games/RocketLeague/leagues/italian-leagues/serie-a"}
            />
            <HeaderImage title={"Italian Series A"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Two Annual Seasons (Estimated)"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - ITL"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Based on Teams Performance", "2 Players Must Have Italian Citizenship", "Earn Points in Regular season to Determine Playoff Eligibility", "Playoffs on LAN", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton host={"Italian Series A"} blank={true} title={"Join Now"} path={"https://www.italianrocketchampionship.it/?lang=eng"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/italian-leagues"} />
            </div>
        </div>
    );
}
