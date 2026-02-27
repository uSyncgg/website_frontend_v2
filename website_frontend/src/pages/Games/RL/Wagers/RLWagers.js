import { HeaderImage, HostBanner } from "components";

export const RLWagers = () => {
    return (
        <div className="standardContainer"> 
            <HeaderImage title={"Wagers"} imageClass={"lanPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/wagers/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"Chckmate Gaming Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/cmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/wagers/dropingaming"}>Drop-In Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/dropingaming"} 
                        imgUrl={"https://i.imgur.com/Onot7tG.png"} 
                        alt={"Drop-In Gaming Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/dropingaming"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/wagers/gamersaloon"}>Gamer Saloon</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/gamersaloon"} 
                        imgUrl={"https://i.imgur.com/M8da8S6.png"} 
                        alt={"Gamer Saloon Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/gamersaloon"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/wagers/dubbz"}>Dubbz</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/dubbz"} 
                        imgUrl={"https://i.imgur.com/cgPHyyf.png"} 
                        alt={"Dubbz Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/dubb"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
