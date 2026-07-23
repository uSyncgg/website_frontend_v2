import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EGFHLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"EGFH League - Rocket League"}
                description="EGFH high school Rocket League. Two 8 week seasonal splits with regional and national championships. National championship held on LAN for high school students."
                canonicalPath={"/games/RocketLeague/leagues/egfh"}
            />
            <HeaderImage title={"EGFH League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Two 8 Week Seasonal Splits", "Regional and National Championships", "National Championship Held on LAN", "Live Streamed Matched"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a High School Student"]} footer={<ExternalButton host={"EGFH League"} blank={true} title={"Join Now"} path={"https://www.egf.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
