import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

const restrictionInfoList = (data) => {
    const avail = (data.availability || []).filter(s => s && s.trim());
    const items = Object.values(data.restrictions || {}).flatMap(v => Array.isArray(v) ? [v.map(s => String(s).trim()).join(', ')] : [v]);
    if (avail.length > 0) {
        items.push(avail.length === 1 && avail[0] === 'Worldwide' ? 'Available Worldwide' : `Available in: ${avail.join(', ')}`);
    }
    return items;
};

export const CKRASH2H = () => {
    const { data, loading, error } = useEvent("head-to-head", "CS2", "CKRAS");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"CKRAS - Counter-Strike"}
                description="Counter-Strike 2 CKRAS server hosting for scrims. Host your server to start scrimming matches to practice for competitions."
                canonicalPath={"/games/CS2/head-to-head/ckras"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"CKRAS"} />

            {data?.verified &&
                <div className="verifiedContainer">
                    <VerifiedText />
                </div>
            }

            {loading ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading platform info...</p>
            ) : error || !data ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Unable to load this platform right now.</p>
            ) : (
                <div className="eventInfoCardContainer">
                    <div>
                        <EventInfoCard title={"Fees"} infoList={["Voice Server: 1.50€/month", "EPS Entry: 14.99€/month", "EPS Extreme Server: 20.99€/month", "EPS Extreme Plus: 59.99€/month"]} footer={<ExternalButton host={data.name} blank={true} title={"Join Now"} path={data.url} />}/>
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
                <BackButton path={"/games/CS2/head-to-head"} />
            </div>
        </div>
    );
}