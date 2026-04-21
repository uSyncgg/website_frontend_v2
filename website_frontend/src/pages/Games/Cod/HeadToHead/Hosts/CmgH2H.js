import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const CmgH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Play Call of Duty XP matches and get ranked. Free competitive SND esports ladder matches."
                canonicalPath={"/games/call-of-duty/head-to-head/cmg"}
            />
            <HeaderImage imageClass={"cmgPage"} verified={true} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free XP Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "Large Number of Users and Matches Daily", "Ranked Ladder by Wins"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide", "US State Restrictions: AZ, IA, MS, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.checkmategaming.com/ladders"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/head-to-head"} />
            </div>
        </div>
    );
}