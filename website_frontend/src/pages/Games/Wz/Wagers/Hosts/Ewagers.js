import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const Ewagers = () => {
    return (
        <div className="standardContainer">
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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://ewagers.co/games?page=1"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}