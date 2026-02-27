import { HeaderImage, HostBanner } from "components";

export const LolHeadToHead = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Head-to-Head"} imageClass={"codh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/head-to-head/gankster"}>Gankster GG</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/head-to-head/gankster"} 
                        imgUrl={"https://i.imgur.com/ljDANVi.png"} 
                        alt={"Gankster Head to Head"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/head-to-head/gankster"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/head-to-head/esport-scrim"}>Esport Scrim</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/head-to-head/esport-scrim"} 
                        imgUrl={"https://i.imgur.com/irkzmva.png"} 
                        alt={"Esport Scrim Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/head-to-head/esport-scrim"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/head-to-head/pracc"}>Pracc</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/head-to-head/pracc"} 
                        imgUrl={"https://i.imgur.com/XERVRrh.png"} 
                        alt={"Gankster Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/head-to-head/pracc"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
