import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../EventInformation.css';

export const GanksterGGH2H = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"GanksterGG - League of Legends"}
                description="Scrim matches for League of Legends from the most integrated provider. Try it free today."
                canonicalPath={"/games/LoL/head-to-head/gankster"}
            />
            <HeaderImage imageClass={"ganksterPage"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Free Scrim Matches"]} footer={<ExternalButton host={"GanksterGG"} blank={true} title={"Join Now"} path={"https://lol.gankster.gg/login"} />}/>
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Find Most Competitive Scrims", "Analyze Matches", "Large Number of Users and Scrims Daily"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/head-to-head"} />
            </div>
        </div>
    );
}