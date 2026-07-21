import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CECCLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"CECC League - Rocket League"}
                description="Collegiate Esports Collegiate Conference Rocket League. 4 regional divisions with regional qualifiers and LAN finals. Must be a full time college student."
                canonicalPath={"/games/RocketLeague/leagues/cecc"}
            />
            <HeaderImage title={"CECC League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Qualifiers and Grand Championship"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - USA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["4 Regional Divisions", "Regional Qualifiers & Regional Tournaments", "LAN Finals", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a FULL TIME College Student"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.collegiatesmg.com/cecc"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
