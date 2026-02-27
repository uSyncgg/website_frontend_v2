import { HeaderImage, HostBanner } from "components";

export const LolWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Wagers"} imageClass={"lolWagersPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/wagers/dropingaming"}>Drop-In Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/wagers/dropingaming"} 
                        imgUrl={"https://i.imgur.com/Onot7tG.png"} 
                        alt={"Drop-In Gaming Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/wagers/dropingaming"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/wagers/dubbz"}>Dubbz</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/wagers/dubbz"} 
                        imgUrl={"https://i.imgur.com/cgPHyyf.png"} 
                        alt={"Dubbz Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/wagers/dubbz"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
