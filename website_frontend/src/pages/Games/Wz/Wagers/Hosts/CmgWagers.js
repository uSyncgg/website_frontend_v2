import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

const restrictionInfoList = (data) => [
    ...Object.values(data.restrictions || {}).flatMap(v => Array.isArray(v) ? [v.map(s => String(s).trim()).join(', ')] : [v]),
    (data.availability?.length === 1 && data.availability[0] === 'Worldwide')
        ? 'Available Worldwide'
        : `Available in: ${(data.availability || []).join(', ')}`,
];

export const CmgWagers = () => {
    const { data, loading, error } = useEvent("wagers", "Warzone", "Checkmate Gaming");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Checkmate Gaming - Warzone"}
                description="Checkmate Gaming Warzone wagers. A verified platform with 24/7 live support. Large number of daily matches worldwide for Warzone wager players 18 and over."
                canonicalPath={"/games/warzone/wagers/cmg"}
            />
            <HeaderImage imageUrl={data?.header_img} />

            {data?.verified &&
                <div className="verifiedContainer">
                    <VerifiedText />
                </div>
            }

            {loading ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading wager info...</p>
            ) : error || !data ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Unable to load this wager platform right now.</p>
            ) : (
                <div className="eventInfoCardContainer">
                    <div>
                        <EventInfoCard title={"Fees"} infoList={data.fee_details} footer={<ExternalButton host={data.name} blank={true} title={"Join Now"} path={data.url} />}/>
                    </div>

                    <div>
                        <EventInfoCard title={"Details"} infoList={data.details} />
                    </div>

                    <div>
                        <EventInfoCard title={"Restrictions"} infoList={restrictionInfoList(data)} />
                    </div>
                </div>
            )}

            <div className="backButtonContainer">
                <BackButton path={"/games/warzone/wagers"} />
            </div>
        </div>
    );
}