import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const CorporateCodLeague = () => {
    const { data, loading, error } = useEvent("leagues", "Call of Duty", "Corporate COD League");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Corporate League - Call of Duty"}
                description={"Call of Duty league for the corporate world. After your 9-5 compete for charity against blue-chip companies."}
                canonicalPath={"/games/call-of-duty/leagues/corporate-cod-league"}
            />

            <HeaderImage imageUrl={data?.header_img} title={"Corporate COD League"} />

            {data?.verified &&
                <div className="verifiedContainer">
                    <VerifiedText />
                </div>
            }

            {loading ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Loading league info...</p>
            ) : error || !data ? (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2rem 0' }}>Unable to load this league right now.</p>
            ) : (
                <div className="eventInfoCardContainer">
                    <div>
                        <EventInfoCard title={"Date"} infoList={[data.seasonality]} regionTitle={"Region/Type"} regionInfoList={[`${data.team_size} - ${data.region}`]} />
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
                <BackButton path={"/games/call-of-duty/leagues"} />
            </div>
        </div>
    );
}