import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MetaShiftDraftLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"MetaShift Draft League - League of Legends"}
                description="MetaShift Draft league is a fast paced action packed League of Legends League. With a lower entry fee this is perfect for amateurs."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues/draft"}
            />
            <HeaderImage title={"MetaShift Draft League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Fall Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool TBD", "6 Teams Max", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$30 per Captain", "$15 per Person"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://discord.com/invite/RtJa6kY"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/meta-shift-leagues"} />
            </div>
        </div>
    );
}
