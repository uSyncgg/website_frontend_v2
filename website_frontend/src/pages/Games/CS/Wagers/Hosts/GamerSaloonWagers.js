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

export const GamerSaloonWagers = () => {
    const { data, loading, error } = useEvent("wagers", "CS2", "Gamer Saloon");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"GamerSaloon - Counter-Strike"}
                description="Counter-Strike 2 1v1 deathmatch wager matches provided by GamerSaloon. Various matches posted daily to compete head to head for cash."
                canonicalPath={"/games/CS2/wagers/gamersaloon_cs2"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"GamerSaloon"} />

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
                <BackButton path={"/games/CS2/wagers"} />
            </div>
        </div>
    );
}