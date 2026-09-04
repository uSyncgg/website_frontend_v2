import { EventInfoCard, HeaderImage, ExternalButton, BackButton, SeoData, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const FrontierAdeptLeague = () => {
    const { data, loading, error } = useEvent("leagues", "Rocket League", "Frontier Doubles Leagues - Adept League");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Frontier Adept League - Rocket League"}
                description={"Frontier Double Rocket League league. Salary cap of 36. Sign up for this 2v2 North American league today on uSync."}
                canonicalPath={"/games/RocketLeague/leagues/frontier-doubles-leagues/adept"}
            />

            <HeaderImage imageUrl={data?.header_img} title={"Adept League"} />

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
                <BackButton path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
            </div>
        </div>
    );
}
