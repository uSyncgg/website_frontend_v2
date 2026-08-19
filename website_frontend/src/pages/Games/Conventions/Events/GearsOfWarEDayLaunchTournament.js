import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../EventInformation.css';

export const GearsOfWarEDayLaunchTournament = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Gears of War E-Day Launch Tournament - Convention"}
                description={"Gears of War LAN tournaments are back with over a $2k prize pool to the winner. Do you have what it takes on the new Gears of War to win big?"}
                canonicalPath={"/lans/gears-of-war-e-day-launch-tournament"}
            />

            <HeaderImage title={"Gears of War E-Day Launch Tournament"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["October 17 - October 18th, 2026", "Columbus, OH"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$2,000 Prize Pool (Based on Entrants)",
                        "16 Teams MAX",
                        "4v4 Format",
                        "Live Streamed Matches",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $250"]} footer={<ExternalButton host={"Gears of War E-Day Launch Tournament"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/game-arena-x-premier-circuit-gears-of-war-e-day-launch-tournament/details"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
