import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const FastCupLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Fast Cup is an eastern hemisphere based Counter-Strike 2 league. With monthly leagues this event will have you always improving your game."
                canonicalPath={"/games/CS2/leagues/fastcup"}
            />
            <HeaderImage title={"Fast Cup"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Monthly Leagues"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Large Prize Pools", "Head-To-Head Match Format", "Various Skill Groups Based on Elo", "Anti-Cheat Software to Ensure Legitimacy", "Post Game Statistical Analysis", "Servers Provided", "Various Daily Tournaments"]} regionTitle={"Region/Type"} regionInfoList={["1v1 - 5v5 - EU, CIS, ME, and SA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://cs2.fastcup.net/leagues/68/210/202/771"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/leagues"} />
            </div>
        </div>
    );
}