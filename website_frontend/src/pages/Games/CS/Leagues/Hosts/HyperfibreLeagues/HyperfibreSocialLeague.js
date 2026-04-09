import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const HyperfibreSocialLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Hyperfibre Social Division"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Casual for Fun Division", "Ages 16+", "4 Week Long Regular Season", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NZ"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://x.com/NZ_Esports_"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues/hyperfibre-leagues"} />
            </div>
        </div>
    );
}