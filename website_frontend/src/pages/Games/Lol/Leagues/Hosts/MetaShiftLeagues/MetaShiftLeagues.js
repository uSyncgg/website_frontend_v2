import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const MetaShiftLeagues = () => {
    const isMobile = useCheckResize();

    const radon = isMobile ? "Radon League - Tier 1" : "Tier 1";
    const xenon = isMobile ? "Xenon League - Tier 2" : "Tier 2";
    const krypton = isMobile ? "Krypton League - Tier 3" : "Tier 3";
    const argon = isMobile ? "Argon League - Tier 4" : "Tier 4";
    const nitrogen = isMobile ? "Nitrogen League - Tier 5" : "Tier 5";
    const neon = isMobile ? "Neon League - Tier 6" : "Tier 6";

    return (
        <div className="standardContainer">
            <HeaderImage title={"MetaShift Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/radon"}>Radon League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/radon"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{radon}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/radon"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/xenon"}>Xenon League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/xenon"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{xenon}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/xenon"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/krypton"}>Krypton League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/krypton"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{krypton}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/krypton"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/argon"}>Argon League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/argon"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{argon}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/argon"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/nitrogen"}>Nitrogen League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/nitrogen"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{nitrogen}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/nitrogen"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues/neon"}>Neon League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues/neon"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>{neon}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/meta-shift-leagues/neon"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
