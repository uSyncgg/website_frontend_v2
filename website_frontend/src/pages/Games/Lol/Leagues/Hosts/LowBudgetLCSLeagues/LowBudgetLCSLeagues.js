import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const LowBudgetLCSLeagues = () => {
    const isMobile = useCheckResize();

    const executive = isMobile ? "Executive League - Diamond AVG" : "Diamond AVG";
    const financial = isMobile ? "Financial League - Emerald AVG / Two Diamond 3s" : "Emerald AVG / Two Diamond 3s";
    const commercial = isMobile ? "Commercial League - Platinum AVG / One Emerald 3" : "Platinum AVG / One Emerald 3";
    const economy = isMobile ? "Economy League - Gold AVG / One Platinum 3" : "Gold AVG / One Platinum 3";
    const ceo = isMobile ? "CEO League - Masters 375 LP Cap": "Masters 375 LP Cap";
    const lta = isMobile ? "LTA League - Uncapped" : "Uncapped";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Low Budget LCS Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
               <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/lta"}>LTA League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/lta"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{lta}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/lta"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues/ceo"}>CEO League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues/ceo"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{ceo}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/low-budget-leagues/ceo"} />
                </HostBanner>

                <div className="hrEvents" />

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

                <div className="backButtonContainer">
                    <BackButton path={"/games/LoL/leagues"} />
                </div>
            </div>
        </div>
    );
}
