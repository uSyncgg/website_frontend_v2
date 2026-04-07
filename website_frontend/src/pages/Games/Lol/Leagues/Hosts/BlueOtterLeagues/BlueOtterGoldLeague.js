import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const BlueOtterGoldLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Blue Otter Gold League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place - 50% Entry Fees (Estimated)", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$50 per Team (Estimated)", "$15 Forfeit Deposit", "Gold 1 99 LP Cap, 1 Platinum 4 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://discord.com/invite/gVGSxRT"} />
            </div>
        </div>
    );
}
