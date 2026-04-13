import { HeaderImage, HostBanner } from "components";

export const CSWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Wagers"} imageClass={"cs2WagersPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/wagers/showdowngaming_cs2"}>Showdown Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/wagers/showdowngaming_cs2"} 
                        imgUrl={"https://i.imgur.com/1UTQLkh.png"} 
                        alt={"Showdown Gaming Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/wagers/showdowngaming_cs2"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/wagers/gamersaloon_cs2"}>Gamer Saloon</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/wagers/gamersaloon_cs2"} 
                        imgUrl={"https://i.imgur.com/MFqfurA.png"} 
                        alt={"Gamer Saloon Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/wagers/gamersaloon_cs2"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
