import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const AegisLeagues = () => {
    const isMobile = useCheckResize();

    const champs = isMobile ? "Champions League - Uncapped" : "Uncapped";
    const marauder = isMobile ? "Marauder League - Master 600 LP Cap" : "Master 600 LP Cap";
    const defenders = isMobile ? "Defenders League - 100 LP Cap" : "100 LP Cap";
    const executioners = isMobile ? "Executioners League - Diamond 4 Cap" : "Diamond 4 Cap";
    const protectors = isMobile ? "Protectors League - Emerald 4 Cap" : "Emerald 4 Cap";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"aegisLOLLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/champ"}>Champions League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/champ"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{champs}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/champ"} />
                </HostBanner>

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

                <div className="hrEvents" />

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

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues/protectors"}>Protectors League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues/protectors"} 
                        imgUrl={"https://i.imgur.com/iy67hgo.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{protectors}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/aegis-leagues/protectors"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
