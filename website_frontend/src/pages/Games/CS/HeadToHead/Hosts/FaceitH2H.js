import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const FaceitH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"faceitPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Match Finder"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Various Different Ladders", "FACEIT Points Based on Placing", "Points Can Be Used in The Shop", "Large Number of Users", "Live Website Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.faceit.com/en/game/cs2"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/head-to-head"} />
            </div>
        </div>
    );
}