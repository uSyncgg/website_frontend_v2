import { EventInfoCard, HeaderImage, ExternalButton } from "components";
import '../../../../EventInformation.css';

export const MinorLeagueAcademyLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"MLE Academy"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Case of Bawls Guarana Prize", "Salary Based on MMR", "10 - 32 Teams", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["2v2 / 3v3 - All Regions"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1000 - 1250 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton inverted={true} blank={true} title={"JOIN NOW"} path={"https://mlesports.gg/"} />
            </div>
        </div>
    );
}
