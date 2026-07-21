import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const CWLAscendLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"CWL Ascend - League of Legends"}
                description="Cobalt Winds Ascend League of Legends league. 750 LP Individual cap with NO team cap. This league is for the best of the best."
                canonicalPath={"/games/LoL/leagues/cobalt-winds-leagues/cwl-ascend"}
            />
            <HeaderImage title={"CWL Ascend"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 EUW"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["€350 Prize Pool for First Place, €100 for Second", "2 Consecutive 4-Week Tournaments", "Community Contests and Events During Season and Offseason", "Flexible Rules for EUNE Players", "Support on Discord", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["€40 per Team", "750 LP Individual Cap | No Team Cap"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/WTJJmgPgCU"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/cobalt-winds-leagues"} />
            </div>
        </div>
    );
}
