import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const GamerSaloonWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"GamerSaloon"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 10%", "Varying Fee with Deposits/Withdrawals"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1v1 Deathmatches ONLY", "Set Buy-In Amounts", "Matches Posted Daily", "Small Number of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Restricted States: AZ, IA, LA, MI, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.gamersaloon.com/tournaments/all"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/wagers"} />
            </div>
        </div>
    );
}