import { SeoData, HeaderImage, HostBanner } from "components";

export const WzWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find the best Warzone wager platforms. Compare Checkmate Gaming, 1v1 Me, Gamer Saloon, and Ewagers to wager on your Call of Duty Warzone skills."
                canonicalPath={"/games/warzone/wagers"}
            />
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
                    <HostBanner.Title path={"/games/warzone/wagers/1v1me"}>1v1 Me (App)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/wagers/1v1me"} 
                        imgUrl={"https://i.imgur.com/BFNJpgg.png"} 
                        alt={"1v1 Me"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/wagers/1v1me"} />
                </HostBanner>

                <div className="hrEvents" />

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
