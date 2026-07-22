import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const MinorLeaguePremierLeague = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"MLE Premier - Rocket League"}
                description="Free entry Rocket League league with a 1651 - 1900 MMR range. Premier league by Minor League Esports is perfect for you."
                canonicalPath={"/games/RocketLeague/leagues/mle-leagues/premier"}
            />
            <HeaderImage title={"MLE Premier"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Season"]} regionTitle={"Region/Type"} regionInfoList={["2v2 / 3v3 - All Regions"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Case of Bawls Guarana Prize", "Salary Based on MMR", "10 - 32 Teams", "Must Sign up Solo", "Draft Based League", "Live Streamed Matches"]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Free Entry", "1651 - 1900 MMR"]} footer={<ExternalButton host={"MLE Premier"} blank={true} title={"Join Now"} path={"https://mlesports.gg/"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/RocketLeague/leagues/mle-leagues"} />
            </div>
        </div>
    );
}
