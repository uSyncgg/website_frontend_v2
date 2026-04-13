import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CmgH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"cmgPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free XP Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "Large Number of Users and Matches Daily", "Ranked Ladder by Wins", "Various Prizes Based on Record"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide", "US State Restrictions: AZ, IA, MS, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.checkmategaming.com/ladders"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/head-to-head"} />
            </div>
        </div>
    );
}