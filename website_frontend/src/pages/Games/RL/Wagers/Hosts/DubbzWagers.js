import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const DubbzWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Dubbz"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 5%", "Varying Deposit Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Various Rewards / Rakeback", "Very Small Number of Users", "Various Tournaments", "Live Website Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "USA, EU, and SA", "Restricted States: NJ and LA"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://dubbz.com/"} />
            </div>
        </div>
    );
}