import { SeoData, HeaderImage, HostBanner } from "components";

export const ValorantHeadToHead = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find the best Valorant scrim and head-to-head platforms. Compare Gankster GG, Esport Scrim, Collegiate Valorant Hub, and Pracc for practice matches."
                canonicalPath={"/games/Valorant/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"rlh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/head-to-head/gankster"}>Gankster GG</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/head-to-head/gankster"} 
                        imgUrl={"https://i.imgur.com/ljDANVi.png"} 
                        alt={"Gankster GG"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/head-to-head/gankster"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/head-to-head/esport-scrim"}>Esport Scrim</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/head-to-head/esport-scrim"} 
                        imgUrl={"https://i.imgur.com/irkzmva.png"} 
                        alt={"Esport Scrim"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/head-to-head/esport-scrim"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/head-to-head/college-hub"}>Collegiate Valorant Esports Hub</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/head-to-head/college-hub"} 
                        imgUrl={"https://i.imgur.com/InYxRbE.png"} 
                        alt={"Collegiate Valorant Esports Hub"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/head-to-head/college-hub"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/head-to-head/pracc"}>Pracc</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/head-to-head/pracc"} 
                        imgUrl={"https://i.imgur.com/jqe9CCc.png"} 
                        alt={"Pracc"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/head-to-head/pracc"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
