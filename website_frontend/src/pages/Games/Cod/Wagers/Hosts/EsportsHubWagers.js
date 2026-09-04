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

export const EsportsHubWagers = () => {
    const { data, loading, error } = useEvent("wagers", "Call of Duty", "The Esports Hub");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"The Esports Hub - Call of Duty"}
                description="Throwback Call of Duty wagers for old titles like MWR, Bo3, Bo4, Cold War, and more. Play classic cod for money."
                canonicalPath={"/games/call-of-duty/wagers/the-esports-hub"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"The Esports Hub"} />

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
                <BackButton path={"/games/call-of-duty/wagers"} />
            </div>
        </div>
    );
}