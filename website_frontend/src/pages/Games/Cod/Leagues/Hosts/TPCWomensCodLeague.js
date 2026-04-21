import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const TPCWomensCodLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="The Premier Circuit Womens cod league. Women only Call of Duty competitive league with massive $4.5k prize pool."
                canonicalPath={"/games/call-of-duty/leagues/tpc-womens-cod"}
            />
            <HeaderImage title={"TPC Womens League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Seasons per Year"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$4,500+ Prize Pools", "5 Majors and 1 LAN", "Main and Beginner's Leagues", "Female ONLY", "Pre Season Tournaments", "4v4 CDL Variant"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$375 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/TPCWomens"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}