import { SeoData, HeaderImage, HostBanner } from "components";

export const RLWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find the best Rocket League wager sites. Compare platforms like Checkmate Gaming, Gamer Saloon, and Ewagers to wager on your Rocket League skills."
                canonicalPath={"/games/RocketLeague/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"lansPage"} />

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
                    <HostBanner.Title path={"/games/RocketLeague/wagers/gamersaloon"}>Gamer Saloon</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/wagers/gamersaloon"} 
                        imgUrl={"https://i.imgur.com/M8da8S6.png"} 
                        alt={"Gamer Saloon Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/wagers/gamersaloon"} />
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
