import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useLeagueEvents, useLeagueChildren } from "hooks";
import { buildEventPath } from 'utils/eventPaths';
import '../../../../EventBanners.css';

const GAME = "Rocket League";
const PARENT_NAME = "RLPC";
const ROUTE_PREFIX = "/games/RocketLeague/leagues";

export const RLPCLeagues = () => {
    const { data: hosts } = useLeagueEvents(GAME);
    const { data: children, loading, error } = useLeagueChildren(GAME, PARENT_NAME);

    const parent = (hosts || []).find(h => h.name === PARENT_NAME);
    const headerTitle = parent?.verified ? undefined : (parent?.name || undefined);

    return (
        <div className="standardContainer">
            <SeoData
                title={"RLPC Leagues - Rocket League"}
                description={"Rocket League Pro Circuit - RLPC. A verified Rocket League league with four divisions for players across all skill levels. Sign up today."}
                canonicalPath={"/games/RocketLeague/leagues/rlpc-leagues"}
            />
            <HeaderImage title={headerTitle} imageClass={"rlpcRLLeagues"} imageUrl={parent?.header_img} />

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
                    <BackButton path={"/games/RocketLeague/leagues"} />
                </div>
            </div>
        </div>
    );
}
