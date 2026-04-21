import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const BlueOtterEmeraldLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Join a League of Legends - Blue Otter Emerald - an Emerald 1 99LP cap league that is year round."
                canonicalPath={"/games/LoL/leagues/blue-otter-leagues/emerald"}
            />
            <HeaderImage title={"Blue Otter Emerald League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place - 50% Entry Fees (Estimated)", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$100 per Team (Estimated)", "$15 Forfeit Deposit", "Emerald 1 99 LP Cap, 1 Diamond 4 per Team"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/gVGSxRT"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/blue-otter-leagues"} />
            </div>
        </div>
    );
}
