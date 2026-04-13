import { HeaderImage, HostBanner } from "components";

export const HaloWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Halo Wagers"} imageClass={"haloWagerPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/halo/wagers/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/wagers/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"CMG Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/wagers/cmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
