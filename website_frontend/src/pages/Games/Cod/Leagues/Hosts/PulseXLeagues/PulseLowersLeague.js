import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const PulseLowersLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Pulse X Lowers Division"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["December Start - Runs Twice per Title Year"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["TBD Prize Pool", "6 Different Ranks", "Crossplay (Xbox, Playstation 4 & 5, and PC)", "Live Streamed Matches with Casters and Media Coverage"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$25 per Team"]} />
                </div>

                <div>
                    <EventInfoCard title={"Region/Type"} infoList={["4v4 - NA"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/pulsexleague"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/pulse-x-leagues"} />
            </div>
        </div>
    );
}