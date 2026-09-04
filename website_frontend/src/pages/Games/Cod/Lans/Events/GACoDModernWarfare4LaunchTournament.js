import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const GACoDModernWarfare4LaunchTournament = () => {
    const { data, error } = useEvent("lans", "Call of Duty", "GA:CoD Modern Warfare 4 Launch Tournament");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"GA:CoD Modern Warfare 4 Launch Tournament"}
                description={"Compete in a 3-day tournament and enjoy an exciting weekend full of competitive gameplay celebrating the launch of the new CoD: Modern Warfare 4."}
                canonicalPath={"/lans/ga-cod-modern-warfare-4-launch-tournament"}
            />

            <HeaderImage title={"GA:CoD Modern Warfare 4 Launch Tournament"} imageUrl={data?.header_img} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["Oct 30th - Nov 1st, 2026", "Columbus, OH"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "$6,500 Prize Pool Based on Entrants",
                        "4v4 CDL Variant",
                        "48 Teams MAX",
                        "Side Tournaments",
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $150 - $400 (depending on teams)"]} footer={<ExternalButton host={"GA:CoD Modern Warfare 4 Launch Tournament"} blank={true} title={"Join Now"} path={"https://www.start.gg/tournament/ga-cod-modern-warfare-4-launch-tournament/details"} />} />
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/games/call-of-duty/lans"} />
            </div>
        </div>
    );
}
