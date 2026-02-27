import { HeaderImage, HostBanner } from "components";

export const WzWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Wagers"} imageClass={"lolWagerPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"CMG"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/cmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/oneup"}>One Up (App)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/oneup"} 
                        imgUrl={"https://i.imgur.com/wkSz5Le.png"} 
                        alt={"One Up"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/oneup"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/1v1me"}>1v1 Me (App)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/1v1me"} 
                        imgUrl={"https://i.imgur.com/BFNJpgg.png"} 
                        alt={"1v1 Me"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/1v1me"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/gamersaloon"}>GamerSaloon</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/gamersaloon"} 
                        imgUrl={"https://i.imgur.com/M8da8S6.png"} 
                        alt={"GamerSaloon"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/gamersaloon"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/dropingaming"}>Drop-In Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/dropingaming"} 
                        imgUrl={"https://i.imgur.com/Onot7tG.png"} 
                        alt={"Drop-In Gaming"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/dropingaming"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/dubbz"}>Dubbz</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/dubbz"} 
                        imgUrl={"https://i.imgur.com/cgPHyyf.png"} 
                        alt={"Dubbz"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/dubbz"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
