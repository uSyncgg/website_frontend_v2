import { HeaderImage, HostBanner } from "components";

export const CodHeadToHead = () => {
    return ( 
        <div className="standardContainer">
            <HeaderImage title={"Head to Head"} imageClass={"codh2hPage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/head-to-head/cmg"}>Checkmate Gaming</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/head-to-head/cmg"} 
                        imgUrl={"https://i.imgur.com/QKP5L9N.png"} 
                        alt={"CMG Head to Head"}
                        verified={true}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/head-to-head/cmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/head-to-head/eagent"}>Esports Agent</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/head-to-head/eagent"} 
                        imgUrl={"https://i.imgur.com/mued0Qd.png"} 
                        alt={"Esports Agent Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/head-to-head/eagent"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/head-to-head/arena"}>The Arena</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/head-to-head/arena"} 
                        imgUrl={"https://i.imgur.com/rBPapid.png"} 
                        alt={"Arena Head to Head"}
                        verified={false}
                    />
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/head-to-head/arena"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
