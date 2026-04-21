import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const ShowdownGamingWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Counter-Strike 2 duel wager matches. Compete one on one where winner takes all of the cash wagered."
                canonicalPath={"/games/CS2/wagers/showdowngaming_cs2"}
            />
            <HeaderImage title={"Showdown Gaming"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Crypto Fees", "Various Site Fees"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["5v5 and 1v1 Wagers ONLY", "Free Deathmatches", "Crypto Based Wagers", "VERY Small Numbers of User", "No Terms of Service = Less Reliable"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["Available Worldwide"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://showdown.win/duels"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/CS2/wagers"} />
            </div>
        </div>
    );
}