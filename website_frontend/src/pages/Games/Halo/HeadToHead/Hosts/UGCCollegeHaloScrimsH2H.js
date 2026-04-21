import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const UGCCollegeHaloScrimsH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="UGC Halo scrim finder for collegiate teams looking to play against other colleges. Join today and play."
                canonicalPath={"/games/halo/head-to-head/ugc-scrim"}
            />
            <HeaderImage imageClass={"ugcPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Collegiate Scrim Finder / 8s Lobbies"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Collegiate School Scrim Finder", "Schedule Matches & Times Manually", "Large Number of Users and Matches Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide", "Collegiate Teams / Students ONLY"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/CapnyyzMkJ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/head-to-head"} />
            </div>
        </div>
    );
}