import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const TeamFrontlineLeagues = () => {
    const isMobile = useCheckResize();

    const champ = isMobile ? "Champ League - 1700+ MMR" : "1700+ MMR";
    const vanguard = isMobile ? "Vanguard League - 1500 - 1699 MMR" : "1500 - 1699 MMR";
    const challenger = isMobile ? "Challenger League - 1300 - 1499 MMR" : "1300 - 1499 MMR";
    const prospect = isMobile ? "Prospect League - 1299 MMR and Lower" : "1299 MMR and Lower";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Team Frontline Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontline-leagues/champ"}>Champ League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontline-leagues/champ"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{champ}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontline-leagues/champ"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontline-leagues/vanguard"}>Vanguard League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontline-leagues/vanguard"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{vanguard}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontline-leagues/vanguard"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontline-leagues/challenger"}>Challenger League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontline-leagues/challenger"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{challenger}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontline-leagues/challenger"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontline-leagues/prospect"}>Prospect League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontline-leagues/prospect"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{prospect}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/frontline-leagues/prospect"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
