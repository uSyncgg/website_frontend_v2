import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const GanksterH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"GanksterGG - Rocket League"}
                description="GanksterGG Rocket League scrimmage matches. Play your most competitive scrims from top level teams in Rocket League."
                canonicalPath={"/games/RocketLeague/head-to-head/gankster"}
            />
            <HeaderImage title={"GanksterGG"} imageClass={"ganksterPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Matches"]} footer={<ExternalButton host={"GanksterGG"} blank={true} title={"Join Now"} path={"https://rocketleague.gankster.gg/login?session=yes"} />}/>
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Find Competitive Scrims", "Analyze Matches", "Large Number of Users and Scrims Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/head-to-head"} />
            </div>
        </div>
    );
}