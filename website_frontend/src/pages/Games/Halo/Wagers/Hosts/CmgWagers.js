import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const CmgWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Checkmate Gaming Halo Infinite wagers. Play Halo for cash against other players and climb the ranked ladder."
                canonicalPath={"/games/halo/wagers/cmg"}
            />
            <HeaderImage title={"Checkmate Gaming"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["Regular Member: 7.5%", "Elite Member: 3.75%", "Live Support Fee: 2.5% - 5%", "Deposit/Withdraw Fees though Paypal"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["24/7 Live Support", "Consistent Rule Updates", "RARELY Any Matches Posted"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["18+", "Available Worldwide", "US State Restrictions: AZ, IA, MS, MT, NV, and SD"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://www.checkmategaming.com/wager/cross-platform/halo-infinite#all"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/halo/wagers"} />
            </div>
        </div>
    );
}