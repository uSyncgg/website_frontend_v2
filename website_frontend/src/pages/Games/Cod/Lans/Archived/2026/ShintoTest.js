import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../../EventInformation.css';

export const ShintoTest = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Shinto Champs - Call of Duty"}
                description={"Shinto Champs is a Call of Duty LAN event featuring 48 teams, pool play into double elimination, and a $7,500 prize pool — the last BO7 LAN event of the season."}
                canonicalPath={"/lans/shinto-test"}
            />

            <HeaderImage title={"Shinto Champs"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Sept 4 - 6th, 2026", "Cleveland, OH"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$7.5k Prize Pool",
                        "48 Teams MAX",
                        "Pool Play then Double Elim Bracket",
                        "Last LAN Event for BO7",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $325"]} footer={<ExternalButton host={"Shinto Champs"} blank={true} title={"Join Now"} path={"https://tpc.misfitsarena.gg/lan/shinto-champs-presented-by-misfits-arena-mqfrnrkx"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
