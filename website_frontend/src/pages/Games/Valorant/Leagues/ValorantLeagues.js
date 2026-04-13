import { HeaderImage, HostBanner } from "components";

export const ValorantLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Valorant Leagues"} imageClass={"valLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/corporate"}>Corporate League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/corporate"} 
                        imgUrl={"https://i.imgur.com/k63mdno.png"} 
                        alt={"Corporate League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/corporate"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/unified"}>Unified Premier League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/unified"} 
                        imgUrl={"https://i.imgur.com/KDf5r2a.png"} 
                        alt={"Unified Premier League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/unified"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/riot"}>College Valorant League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/riot"} 
                        imgUrl={"https://i.imgur.com/1Hqgxu0.png"} 
                        alt={"College Valorant League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/riot"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/njcaae"}>NJCAAE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/njcaae"} 
                        imgUrl={"https://i.imgur.com/Yer31Qr.png"} 
                        alt={"NJCAAE"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/njcaae"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/necc"}>NECC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/necc"} 
                        imgUrl={"https://i.imgur.com/wUMekqz.png"} 
                        alt={"NECC"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/necc"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/egfc"}>EGFC League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/egfc"} 
                        imgUrl={"https://i.imgur.com/3DTxejo.png"} 
                        alt={"EGFC League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/egfc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/playfly-leagues"}>Playfly College</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/playfly-leagues"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly College Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/Valorant/leagues/playfly-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/cecc"}>CECC League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/cecc"} 
                        imgUrl={"https://i.imgur.com/WFbWb2d.png"} 
                        alt={"CECC League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/cecc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/nse"}>National Student Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/nse"} 
                        imgUrl={"https://i.imgur.com/mJJJD6e.png"} 
                        alt={"National Student Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>UK</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/nse"} />
                </HostBanner>
                
                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">High School Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/tec"}>The Esports Company League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/tec"} 
                        imgUrl={"https://i.imgur.com/FZeLamS.png"} 
                        alt={"The Esports Company League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/tec"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/nasef"}>NASEF League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/nasef"} 
                        imgUrl={"https://i.imgur.com/x0SaVuR.png"} 
                        alt={"NASEF League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/nasef"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/Valorant/leagues/egfh"}>EGFH League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/Valorant/leagues/egfh"} 
                        imgUrl={"https://i.imgur.com/3DTxejo.png"} 
                        alt={"EGFH"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/Valorant/leagues/egfh"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
