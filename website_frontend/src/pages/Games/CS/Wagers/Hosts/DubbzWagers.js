import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const DubbzWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Dubbz"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Match Fee: 5%", "Varying Fee with Deposits", "$1 Wager Minimum"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Server Hosted by Dubbz", "Various Rewards / Rakeback", "Best of 1 Matches", "Very Small Number of Users", "Various Tournaments", "Live Website Support"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "USA, EU, and SA Only", "Restricted States: NJ and LA"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://dubbz.com/"} />
            </div>
        </div>
    );
}