import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MinorLeagueMasterLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket League Master league presented by MLE. All regions invited in this 1451 - 1650 MMR rank based league. Compete in those with similar skills."
                canonicalPath={"/games/RocketLeague/leagues/mle-leagues/master"}
            />
            <HeaderImage title={"MLE Master"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Season"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Case of Bawls Guarana Prize", "Salary Based on MMR", "10 - 32 Teams", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["2v2 / 3v3 - All Regions"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1451 - 1650 MMR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://mlesports.gg/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/mle-leagues"} />
            </div>
        </div>
    );
}
