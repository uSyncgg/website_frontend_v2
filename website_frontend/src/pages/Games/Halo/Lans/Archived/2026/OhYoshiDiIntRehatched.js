import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../../EventInformation.css';

export const OhYoshiDiIntRehatched = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Oh Yoshi Di-int Rehatched - Halo"}
                description={"A CENTRAL VALLEY REGIONAL EVENT FOR SMASH, FIGHTING GAMES, AND FOR THE FIRST TIME, HALO 3"}
                canonicalPath={"/lans/oh-yoshi-di-int-rehatched"}
            />

            <HeaderImage title={"Oh Yoshi Di-int Rehatched"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["August 9th, 2026", "Visalia, CA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$500 Prize Pool",
                        "Halo 3 Team Doubles",
                        "Other Tournaments: HDR, Tekken, Melee, Street Fighter, and More",
                        "Prize Pool Breakdown Based on Entrants"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Venue Fee: $10", "Bracket Fee: $5 (per bracket)"]} footer={<ExternalButton host={"Oh Yoshi Di-int Rehatched"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/oh-yoshi-di-int-rehatched/details"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/lans"} />
            </div>
        </div>
    );
}
