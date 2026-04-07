import { HeaderImage, HostBanner } from "components";

export const HaloLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Halo Leagues"} imageClass={"haloLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/halo-rec-league"}>Halo Rec League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/halo-rec-league"} 
                        imgUrl={"https://i.imgur.com/6cA46YH.png"} 
                        alt={"Halo Rec League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/halo/leagues/halo-rec-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/ascending-baseline"}>Ascending Baseline</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/ascending-baseline"} 
                        imgUrl={"https://i.imgur.com/W2CJtZK.png"} 
                        alt={"Ascending Baseline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/halo/leagues/ascending-baseline"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/halo-agent"}>Halo Agent</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/halo-agent"} 
                        imgUrl={"https://i.imgur.com/bHzfdu8.png"} 
                        alt={"Halo Agent League"}
                        verified={false}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/halo/leagues/halo-agent"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/halo/leagues/ugc-halo"}>College Halo</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/halo/leagues/ugc-halo"} 
                        imgUrl={"https://i.imgur.com/JeMuXtx.png"} 
                        alt={"UGC League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/halo/leagues/ugc-halo"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
