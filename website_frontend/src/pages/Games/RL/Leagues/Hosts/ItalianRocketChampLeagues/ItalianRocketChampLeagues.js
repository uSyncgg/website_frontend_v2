import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const ItalianRocketChampLeagues = () => {
    const isMobile = useCheckResize();

    const a = isMobile ? "Serie A League - By Rank" : "By Rank";
    const b = isMobile ? "Serie B League - By Rank" : "By Rank";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Italian Rocket Champ Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/italian-leagues/serie-a"}>Serie A League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/italian-leagues/serie-a"} 
                        imgUrl={"https://i.imgur.com/VjsPbnv.png"} 
                        alt={"Italian Rocket Champ Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{a}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/italian-leagues/serie-a"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/italian-leagues/serie-b"}>Serie B League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/italian-leagues/serie-b"} 
                        imgUrl={"https://i.imgur.com/VjsPbnv.png"} 
                        alt={"Italian Rocket Champ Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{b}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/italian-leagues/serie-b"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
