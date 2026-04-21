import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CollegiateValorantHubScrimsH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Collegiate Valorant Esports Hub scrim finder for USA college teams. Free scrim finder to manually schedule Valorant college matches and practice sessions."
                canonicalPath={"/games/Valorant/head-to-head/college-hub"}
            />
            <HeaderImage title={"Collegiate Valorant Hub Scrims"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Collegiate School Scrim Finder", "Manually Schedule Matches & Times", "Semi-Large Number of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["USA Only"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/Vq5qu9szQU"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/head-to-head"} />
            </div>
        </div>
    );
}