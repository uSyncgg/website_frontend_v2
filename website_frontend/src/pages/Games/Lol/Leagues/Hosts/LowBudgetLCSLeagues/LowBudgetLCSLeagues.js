import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const LowBudgetLCSLeagues = () => {
    const isMobile = useCheckResize();

    const executive = isMobile ? "Executive League - Diamond AVG" : "Diamond AVG";
    const financial = isMobile ? "Financial League - Emerald AVG / Two Diamond 3s" : "Emerald AVG / Two Diamond 3s";
    const commercial = isMobile ? "Commercial League - Platinum AVG / One Emerald 3" : "Platinum AVG / One Emerald 3";
    const economy = isMobile ? "Economy League - Gold AVG / One Platinum 3" : "Gold AVG / One Platinum 3";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Low Budget LCS Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/executive"}>Executive League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/executive"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{executive}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/executive"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/financial"}>Financial League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/financial"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{financial}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/financial"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/commercial"}>Commercial League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/commercial"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{commercial}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/commercial"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/economy"}>Economy League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/economy"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{economy}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/economy"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
