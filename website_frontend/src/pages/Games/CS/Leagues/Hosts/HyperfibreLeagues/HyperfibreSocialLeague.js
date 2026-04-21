import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const HyperfibreSocialLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Hyperfibre social league is a free to play New Zealand league. Compete in a casual setting to have fun while still being competitive."
                canonicalPath={"/games/CS2/leagues/hyperfibre-leagues/social"}
            />
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
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/NZ_Esports_"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues/hyperfibre-leagues"} />
            </div>
        </div>
    );
}