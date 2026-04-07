import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const PulseOpenLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Pulse X Open League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["December Start - Runs Twice per Title Year"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["2000 PP (Pro Points) or Lower", "$800 - $1,000 Prize Pool (TBD)", "Crossplay (Xbox, Playstation 4 & 5, and PC)", "Live Streamed Matches with Casters and Media Coverage"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
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
        </div>
    );
}