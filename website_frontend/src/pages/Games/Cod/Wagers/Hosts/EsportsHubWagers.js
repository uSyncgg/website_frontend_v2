import { EventInfoCard, HeaderImage, ExternalButton, BackButton } from "components";
import '../../../EventInformation.css';

export const EsportsHubWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"The Esports Hub"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Fees"} infoList={["10% Match Fee", "Varying Deposit / Withdrawal Fee"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={["MWR, BO3, BO4, Cold War, and MWII Matches", "Various Rulesets to Choose", "Live Website Support", "Medium Sized User Base", "Available Worldwide, Select Region When Posting"]} />
                </div>

                <div>
                    <EventInfoCard title={"Restrictions"} infoList={["13+", "Must Be Legal Resident From: BE, BG, CZ, DK, DE, EE, IE, EL, ES, FR, IT, LV, LT, LU, HU, MT, NL, HE, PL, PT, RO, SI, SK, FI, SE, UK, IS, LI, NO, CH, GB, AT, TR, HR, RU, or GR"]} />
                </div>
            </div>

            <div className="eventButtonContainer">
                <ExternalButton blank={true} title={"Join Now"} path={"https://theesportshub.com/"} />
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/wagers"} />
            </div>
        </div>
    );
}