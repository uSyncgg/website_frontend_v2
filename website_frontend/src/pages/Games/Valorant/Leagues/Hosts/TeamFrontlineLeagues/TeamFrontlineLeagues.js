import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const TeamFrontlineLeagues = () => {
    const isMobile = useCheckResize();

    const prime = isMobile ? "Prime League - Platinum & Above" : "Platinum & Above";
    const academy = isMobile ? "Academy League - Gold & Below" : "Gold & Below"

    return (
        <div className="standardContainer">
            <HeaderImage title={"Team Frontline Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/frontline-leagues/prime"}>Prime League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/frontline-leagues/prime"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{prime}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/frontline-leagues/prime"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/frontline-leagues/academy"}>Academy League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/frontline-leagues/academy"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{academy}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/frontline-leagues/academy"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
