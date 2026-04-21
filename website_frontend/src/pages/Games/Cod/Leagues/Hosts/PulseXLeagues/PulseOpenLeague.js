import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const PulseOpenLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Pulse X Open Division is the competitive arm of the Pulse X CoD League. Build your squad or sign up solo and compete in BO7-ready series with playoffs and prize support."
                canonicalPath={"/games/call-of-duty/leagues/pulse-x-leagues/pulse-x-open"}
            />
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