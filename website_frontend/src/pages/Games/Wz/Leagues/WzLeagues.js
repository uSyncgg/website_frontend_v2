import { HeaderImage, HostBanner } from "components";

export const WzLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Warzone Leagues"} imageClass={"wzLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/leagues/airforce"}>Air Force Gaming League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/leagues/airforce"} 
                        imgUrl={"https://i.imgur.com/4o2rJWS.png"} 
                        alt={"Air Force Gaming League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA/EU/APAC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/leagues/airforce"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/leagues/gmhl"}>GMHL Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/leagues/gmhl"} 
                        imgUrl={"https://i.imgur.com/hDF13fh.png"} 
                        alt={"GMHL League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/leagues/gmhl"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/warzone/leagues/njcaae"}>NJCAAE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/warzone/leagues/njcaae"} 
                        imgUrl={"https://i.imgur.com/Yer31Qr.png"} 
                        alt={"NJCAAE"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/warzone/leagues/njcaae"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
