import { HeaderImage, HostBanner } from "components";

export const WzHeadToHead = () => {
    return (
        <div className="standardContainer">
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
