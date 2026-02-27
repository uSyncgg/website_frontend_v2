import { HeaderImage, HostBanner } from "components";

export const CSLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Counter-Strike 2 Leagues"} imageClass={"cs2LeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/faceitesea"}>FACEIT ESEA</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/faceitesea"} 
                        imgUrl={"https://i.imgur.com/STmx1Aa.png"} 
                        alt={"FACEIT ESEA League"}
                        verified={true}
                    />
                    <HostBanner.Region>Available Worldwide</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/faceitesea"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/lpl-leagues"}>LPL Pathfinder Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/lpl-leagues"} 
                        imgUrl={"https://i.imgur.com/bqbNpmT.png"} 
                        alt={"LPL Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>OCE</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/CS2/leagues/lpl-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/fastcup"}>Fast Cup</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/fastcup"} 
                        imgUrl={"https://i.imgur.com/e7lFoB8.png"} 
                        alt={"Fast Cup League"}
                        verified={false}
                    />
                    <HostBanner.Region>EU, CIS, ME, and SA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/fastcup"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/corporate"}>Corporate CS2 League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/corporate"} 
                        imgUrl={"https://i.imgur.com/87GfbXz.png"} 
                        alt={"Corporate CS2 League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/corporate"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/fireleague"}>FiReLEAGUE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/fireleague"} 
                        imgUrl={"https://i.imgur.com/gLNXCQA.png"} 
                        alt={"FiRe League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA, EU, and SA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/fireleague"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/unitedtwentyone"}>United TwentyOne</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/unitedtwentyone"} 
                        imgUrl={"https://i.imgur.com/VTroInj.png"} 
                        alt={"United TwentyOne League"}
                        verified={false}
                    />
                    <HostBanner.Region>Worldwide</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/unitedtwentyone"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/scl-leagues"}>SCL Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/scl-leagues"} 
                        imgUrl={"https://i.imgur.com/b6fSddr.png"} 
                        alt={"SCL Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>EU and CIS</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/CS2/leagues/scl-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/hyperfibre-leagues"}>Hyperfibre Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/hyperfibre-leagues"} 
                        imgUrl={"https://i.imgur.com/Cx4N8HW.png"} 
                        alt={"Hyperfibre Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NZ</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/CS2/leagues/hyperfibre-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/njcaae"}>NJCAAE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/njcaae"} 
                        imgUrl={"https://i.imgur.com/jTKBWZM.png"} 
                        alt={"NJCAAE League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/njcaae"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/necc"}>NECC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/necc"} 
                        imgUrl={"https://i.imgur.com/0JWBSKD.png"} 
                        alt={"NECC League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/necc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/ecac"}>ECAC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/ecac"} 
                        imgUrl={"https://i.imgur.com/hsLZywE.png"} 
                        alt={"ECAC League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/ecac"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/egfc"}>EGFC League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/egfc"} 
                        imgUrl={"https://i.imgur.com/euAj2dR.png"} 
                        alt={"Dubbz Wagers"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/egfc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/faceitcollegiate"}>FACEIT Collegiate</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/faceitcollegiate"} 
                        imgUrl={"https://i.imgur.com/e1oqsLF.png"} 
                        alt={"Faceit Collegiate League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/faceitcollegiate"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/nse"}>National Student Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/nse"} 
                        imgUrl={"https://i.imgur.com/mJJJD6e.png"} 
                        alt={"National Student Esports League"}
                        verified={false}
                    />
                    <HostBanner.Region>UK</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/nse"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/playfly"}>Playfly College</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/playfly"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly College League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/playfly"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/ael"}>Australian Esports League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/ael"} 
                        imgUrl={"https://i.imgur.com/YYvUqCM.png"} 
                        alt={"Australian Esports League"}
                        verified={false}
                    />
                    <HostBanner.Region>AUS</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/ael"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">High School Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/hsel"}>High School Esports League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/hsel"} 
                        imgUrl={"https://i.imgur.com/fYpPNR1.png"} 
                        alt={"High School Esports League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/hsel"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/CS2/leagues/vantagg"}>VantaGG</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/CS2/leagues/vantagg"} 
                        imgUrl={"https://i.imgur.com/4Lv3iRp.png"} 
                        alt={"VantaGG"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/CS2/leagues/vantagg"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
