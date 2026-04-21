import { SeoData, HeaderImage, HostBanner } from "components";

export const WzHeadToHead = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find Warzone head-to-head match platforms. Compare Checkmate Gaming for competitive Warzone matches and ladders with prizes based on your record."
                canonicalPath={"/games/warzone/head-to-head"}
            />
            <HeaderImage title={"Head-to-Head"} imageClass={"lolLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/head-to-head/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/head-to-head/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"CMG"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/head-to-head/cmg"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
