import { SeoData, HeaderImage, HostBanner, BackButton } from "components";
import { useCheckResize } from "hooks";
import '../../../../EventBanners.css';

export const BeerLeague = () => {
    const isMobile = useCheckResize();

    const cblTeam = isMobile ? "CBL Team League - NA" : "NA";
    const ogBeer  = isMobile ? "OG Beer League - NA"  : "NA";

    return (
        <div className="standardContainer">
            <SeoData
                title={"Beer League - Call of Duty"}
                description="Call of Duty Beer League. Enjoy beers and compete in a Call of Duty league while under the influence."
                canonicalPath={"/games/call-of-duty/leagues/cod-beer-league"}
            />
            <HeaderImage title={"Call of Duty Beer League"} imageClass={"nonVerifiedPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-beer-league/og-beer-league"}>OG Beer League</HostBanner.Title>
                    <HostBanner.Image
                        path={"/games/call-of-duty/leagues/cod-beer-league/og-beer-league"}
                        imgUrl={"https://i.imgur.com/GKRvsAM.png"}
                        alt={"OG Beer League"}
                        verified={false}
                    />
                    <HostBanner.Region>{ogBeer}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-beer-league/og-beer-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-beer-league/cbl-team-league"}>CBL Team League</HostBanner.Title>
                    <HostBanner.Image
                        path={"/games/call-of-duty/leagues/cod-beer-league/cbl-team-league"}
                        imgUrl={"https://i.imgur.com/GKRvsAM.png"}
                        alt={"CBL Team League"}
                        verified={false}
                    />
                    <HostBanner.Region>{cblTeam}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-beer-league/cbl-team-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <div className="backButtonContainer">
                    <BackButton path={"/games/call-of-duty/leagues"} />
                </div>
            </div>
        </div>
    );
}
