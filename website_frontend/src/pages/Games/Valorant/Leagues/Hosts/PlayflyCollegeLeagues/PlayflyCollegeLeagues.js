import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const PlayflyCollegeLeagues = () => {
    const isMobile = useCheckResize();

    const varsity = isMobile ? "Varsity League - Platinum & Above" : "Platinum & Above";
    const openLeague = isMobile ? "Open League - Gold & Below" : "Gold & Below";

    return (
        <div className="standardContainer">
            <SeoData
                description="Playfly College Valorant leagues. Two divisions for college students - Varsity for Platinum and above and Open League for Gold and below. NA competition."
                canonicalPath={"/games/Valorant/leagues/playfly-leagues"}
            />
            <HeaderImage title={"Playfly Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/playfly-leagues/varsity"}>Varsity League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/playfly-leagues/varsity"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{varsity}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/playfly-leagues/varsity"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/playfly-leagues/open"}>Open League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/playfly-leagues/open"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{openLeague}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/playfly-leagues/open"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/Valorant/leagues"} />
                </div>
            </div>
        </div>
    );
}
