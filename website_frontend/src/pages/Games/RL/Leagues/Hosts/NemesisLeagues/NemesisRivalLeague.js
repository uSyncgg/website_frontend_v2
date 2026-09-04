import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const NemesisRivalLeague = () => {
    const { data, loading, error } = useEvent("leagues", "Rocket League", "Nemesis Leagues - Rival League");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Nemesis Rival - Rocket League"}
                description="North America's 1612 - 1779 MMR Rocket League league. Rival league is for players looking to be the best at their craft and improve in Rocket League."
                canonicalPath={"/games/RocketLeague/leagues/nemesis-leagues/rival"}
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
                <BackButton path={"/games/RocketLeague/leagues/nemesis-leagues"} />
            </div>
        </div>
    );
}
