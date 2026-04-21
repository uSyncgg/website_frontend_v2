import { SeoData, HeaderImage, HostBanner } from "components";

export const LolWagers = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Wagers for League of Legends. Play cash matches against other players or other teams and make money playing league."
                canonicalPath={"/games/LoL/wagers"}
            />
            <HeaderImage title={"Wagers"} imageClass={"lolWagerPage"} />

            <div className="eventBannerContainer">
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
