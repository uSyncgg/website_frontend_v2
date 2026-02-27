import { HeaderImage, HostBanner } from "components";

export const CSHeadToHead = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Head-to-Head"} imageClass={"cs2h2hHeader"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/head-to-head/faceit"}>FACEIT</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/head-to-head/faceit"} 
                        imgUrl={"https://i.imgur.com/4GwagUk.png"} 
                        alt={"Faceit Head to Head"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/head-to-head/faceit"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/head-to-head/pracc"}>Pracc</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/head-to-head/pracc"} 
                        imgUrl={"https://i.imgur.com/XERVRrh.png"} 
                        alt={"Pracc Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/head-to-head/pracc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/head-to-head/esport-scrim"}>Esport Scrim</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/head-to-head/esport-scrim"} 
                        imgUrl={"https://i.imgur.com/KIPClg9.png"} 
                        alt={"Esport Scrim Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/head-to-head/esport-scrim"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/head-to-head/ckras"}>CKRAS</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/head-to-head/ckras"} 
                        imgUrl={"https://i.imgur.com/ry9oAAw.png"} 
                        alt={"CKRAS Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/head-to-head/ckras"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div> 
    );
}
