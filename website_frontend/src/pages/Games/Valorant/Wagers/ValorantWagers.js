import { SeoData, HeaderImage, HostBanner } from "components";

export const ValorantWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Valorant wager platforms. Compare Ewagers for Valorant money matches. Wager on your Valorant skills against other players worldwide."
                canonicalPath={"/games/Valorant/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"codh2hPage"} />

            <div className="eventBannerContainer">
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
