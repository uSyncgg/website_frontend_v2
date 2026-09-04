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

export const OneVOneMeWagers = () => {
    const { data, loading, error } = useEvent("wagers", "Warzone", "1v1 Me (App)");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"1v1Me - Warzone"}
                description="1v1 Me Warzone wager app. 1v1 kill race matches with 0% match fee and staking on tournaments. Available in USA, CA, IE, UK, FR, MX, and DE for players 18+."
                canonicalPath={"/games/warzone/wagers/1v1me"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"1v1Me"} />

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