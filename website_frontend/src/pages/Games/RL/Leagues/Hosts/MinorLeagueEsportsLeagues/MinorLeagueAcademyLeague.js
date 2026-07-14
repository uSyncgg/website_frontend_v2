import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MinorLeagueAcademyLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Minor League Esports Academy league for Rocket League players. 2v2 or 3v3 free entry league with a MMR range of 1000 - 1250."
                canonicalPath={"/games/RocketLeague/leagues/mle-leagues/academy"}
            />
            <HeaderImage title={"MLE Academy"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Season"]} regionTitle={"Region/Type"} regionInfoList={["2v2 / 3v3 - All Regions"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Case of Bawls Guarana Prize", "Salary Based on MMR", "10 - 32 Teams", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1000 - 1250 MMR"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://mlesports.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/mle-leagues"} />
            </div>
        </div>
    );
}
