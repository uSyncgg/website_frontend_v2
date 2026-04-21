import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CorporateValorantLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Corporate Valorant League. Sign up your company for 5v5 NA Valorant competition. $2,000 donated to charity with 8 week season and playoffs each Saturday."
                canonicalPath={"/games/Valorant/leagues/corporate"}
            />
            <HeaderImage title={"Corporate Valorant League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,000 in Charity Donations, No Prize Pool (Estimated)", "Must Sign up with Company", "All matches are played each Saturday", "~8 Week Long Regular Season and Playoffs"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$250 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://cea.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/Valorant/leagues"} />
            </div>
        </div>
    );
}
