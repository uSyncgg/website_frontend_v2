import { HeaderImage, HostBanner } from "components";

export const ValorantWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Wagers"} imageClass={"codh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/wagers/dropingaming"}>Drop-In Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/wagers/dropingaming"} 
                        imgUrl={"https://i.imgur.com/Onot7tG.png"} 
                        alt={"Drop-In Gaming"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/wagers/dropingaming"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
