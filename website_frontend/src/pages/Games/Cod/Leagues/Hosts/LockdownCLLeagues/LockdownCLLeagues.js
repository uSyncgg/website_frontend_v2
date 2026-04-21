import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const LockdownCLLeagues = () => {
    const isMobile = useCheckResize();

    const legends = isMobile ? "Legends League - Crim 3 & Above" : "Crim 3 & Above";
    const uppers = isMobile ? "Uppers League - Diamond 2 - Crim 2" : "Diamond 2 - Crim 2";
    const lowers = isMobile ? "Lowers League - Diamond 1 & Below" : "Diamond 1 & Below";
    const womens = isMobile ? "Womens League - All Skill Levels" : "All Skill Levels";

    return (
        <div className="standardContainer">
            <SeoData
                description="Fun but competitive Call of Duty league for free agents that are looking for a draft based league with a cash prize and playoffs."
                canonicalPath={"/games/call-of-duty/leagues/lockdowncl-leagues"}
            />
            {/* NOTE VERIFIED BANNER FOR LOCKDOWN LOOKS LIKE SHIT IN HEADER IMAGE */}
            <HeaderImage imageClass={"lockdownCODLeagues"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/lockdowncl-leagues/legends"}>Legends League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/lockdowncl-leagues/legends"} 
                        imgUrl={"https://i.imgur.com/Kg7IPyO.png"} 
                        alt={"Lockdown COD League"}
                        verified={true}
                    />
                    <HostBanner.Region>{legends}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/lockdowncl-leagues/legends"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/lockdowncl-leagues/uppers"}>Uppers League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/lockdowncl-leagues/uppers"} 
                        imgUrl={"https://i.imgur.com/hppmH7i.png"} 
                        alt={"Lockdown COD League"}
                        verified={true}
                    />
                    <HostBanner.Region>{uppers}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/lockdowncl-leagues/uppers"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/lockdowncl-leagues/lowers"}>Lowers League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/lockdowncl-leagues/lowers"} 
                        imgUrl={"https://i.imgur.com/iA4qVhT.png"} 
                        alt={"Lockdown COD League"}
                        verified={true}
                    />
                    <HostBanner.Region>{lowers}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/lockdowncl-leagues/lowers"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/lockdowncl-leagues/womens"}>Womens League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/lockdowncl-leagues/womens"} 
                        imgUrl={"https://i.imgur.com/9E2KYjz.png"} 
                        alt={"Lockdown COD League"}
                        verified={true}
                    />
                    <HostBanner.Region>{womens}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/lockdowncl-leagues/womens"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
