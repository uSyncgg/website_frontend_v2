import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const UnitedRogueLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"United Rogue - Call of Duty"}
                description="4v4 Call of Duty league variant draft league. United Rogue hosted event with franchised teams."
                canonicalPath={"/games/call-of-duty/leagues/united-rogue-league"}
            />
            <HeaderImage title={"United Rogue"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons (Estimated)"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["NO Prize Pool", "Draft League", "Franchises", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Free Agent", "Must Fill out Intent Form"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/zenX8TcSdT"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}