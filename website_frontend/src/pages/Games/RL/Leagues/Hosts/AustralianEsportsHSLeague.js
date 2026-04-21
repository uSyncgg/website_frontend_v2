import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const AustralianEsportsHSLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Australian Esports League high school Rocket League. Four terms per year for students enrolled at an Australian high school. 3v3 AUS competition."
                canonicalPath={"/games/RocketLeague/leagues/australian-esports-league-hs"}
            />
            <HeaderImage title={"Australian Esports League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["4 Terms Per Year"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["1 Swiss Tournament, Round Robin, and Playoffs per Term", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["3v3 - AUS"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$75 AUS per Term", "Must Be Enrolled at an Australian High School"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://ael.org.au/hs/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues"} />
            </div>
        </div>
    );
}
