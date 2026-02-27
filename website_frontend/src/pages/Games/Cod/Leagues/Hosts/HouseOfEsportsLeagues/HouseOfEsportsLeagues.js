import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const HouseOfEsportsLeagues = () => {
    const isMobile = useCheckResize();

    const amateur = isMobile ? "Amateurs League - All Regions" : "All Regions";
    const challengers = isMobile ? "Challengers League - All Regions" : "All Regions";

    return (
        <div className="standardContainer">
            <HeaderImage title={"House of Esports Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-amateur"}>Amateurs League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-amateur"} 
                        imgUrl={"https://i.imgur.com/47wczZC.png"} 
                        alt={"House of Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{amateur}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-amateur"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-challengers"}>Challengers League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-challengers"} 
                        imgUrl={"https://i.imgur.com/47wczZC.png"} 
                        alt={"House of Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>{challengers}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/House-of-esports-leagues/hoe-challengers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
