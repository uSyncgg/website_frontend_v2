import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const AegisLeagues = () => {
    const isMobile = useCheckResize();

    const challenger = isMobile ? "Challenger League - Uncapped" : "Uncapped";
    const marauder = isMobile ? "Marauder League - Master 600 LP Cap" : "Master 600 LP Cap";
    const defenders = isMobile ? "Defenders League - 100 LP Cap" : "100 LP Cap";
    const executioners = isMobile ? "Executioners League - Diamond 4 Cap" : "Diamond 4 Cap";
    const vanguard = isMobile ? "Vanguard League - 1000 LP Cap" : "1000 LP Cap";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"aegisLOLLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/challenger"}>Challenger League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/challenger"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{challenger}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/challenger"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/vanguard"}>Vanguard League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/vanguard"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{vanguard}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/vanguard"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/marauder"}>Marauder League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/marauder"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{marauder}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/marauder"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/defenders"}>Defenders League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/defenders"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{defenders}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/defenders"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/executioners"}>Executioners League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/executioners"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{executioners}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/executioners"} />
                </HostBanner>               

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/LoL/leagues"} />
                </div>
            </div>
        </div>
    );
}
