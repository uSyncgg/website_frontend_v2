import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const RisenLeagues = () => {
    const isMobile = useCheckResize();

    const champs = isMobile ? "Champions League - Must Qualify" : "Must Qualify";
    const dominate = isMobile ? "Dominate League - Diamond 1 Cap" : "Diamond 1 Cap";
    const unstoppable = isMobile ? "Unstoppable League - Emerald 1 Cap" : "Emerald 1 Cap";
    const rampage = isMobile ? "Rampage League - Emerald 4 Cap" : "Emerald 4 Cap";
    const draft = isMobile ? "Draft League - Account Level 100" : "Account Level 100";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"risenLOLLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues/champions"}>Champions League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues/champions"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{champs}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/risen-leagues/champions"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues/dominate"}>Dominate League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues/dominate"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{dominate}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/risen-leagues/dominate"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues/unstoppable"}>Unstoppable League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues/unstoppable"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{unstoppable}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/risen-leagues/unstoppable"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues/rampage"}>Rampage League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues/rampage"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{rampage}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/risen-leagues/rampage"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues/draft"}>Draft League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues/draft"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{draft}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/risen-leagues/draft"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
