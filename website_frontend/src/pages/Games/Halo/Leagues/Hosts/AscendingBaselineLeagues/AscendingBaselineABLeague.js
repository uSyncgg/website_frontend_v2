import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../../EventInformation.css';

export const AscendingBaselineABLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"AB League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Multiple Annual Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["Division 1: $80 Prize Pool for first and second (60/20 split)", "Division 2: $60 Prize Pool for first and second (50/10 split)", "Division 3: $60 Prize Pool for first and second (50/10 split)", "Division 4: $50 Prize Pool for first and second (40/10 split)", "Divisions Based on CSR Caps", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["AB Subscribers: Free ($7.99/m)", "Non Subscribers: $40/team", "Solo/Duo/Trio or Team Sign Ups"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.ascendingbaseline.com/abl-halo"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/leagues/ascending-baseline"} />
            </div>
        </div>
    );
}