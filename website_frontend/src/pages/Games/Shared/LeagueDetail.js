import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText, HostBanner } from "components";
import { useParams } from "react-router";
import { useLeagueInfo } from "hooks";
import { buildEventPath } from "utils/eventPaths";
import { NotFound } from "pages/NotFound";
import '../EventInformation.css';

export const LeagueDetail = ({ game, sectionPath }) => {
    const params = useParams();
    const slug = params['*'];
    const { data, loading, error } = useLeagueInfo(game, slug);

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    const parentSegments = slug.split('/').slice(0, -1);
    const backPath = parentSegments.length > 0 ? buildEventPath(sectionPath, parentSegments.join('/')) : sectionPath;
    const isParent = Array.isArray(data?.leagues);

    return (
        <div className="standardContainer">
            <SeoData
                title={data?.seo_title}
                description={data?.seo_description}
                canonicalPath={buildEventPath(sectionPath, slug)}
            />
            <HeaderImage imageUrl={data?.header_img} title={data?.verified ? undefined : data?.name} />

            {data?.verified &&
                <div className="verifiedContainer">
                    <VerifiedText />
                </div>
            }

            {loading ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading league info...</p>
            ) : error || !data ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Unable to load this league right now.</p>
            ) : isParent ? (
                <div className="eventBannerContainer">
                    {data.leagues
                        .slice()
                        .sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0))
                        .map(child => {
                            const childPath = buildEventPath(sectionPath, child.path);
                            return (
                                <HostBanner key={childPath} path={childPath}>
                                    <HostBanner.Title path={childPath} verified={child.verified}>{child.name}</HostBanner.Title>
                                    <HostBanner.Image
                                        path={childPath}
                                        imgUrl={child.banner_img}
                                        alt={child.name}
                                        verified={child.verified}
                                    />
                                    <HostBanner.Region>{`${child.team_size} - ${child.region}`}</HostBanner.Region>
                                    <HostBanner.Button title={"More Info"} path={childPath} />
                                </HostBanner>
                            );
                        })}
                </div>
            ) : (
                <div className="eventInfoCardContainer">
                    <div>
                        <EventInfoCard
                            title={"Date"}
                            infoList={[data.seasonality]}
                            regionTitle={"Region/Type"}
                            regionInfoList={[`${data.team_size} - ${data.region}`]}
                        />
                    </div>

                    <div>
                        <EventInfoCard title={"Details"} infoList={data.details} />
                    </div>

                    <div>
                        <EventInfoCard title={"Entry Fee"} infoList={data.fee_details} footer={<ExternalButton host={data.name} blank={true} title={"Join Now"} path={data.url} />}/>
                    </div>
                </div>
            )}

            <div className="backButtonContainer">
                <BackButton path={backPath} />
            </div>
        </div>
    );
}
