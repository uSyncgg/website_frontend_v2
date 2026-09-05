import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useLeagueEvents, useLeagueChildren } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../../../EventBanners.css';

const GAME = "Call of Duty";
const PARENT_NAME = "College XP";
const ROUTE_PREFIX = "/games/call-of-duty/leagues";

export const CollegeXPLeagues = () => {
    const { data: hosts } = useLeagueEvents(GAME);
    const { data: children, loading, error } = useLeagueChildren(GAME, PARENT_NAME);

    const parent = (hosts || []).find(h => h.name === PARENT_NAME);
    const headerTitle = parent?.verified ? undefined : (parent?.name || "College XP Leagues");

    return (
        <div className="standardContainer">
            <SeoData
                title={"College XP Leagues - Call of Duty"}
                description={"College XP league is for colleges in North America. Prove your college is the best in the country."}
                canonicalPath={"/games/call-of-duty/leagues/cxp-leagues"}
            />
            <HeaderImage title={headerTitle} imageClass={"nonVerifiedPage"} imageUrl={parent?.header_img} />

            <div className="eventBannerContainer">
                {loading ? (
                    <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Loading leagues...</h2>
                ) : error ? (
                    <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>Unable to load leagues right now.</h2>
                ) : (children || []).length === 0 ? (
                    <h2 className="eventSeparationTitle" style={{ fontSize: "2rem" }}>No leagues available right now.</h2>
                ) : (
                    (children || [])
                        .slice()
                        .sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0))
                        .map(child => {
                            const path = buildEventPath(ROUTE_PREFIX, child.path);

                            return (
                                <HostBanner key={path} path={path}>
                                    <HostBanner.Title path={path} verified={child.verified}>{child.name}</HostBanner.Title>
                                    <HostBanner.Image
                                        path={path}
                                        imgUrl={child.banner_img}
                                        alt={child.name}
                                        verified={child.verified}
                                    />
                                    <HostBanner.Region>{`${child.team_size} - ${child.region}`}</HostBanner.Region>
                                    <HostBanner.Button title={"More Info"} path={path} />
                                </HostBanner>
                            );
                        })
                )}

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
