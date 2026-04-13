import { HeaderImage, HostBanner } from "components";

export const CodWagers = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Wagers"} imageClass={"codWagersPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/wagers/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/wagers/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"CMG Wagers"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/wagers/cmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/wagers/eagent"}>Esports Agent</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/wagers/eagent"} 
                        imgUrl={"https://i.imgur.com/mued0Qd.png"} 
                        alt={"Esports Agent Wagers"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/wagers/eagent"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/wagers/1v1me"}>1v1 Me (App)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/wagers/1v1me"} 
                        imgUrl={"https://i.imgur.com/BFNJpgg.png"} 
                        alt={"1v1 Me Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/wagers/1v1me"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/wagers/the-esports-hub"}>The Esports Hub</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/wagers/the-esports-hub"} 
                        imgUrl={"https://i.imgur.com/2t8zzc5.png"} 
                        alt={"Esports Hub Wagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/wagers/the-esports-hub"} />
                </HostBanner>
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/wagers/ewagers"}>Ewagers</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/wagers/ewagers"} 
                        imgUrl={"https://i.imgur.com/FAg32lR.png"} 
                        alt={"Ewagers"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/wagers/ewagers"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    )
}
 