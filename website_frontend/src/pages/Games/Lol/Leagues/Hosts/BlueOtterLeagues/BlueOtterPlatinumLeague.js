import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const BlueOtterPlatinumLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Blue Otter Platinum League - League of Legends"}
                description="Blue Otter Platinum is for LoL platinum players that plat 1 99LP or lower. Do you have what it takes?"
                canonicalPath={"/games/LoL/leagues/blue-otter-leagues/plat"}
            />
            <HeaderImage title={"Blue Otter Platinum League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1st Place - 50% Entry Fees (Estimated)", "Support on Discord", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$60 per Team (Estimated)", "$15 Forfeit Deposit", "Platinum 1 99 LP Cap, 1 Emerald 4 per Team"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/gVGSxRT"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/blue-otter-leagues"} />
            </div>
        </div>
    );
}
