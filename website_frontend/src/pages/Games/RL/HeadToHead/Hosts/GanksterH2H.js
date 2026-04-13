import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const GanksterH2H = () => {
    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"ganksterPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Find Competitive Scrims", "Analyze Matches", "Large Number of Users and Scrims Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://rocketleague.gankster.gg/login?session=yes"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/head-to-head"} />
            </div>
        </div>
    );
}