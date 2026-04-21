import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const PulseUppersLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Pulse X Uppers Division is a Call of Duty league for those that are looking to play in a competitive environment with the best of the best to prove your name."
                canonicalPath={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-uppers"}
            />
            <HeaderImage title={"Pulse X Uppers Division"} imageClass={"eventPage"} />

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
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/pulsexleague"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues/pulse-x-leagues"} />
            </div>
        </div>
    );
}