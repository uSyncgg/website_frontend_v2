import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const NJCAAELeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="NJCAAE league. The Counter-Strike 2 league that every college student has been looking to compete in"
                canonicalPath={"/games/CS2/leagues/njcaae"}
            />
            <HeaderImage title={"NJCAAE League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["3 Skill Tiers (Premier, Contender, or Open)", "7 Week Round Robin Regular Season", "Single Elimination Playoffs", "No Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$2,000/yr per School", "Must be Attending a 2 year College Program"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.njcaaesports.org/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}