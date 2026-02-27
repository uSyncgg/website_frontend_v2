import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const HyperfibreLeagues = () => {
    const isMobile = useCheckResize();

    const elite = isMobile ? "Elite Division - Competitive" : "Competitive";
    const social = isMobile ? "Social Division - Casual" : "Casual";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Hyperfibre Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/hyperfibre-leagues/elite"}>Elite Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/hyperfibre-leagues/elite"} 
                        imgUrl={"https://i.imgur.com/Cx4N8HW.png"} 
                        alt={"Hyperfibre League"}
                        verified={false}
                    />
                    <HostBanner.Region>{elite}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/hyperfibre-leagues/elite"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/hyperfibre-leagues/social"}>Social Division</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/hyperfibre-leagues/social"} 
                        imgUrl={"https://i.imgur.com/Cx4N8HW.png"} 
                        alt={"Hyperfibre League"}
                        verified={false}
                    />
                    <HostBanner.Region>{social}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/hyperfibre-leagues/social"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
