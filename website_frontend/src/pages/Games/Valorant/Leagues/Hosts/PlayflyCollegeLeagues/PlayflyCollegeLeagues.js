import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useLeagueEvents, useLeagueChildren } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../../../EventBanners.css';

const GAME = "Valorant";
const PARENT_NAME = "Playfly College";
const ROUTE_PREFIX = "/games/Valorant/leagues";

export const PlayflyCollegeLeagues = () => {
    const { data: hosts } = useLeagueEvents(GAME);
    const { data: children, loading, error } = useLeagueChildren(GAME, PARENT_NAME);

    const parent = (hosts || []).find(h => h.name === PARENT_NAME);
    const headerTitle = parent?.verified ? undefined : (parent?.name || "Playfly Leagues");

    return (
        <div className="standardContainer">
            <SeoData
                title={"Playfly Leagues - Valorant"}
                description={"Playfly College Valorant leagues. Two divisions for college students - Varsity for Platinum and above and Open League for Gold and below. NA competition."}
                canonicalPath={"/games/Valorant/leagues/playfly-leagues"}
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
                    <BackButton path={"/games/Valorant/leagues"} />
                </div>
            </div>
        </div>
    );
}
