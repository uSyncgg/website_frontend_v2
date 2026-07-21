import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const HyperfibreEliteLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Hyperfibre Elite Division - Counter-Strike"}
                description="Elite hyperfibre league for New Zealand Counter-Strike 2 players. Compete against other NZ players and climb to the top."
                canonicalPath={"/games/CS2/leagues/hyperfibre-leagues/elite"}
            />
            <HeaderImage title={"Hyperfibre Elite Division"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NZ"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Competitive Division", "Ages 16+", "4 Week Long Regular Season", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://x.com/NZ_Esports_"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues/hyperfibre-leagues"} />
            </div>
        </div>
    );
}