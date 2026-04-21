import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const NASEFLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="NASEF Valorant high school league. Free to enter with 5 regional divisions and weekly group stage matches. Annual fall season for USA high school students."
                canonicalPath={"/games/Valorant/leagues/nasef"}
            />
            <HeaderImage title={"NASEF League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Fall Season (Estimated)"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["5 Regional Divisions", "Weekly Group Stage Matches", "Top Regional Teams Make Playoffs"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - USA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry - Must be a High School Student"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.nasef.org/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
