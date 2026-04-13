import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const U18CodLeague = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"U18 League"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date"} infoList={["Annual Spring and Fall Seasons"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["~$1,500 Prize Pools", "Highly Competitive", "Multiple Cups Throughout Season", "Live Streamed Matches"]} regionTitle={"Region/Type"} regionInfoList={["4v4 - NA"]}/>
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Must be Younger than 18", "$100 per Team", "$25 One Time Qualifier Entry", "$8 for Solo Players"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://twitter.com/U18CODLeague?s=20&t=KF_TfGh6U3dk7gMSosJncQ"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}