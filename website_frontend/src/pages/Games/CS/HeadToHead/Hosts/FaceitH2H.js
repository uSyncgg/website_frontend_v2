import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const FaceitH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Compete in the #1 place for free Counter-Strike 2 match ladders - FACEIT. CLimb the ladder and earn rewards / prizes."
                canonicalPath={"/games/CS2/head-to-head/faceit"}
            />
            <HeaderImage imageClass={"faceitPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

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