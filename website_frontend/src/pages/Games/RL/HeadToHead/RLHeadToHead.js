import { SeoData, HeaderImage, HostBanner } from "components";

export const RLHeadToHead = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Rocket League free to play scrim, XP, and head to head matches. Compete for free and climb the ladder to improve your Rocket League skills or simply to have fun."
                canonicalPath={"/games/RocketLeague/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"rlh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/head-to-head/gankster"}>Gankster GG</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/head-to-head/gankster"} 
                        imgUrl={"https://i.imgur.com/ljDANVi.png"} 
                        alt={"Gankster Head to Head"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/head-to-head/gankster"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/head-to-head/pracc"}>Pracc</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/head-to-head/pracc"} 
                        imgUrl={"https://i.imgur.com/jqe9CCc.png"} 
                        alt={"Pracc Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/head-to-head/pracc"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
