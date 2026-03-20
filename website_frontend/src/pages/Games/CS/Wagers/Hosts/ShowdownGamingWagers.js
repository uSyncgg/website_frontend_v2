import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const ShowdownGamingWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Showdown Gaming"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Crypto Fees", "Various Site Fees"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["5v5 and 1v1 Wagers ONLY", "Free Deathmatches", "Crypto Based Wagers", "VERY Small Numbers of User", "No Terms of Service = Less Reliable"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://showdown.win/duels"} />
            </div>
        </div>
    );
}