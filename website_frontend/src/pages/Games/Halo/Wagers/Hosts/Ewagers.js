import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const Ewagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo Esports Wager is the place for 1v1 - 6v6 matches. Choose your wager amount and grab your teammate and make money playing Halo."
                canonicalPath={"/games/halo/wagers/ewagers"}
            />
            <HeaderImage title={"Ewagers"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["3% Deposit AND Withdrawal Fee", "5% Wager Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Various Games Modes / 1v1 - 6v6 Matches", "Any Wager Amount Allowed", "Ability to Set Wager Odds", "Little to No Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "Certain State / Global Restrictions"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://ewagers.co/games?page=2"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/wagers"} />
            </div>
        </div>
    );
}