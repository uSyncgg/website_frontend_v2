import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const FiReLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Counter-Strike 2 FiReLEAGUE is a year round 5v5 league. With invitational tournaments and qualifiers to win prizes."
                canonicalPath={"/games/CS2/leagues/firecup"}
            />
            <HeaderImage title={"FiRe League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Qualifiers / Leagues Year Round"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Various Prize Pools", "Invitational Tournaments", "Qualifiers Pre Season", "Based in Buenos Aires", "Live Streamed Matches", "Highly Competitive"]} regionTitle={"Region/Type"} regionInfoList={["5v5 - NA, SA, and EU"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Variable Cost Based on Event"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://x.com/FiReSPORTSgg"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}