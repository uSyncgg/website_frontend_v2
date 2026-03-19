import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const GanksterGGH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"ganksterPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Find Most Competitive Scrims", "Large Number of Users and Scrims Daily", "Analyze Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://valorant.gankster.gg/login?session=yes"} />
            </div>
        </div>
    );
}