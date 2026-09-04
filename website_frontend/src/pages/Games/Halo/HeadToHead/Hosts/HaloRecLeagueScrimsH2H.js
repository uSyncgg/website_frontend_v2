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

export const HaloRecLeagueScrimsH2H = () => {
    const { data, loading, error } = useEvent("head-to-head", "Halo", "Halo Rec League Scrims");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Rec League Scrims - Halo"}
                description="Halo Recreational XP matches. Free to play matches against other Halo rec teams to practice with your teammates."
                canonicalPath={"/games/halo/head-to-head/rec-xp"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"Halo Rec League Scrims"} />

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
                        <EventInfoCard title={"Fees"} infoList={["Free Scrim Finder / 8s Lobbies"]} footer={<ExternalButton host={data.name} blank={true} title={"Join Now"} path={data.url} />}/>
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
                <BackButton path={"/games/halo/head-to-head"} />
            </div>
        </div>
    );
}