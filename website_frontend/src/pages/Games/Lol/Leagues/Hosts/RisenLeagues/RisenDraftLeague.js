import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import '../../../../EventInformation.css';

export const RisenDraftLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Risen Draft League - League of Legends"}
                description="Risen Draft League is a free entry League of Legends league for new players who have hit level 100. This is your chance to improve your game early on."
                canonicalPath={"/games/LoL/leagues/risen-leagues/draft"}
            />
            <HeaderImage title={"Risen Draft League"} imageClass={"risenLOLLeagues"} />

            <div className="verifiedContainer">
                <VerifiedText />
            </div>

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring, Summer, and Winter Seasons"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["No Prize Pool", "Draft Based League", "Live Streamed Matches", "Support on Discord"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "Must be Level 100", "Solo Only Sign Ups"]} footer={<ExternalButton host={"Risen Draft League"} blank={true} title={"Join Now"} path={"https://discord.com/invite/risenesports"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/LoL/leagues/risen-leagues"} />
            </div>
        </div>
    );
}
