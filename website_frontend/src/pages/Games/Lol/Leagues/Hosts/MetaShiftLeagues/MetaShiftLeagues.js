import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const MetaShiftLeagues = () => {
    const isMobile = useCheckResize();

    const noble = isMobile ? "Noble League - Tier 1" : "Tier 1";
    const diamond = isMobile ? "Diamond League - Tier 2" : "Tier 2";
    const emerald = isMobile ? "Emerald League - Tier 3" : "Tier 3";
    const cyanide = isMobile ? "Cyanide League - Tier 4" : "Tier 4";
    const platinum = isMobile ? "Platinum League - Tier 5" : "Tier 5";
    const draft = isMobile ? "Draft League" : "Draft";

    return (
        <div className="standardContainer">
            <SeoData
                description="MetaShift Leagues are League of Legends leagues with a tier system based on your in-game rank. Experience competitive league today."
                canonicalPath={"/games/LoL/leagues/meta-shift-leagues"}
            />
            <HeaderImage title={"MetaShift Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/noble"}>Noble League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/noble"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{noble}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/noble"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/diamond"}>Diamond League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/diamond"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{diamond}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/diamond"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/emerald"}>Emerald League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/emerald"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{emerald}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/emerald"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/cyanide"}>Cyanide League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/cyanide"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{cyanide}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/cyanide"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/platinum"}>Platinum League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/platinum"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{platinum}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/platinum"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/draft"}>Draft League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/draft"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{draft}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/draft"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/LoL/leagues"} />
                </div>
            </div>
        </div>
    );
}
