import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData } from "components";
import '../../../EventInformation.css';

export const TheRetake2026 = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Localhost Philly is putting on a Counter Strike 2 Tournament with a $1,000 Prize Pool!"
                canonicalPath={"/lans/the-retake"}
            />

            <HeaderImage title={"The Retake"} imageClass={"eventPage"} />

            <div className="eventInfoCardContainer">
                <div>
                    <EventInfoCard title={"Date/Place"} infoList={["July 18th, 2026", "Philadelphia, PA"]} />
                </div>

                <div>
                    <EventInfoCard title={"Details"} infoList={[
                        "Up to $1,000 Prize Pool"
                        , "Competitive CS2 Event"
                        , "Swiss Stage - All Teams will play a minimum of 3 games"
                        , "All matches are Best of 1 except for the Grand Final which will be a Best of 3"
                        , "The tournament will only feature active duty competitive maps"
                    ]} />
                </div>

                <div>
                    <EventInfoCard title={"Entry Fee"} infoList={["Team Pass: $225"]} footer={<ExternalButton blank={true} title={"Join Now"} path={"https://nerdstreet.com/events/the-retake-or-cs2-tournament-powered-by-hellcase-2026-07-18?section=overview"} />}/>
                </div>
            </div>

            <div className="backButtonContainer">
                <BackButton path={"/other-lans"} />
            </div>
        </div>
    );
}
