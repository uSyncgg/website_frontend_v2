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
                    <HostBanner.Title path={"/games/halo/wagers/oneup"}>One Up (App)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/wagers/oneup"} 
                        imgUrl={"https://i.imgur.com/wkSz5Le.png"} 
                        alt={"One Up Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/wagers/oneup"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/wagers/esport-wagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/wagers/esport-wagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/halo/wagers/esport-wagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
