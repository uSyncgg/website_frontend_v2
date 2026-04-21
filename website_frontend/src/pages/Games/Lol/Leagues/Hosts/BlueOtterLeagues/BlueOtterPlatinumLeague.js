import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const BlueOtterPlatinumLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Blue Otter Platinum is for LoL platinum players that plat 1 99LP or lower. Do you have what it takes?"
                canonicalPath={"/games/LoL/leagues/blue-otter-leagues/plat"}
            />
            <HeaderImage title={"Blue Otter Platinum League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place - 50% Entry Fees (Estimated)", "Support on Discord", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$60 per Team (Estimated)", "$15 Forfeit Deposit", "Platinum 1 99 LP Cap, 1 Emerald 4 per Team"]} />
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
