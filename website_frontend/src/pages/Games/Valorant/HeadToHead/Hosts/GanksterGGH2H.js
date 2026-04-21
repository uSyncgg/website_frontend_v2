import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const GanksterGGH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Gankster GG Valorant scrim finder. A verified platform for finding competitive Valorant scrims with a large number of users and daily matches worldwide."
                canonicalPath={"/games/Valorant/head-to-head/gankster"}
            />
            <HeaderImage imageClass={"ganksterPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

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
                <ExternalButton blank={true} title={"Join Now"} path={"https://valorant.gankster.gg/login?session=yes"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/head-to-head"} />
            </div>
        </div>
    );
}