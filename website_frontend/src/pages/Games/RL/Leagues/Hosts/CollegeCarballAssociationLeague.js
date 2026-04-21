import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const CollegeCarballAssociationLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="College Carball Association Rocket League league. A verified 3v3 NA and EU college league with world championship. Must be a full time college student."
                canonicalPath={"/games/RocketLeague/leagues/college-carball-association"}
            />
            <HeaderImage imageClass={"ccaPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["5 Week Regular Season with Playoffs", "World Championship includes NA and EU", "Live Streamed Matches", "24/7 Support and Admins on Discord"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - NA/EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Entry Fee TBD - Must be a FULL TIME College Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/cca"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
