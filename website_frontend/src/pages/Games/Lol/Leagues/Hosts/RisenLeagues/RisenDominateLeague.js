import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const RisenDominateLeague = () => {
    const { data, loading, error } = useEvent("leagues", "League of Legends", "Risen Dominate League");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Risen Dominate League - League of Legends"}
                description="Risen Dominate is a League of Legends Diamond 1 cap league. Does your team have what it takes to take the winning trophy?"
                canonicalPath={"/games/LoL/leagues/risen-leagues/dominate"}
            />
            <HeaderImage imageUrl={data?.header_img} />

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
                <BackButton path={"/games/LoL/leagues/risen-leagues"} />
            </div>
        </div>
    );
}
