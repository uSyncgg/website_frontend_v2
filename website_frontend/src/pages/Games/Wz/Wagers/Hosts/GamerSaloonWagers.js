import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const GamerSaloonWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"GamerSaloon"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 10%", "Varying Deposit/Withdrawal Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1v1 Kill Race Console ONLY", "Set Buy-In Amounts", "Small Number of Users"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, IA, MI, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.gamersaloon.com/tournaments/all"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}