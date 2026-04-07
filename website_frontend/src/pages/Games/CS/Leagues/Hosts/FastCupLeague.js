import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../EventInformation.css';

export const FastCupLeague = () => {
    return (
        <div className="standardContainer">
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
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://cs2.fastcup.net/leagues/68/210/202/771"} />
            </div>
        </div>
    );
}