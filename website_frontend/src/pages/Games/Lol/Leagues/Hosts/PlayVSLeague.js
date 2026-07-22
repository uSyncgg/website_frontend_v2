import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const PlayVSLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"PlayVS League - League of Legends"}
                description="PlayVS League of Legends league is for high school students in the United States looking to play competitive for their school. Sign up."
                canonicalPath={"/games/LoL/leagues/playvs"}
            />
            <HeaderImage title={"PlayVS League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall Season"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Highly Competitive", "No Live Streamed Matches", "No Skill Requirement"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a High School Student"]} footer={<ExternalButton host={"PlayVS League"} blank={true} title={"Join Now"} path={"https://www.playvs.com/league-of-legends"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}
