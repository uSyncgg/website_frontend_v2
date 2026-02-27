import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const BlueOtterLeagues = () => {
    const isMobile = useCheckResize();

    const masters = isMobile ? "Masters League - 600LP+" : "600LP+";
    const diamond = isMobile ? "Diamond League - Diamond 1 Cap / One Masters" : "Diamond 1 Cap / One Masters";
    const emerald = isMobile ? "Emerald League - Emerald 1 Cap / One Diamond 4" : "Emerald 1 Cap / One Diamond 4";
    const plat = isMobile ? "Platinum League - Platinum 1 Cap / One Emerald 4" : "Platinum 1 Cap / One Emerald 4";
    const gold = isMobile ? "Gold League - Gold 1 Cap / One Platinum 4" : "Gold 1 Cap / One Platinum 4";
    const draft = isMobile ? "Draft League - Platinum 4 - Diamond 1" : "Platinum 4 - Diamond 1";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Blue Otter Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/masters"}>Masters League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/masters"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{masters}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/masters"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/diamond"}>Diamond League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/diamond"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{diamond}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/diamond"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/emerald"}>Emerald League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/emerald"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{emerald}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/emerald"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/plat"}>Platinum League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/plat"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{plat}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/plat"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/gold"}>Gold League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/gold"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{gold}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/gold"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues/draft"}>Draft League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues/draft"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{draft}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/blue-otter-leagues/draft"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
