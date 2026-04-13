import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
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
                    <EventInfoCard title={"Details"} infoList={["Find Most Competitive Scrims", "Analyze Matches", "Large Number of Users and Scrims Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://lol.gankster.gg/login"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/head-to-head"} />
            </div>
        </div>
    );
}