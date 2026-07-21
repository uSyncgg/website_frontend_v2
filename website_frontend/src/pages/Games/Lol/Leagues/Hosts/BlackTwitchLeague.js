import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const BlackTwitchLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Black Twitch League - League of Legends"}
                description="Black Twitch League. League of Legends league with a grandmaster cap that is free to play and has a cash prize."
                canonicalPath={"/games/LoL/leagues/black-twitch-league"}
            />
            <HeaderImage title={"Black Twitch League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["$125 Prize Pool, based on Donations", "Semi-Competitive", "Live Streamed Matches", "Live Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "$25 Forfeit Deposit", "400 LP Grandmaster Cap"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.gg/bjExwdcrpt"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues"} />
            </div>
        </div>
    );
}