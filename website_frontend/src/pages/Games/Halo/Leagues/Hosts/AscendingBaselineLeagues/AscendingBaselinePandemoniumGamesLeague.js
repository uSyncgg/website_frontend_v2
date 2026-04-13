import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const AscendingBaselinePandemoniumGamesLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Pandemonium Games League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Annual Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Prize Pool Based on Entrants & Spins", "Draft League with Upper and Lower Division", "No GA's"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["AB Subscribers: Free ($7.99/m)", "Non Subscribers: $15", "Solo Sign Ups"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.ascendingbaseline.com/panda"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/leagues/ascending-baseline"} />
            </div>
        </div>
    );
}