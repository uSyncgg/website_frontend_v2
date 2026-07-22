import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const DreamCon2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                title={"Dream Con 2026 - Convention"}
                description="Dream Con Championship Series 2026, $10 entry per title, Maximum of Four titles per attendee, All fighting games are Bo3 until otherwise noted in the rule sets, Sports titles are all Bo1."
                canonicalPath={"/lans/dreamcon2026"}
            />

            <HeaderImage title={"Dream Con 2026"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 10 - 12th, 2026", "Houston, TX"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Rocket League, Marvel Rivals, Madden, and more",
                        "4 titles per person",
                        "Sports Titles are BO1"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["$10 entry per title"]} footer={<ExternalButton host={"Dream Con 2026"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/dream-con-championship-series-2026/details"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
