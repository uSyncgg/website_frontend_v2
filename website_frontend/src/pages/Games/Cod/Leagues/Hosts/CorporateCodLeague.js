import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const CorporateCodLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Corporate League - Call of Duty"}
                description={"Call of Duty league for the corporate world. After your 9-5 compete for charity against blue-chip companies."}
                canonicalPath={"/games/call-of-duty/leagues/corporate-cod-league"}
            />

            <HeaderImage title={"Corporate COD League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$2,000 in Charity Donations", "No Prize Pool", "Saturday Weekly Matches", "8 Week Regular Season with Playoffs"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$200 per Team"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://www.google.com/url?q=https%3A%2F%2Fcea.gg&sa=D&sntz=1&usg=AOvVaw3Su3Sn39NBgq_faxrk2Xy3"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}