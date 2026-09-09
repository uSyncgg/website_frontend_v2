import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useParams } from "react-router";
import { useLanInfo } from "hooks";
import { buildEventPath } from "utils/eventPaths";
import { LAN_GAME_SECTION_PATH } from "data/lanMarkers";
import { NotFound } from "pages/NotFound";
import '../EventInformation.css';

export const LanDetail = () => {
    const params = useParams();
    const slug = params['*'];
    const { data, loading, error } = useLanInfo(slug);

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    const sectionPath = (data && LAN_GAME_SECTION_PATH[data.game]) || '/lans/all';

    return (
        <div className="standardContainer">
            <SeoData
                title={data?.seo_title}
                description={data?.seo_description}
                canonicalPath={buildEventPath('/lans', slug)}
            />
            <HeaderImage imageUrl={data?.header_img} title={data?.verified ? undefined : data?.name} />

            {data?.verified &&
                <div className="verifiedContainer">
                    <VerifiedText />
                </div>
            }

            {loading ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading LAN info...</p>
            ) : error || !data ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Unable to load this LAN right now.</p>
            ) : (
                <div className="eventInfoCardContainer">
                    <div>
                        <EventInfoCard title={"Date/Place"} infoList={[data.date, data.location]} />
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
                <BackButton path={sectionPath} />
            </div>
        </div>
    );
}
