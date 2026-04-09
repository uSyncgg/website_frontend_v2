import { HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";

export const AscendingBaselineLeagues = () => {
    const isMobile = useCheckResize();

    const ab = isMobile ? "AB League - Premade Format" : "Premade Format";
    const pand = isMobile ? "Pandemonium Games League - Draft Format" : "Draft Format";

    return (
        <div className="standardContainer">
            <HeaderImage title={"Ascending Baseline Leagues"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/ascending-baseline/ab"}>AB League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/ascending-baseline/ab"} 
                        imgUrl={"https://i.imgur.com/W2CJtZK.png"} 
                        alt={"Ascending Baseline"}
                        verified={false}
                    />
                    <HostBanner.Region>{ab}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/halo/leagues/ascending-baseline/ab"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/ascending-baseline/pandemonium-games"}>Pandemonium Games League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/ascending-baseline/pandemonium-games"} 
                        imgUrl={"https://i.imgur.com/W2CJtZK.png"} 
                        alt={"Ascending Baseline"}
                        verified={false}
                    />
                    <HostBanner.Region>{pand}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/halo/leagues/ascending-baseline/pandemonium-games"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/halo/leagues"} />
                </div>
            </div>
        </div>
    );
}
