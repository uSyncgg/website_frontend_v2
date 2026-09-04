import { SeoData, EventInfoCard, HeaderImage, ExternalButton, BackButton, VerifiedText } from "components";
import { useEvent } from "hooks";
import '../../../../EventInformation.css';
import { NotFound } from "pages/NotFound";

export const PlayflyOpenLeague = () => {
    const { data, loading, error } = useEvent("leagues", "Valorant", "Playfly Open League");

    if (error?.response?.status === 404) {
        return <NotFound />;
    }

    return (
        <div className="standardContainer">
            <SeoData
                title={"Playfly Open - Valorant"}
                description="Playfly College Valorant Open League. Free to enter for Gold and lower college students. Part of $280k prize pool across all titles. Spring and fall seasons."
                canonicalPath={"/games/Valorant/leagues/playfly-leagues/open"}
            />
            <HeaderImage imageUrl={data?.header_img} title={"Playfly Open"} />

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
                <BackButton path={"/games/Valorant/leagues/playfly-leagues"} />
            </div>
        </div>
    );
}
