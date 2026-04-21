import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const GamerSaloonWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Gamer Saloon Rocket League wagers. Console only 1v1 best of 3 matches with set buy-in amounts. 10% match fee for Rocket League wager matches."
                canonicalPath={"/games/RocketLeague/wagers/gamersaloon"}
            />
            <HeaderImage title={"GamerSaloon"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 10%", "Varying Deposit/Withdrawal Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1v1 Best of 3 Console ONLY", "5 Minute Matches", "Set Buy-In Amounts", "Small Numbers of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, IA, MI, MT, NV, and SD", "NA Server Only"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.gamersaloon.com/tournaments/all"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/wagers"} />
            </div>
        </div>
    );
}