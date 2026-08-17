import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const Ozokucon2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Ozokucon 2026 - Halo"}
                description="Ozokucon 2026 Gaming Tournaments - Port Huron's Biggest Anime & Esports Showdown, Aug 28-30 at Blue Water Convention Center"
                canonicalPath={"/lans/ozokucon-2026"}
            />

            <HeaderImage title={"Ozokucon 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Aug 28 - 30th, 2026", "Port Huron, MI"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Winner Takes All"
                        , "Halo 3 2v2 Event (Saturday)"
                        , "Various Tournaments: SF6, Tekken, SSBU, and More"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Game Fee: $5 per Player","3-Day Pass: $80","Friday Pass: $57","Saturday Pass: $74","Sunday Pass: $52"]} footer={<ExternalButton host={"Ozokucon 2026"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/ozokucon-2026-gaming-tournaments/details"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/lans"} />
            </div>
        </div>
    );
}
