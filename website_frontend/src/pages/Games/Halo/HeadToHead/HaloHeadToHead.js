import { SeoData, HeaderImage, HostBanner } from "components";

export const HaloHeadToHead = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Halo XP Matches. Find free to play head-to-head matches to become better overall at competitive Halo."
                canonicalPath={"/games/halo/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"codh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/halo/head-to-head/ugc-scrim"}>UGC College Halo Scrims</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/head-to-head/ugc-scrim"} 
                        imgUrl={"https://i.imgur.com/JeMuXtx.png"} 
                        alt={"UGC Head to Head"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/head-to-head/ugc-scrim"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/head-to-head/rec-xp"}>Halo Rec League Scrims</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/head-to-head/rec-xp"} 
                        imgUrl={"https://i.imgur.com/6cA46YH.png"} 
                        alt={"Halo Rec League Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/head-to-head/rec-xp"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/head-to-head/arena"}>The Arena | 8 Mans</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/head-to-head/arena"} 
                        imgUrl={"https://i.imgur.com/rBPapid.png"} 
                        alt={"Arena Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/head-to-head/arena"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/head-to-head/sauna"}>The Sauna Scrims</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/head-to-head/sauna"} 
                        imgUrl={"https://i.imgur.com/Oqt4YIJ.png"} 
                        alt={"Sauna Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/head-to-head/sauna"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
