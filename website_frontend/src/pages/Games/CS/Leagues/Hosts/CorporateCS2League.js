import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CorporateCS2League = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Corporate CS2 league is THE corporate America league. Play with your co-workers against other companies in the United States."
                canonicalPath={"/games/CS2/leagues/corporate"}
            />
            <HeaderImage title={"Corporate CS2 League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,000 in charity donations, no prize pool (Estimated)", "All matches are played each Saturday", "~8 week long regular season with playoffs", "Competitive"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$250 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://cea.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}