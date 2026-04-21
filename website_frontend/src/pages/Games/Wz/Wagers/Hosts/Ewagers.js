import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const Ewagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Ewagers Warzone wager platform. All game modes from 1v1 to 6v6 with any wager amount. Set your own odds with 5% wager fee. Available worldwide for 18+ players."
                canonicalPath={"/games/warzone/wagers/ewagers"}
            />
            <HeaderImage title={"Ewagers"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["3% Deposit AND Withdrawal Fee", "5% Wager Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["All Game Modes / 1v1 - 6v6 Matches", "Any Wager Amount Allowed", "Ability to Set Wager Odds", "Little to No Matches", "Live Website Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "Certain State / Global Restrictions"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://ewagers.co/games?page=1"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}