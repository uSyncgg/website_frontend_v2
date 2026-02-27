import { HeaderImage, HostBanner } from "components";

export const RLLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Rocket League Leagues"} imageClass={"rlLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rlpc-leagues"}>RLPC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rlpc-leagues"} 
                        imgUrl={"https://i.imgur.com/kVDfckC.png"} 
                        alt={"RLPC Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/rlpc-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/rsc-leagues"}>Rocket Soccar Confederation</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/rsc-leagues"} 
                        imgUrl={"https://i.imgur.com/QiNSeyE.png"} 
                        alt={"RSC Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA/EU</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/rsc-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontline-leagues"}>Team Frontline Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontline-leagues"} 
                        imgUrl={"https://i.imgur.com/pjxLzXe.png"} 
                        alt={"Team Frontline Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/frontline-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/url-leagues"}>Ultimate Rocket League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/url-leagues"} 
                        imgUrl={"https://i.imgur.com/MAt6qsf.png"} 
                        alt={"URL Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/url-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/mle-leagues"}>Minor League Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/mle-leagues"} 
                        imgUrl={"https://i.imgur.com/ydii4DZ.png"} 
                        alt={"MLE Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/mle-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/united-rogue"}>United Rogue League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/united-rogue"} 
                        imgUrl={"https://i.imgur.com/jWphxcz.png"} 
                        alt={"United Rogue League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/united-rogue"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/italian-leagues"}>Italian Rocket Champ Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/italian-leagues"} 
                        imgUrl={"https://i.imgur.com/VjsPbnv.png"} 
                        alt={"Italian Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>ITL</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/italian-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nemesis-leagues"}>Nemesis Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nemesis-leagues"} 
                        imgUrl={"https://i.imgur.com/PcmcLLk.png"} 
                        alt={"Nemesis Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/nemesis-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/raket-ligaen"}>Raket Ligaen</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/raket-ligaen"} 
                        imgUrl={"https://i.imgur.com/dTZMWkR.png"} 
                        alt={"Raket Ligaen"}
                        verified={false}
                    />
                    <HostBanner.Region>DK</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/raket-ligaen"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/frontier-doubles-leagues"}>Frontier Doubles Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} 
                        imgUrl={"https://i.imgur.com/JRaBjWV.png"} 
                        alt={"Frontier Doubles Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/frontier-doubles-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/oce-leagues"}>OCE Draft Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/oce-leagues"} 
                        imgUrl={"https://i.imgur.com/NxauxTy.png"} 
                        alt={"OCE Draft Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>OCE</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/RocketLeague/leagues/oce-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/finality"}>Finality League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/finality"} 
                        imgUrl={"https://i.imgur.com/Q2G6QqM.png"} 
                        alt={"Finality League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/finality"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/corporate"}>Corporate League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/corporate"} 
                        imgUrl={"https://i.imgur.com/k63mdno.png"} 
                        alt={"Corporate League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/corporate"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/airforce"}>Airforce Gaming League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/airforce"} 
                        imgUrl={"https://i.imgur.com/4o2rJWS.png"} 
                        alt={"Airforce Gaming League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA/EU/APAC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/airforce"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/cca"}>College Carball Association</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/cca"} 
                        imgUrl={"https://i.imgur.com/UqFxQ9Q.png"} 
                        alt={"College Carball"}
                        verified={true}
                    />
                    <HostBanner.Region>NA/EU</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/cca"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/playfly"}>Playfly College</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/playfly"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly College"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/playfly"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/ecac"}>ECAC Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/ecac"} 
                        imgUrl={"https://i.imgur.com/VCXkcNL.png"} 
                        alt={"ECAC"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/ecac"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/necc"}>NECC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/necc"} 
                        imgUrl={"https://i.imgur.com/wUMekqz.png"} 
                        alt={"NECC"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/necc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/csmg"}>CSMG League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/csmg"} 
                        imgUrl={"https://i.imgur.com/2EsJOXo.png"} 
                        alt={"CSMG League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/csmg"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/njcaae"}>NJCAAE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/njcaae"} 
                        imgUrl={"https://i.imgur.com/jTKBWZM.png"} 
                        alt={"NJCAAE"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/njcaae"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/egfc"}>EGFC League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/egfc"} 
                        imgUrl={"https://i.imgur.com/3DTxejo.png"} 
                        alt={"EGFC League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/egfc"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/ugc"}>UGC Battle Academy</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/ugc"} 
                        imgUrl={"https://i.imgur.com/SVdtnVw.png"} 
                        alt={"UGC"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/ugc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/ael"}>Australian Esports League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/ael"} 
                        imgUrl={"https://i.imgur.com/YYvUqCM.png"} 
                        alt={"Australian Esports League"}
                        verified={false}
                    />
                    <HostBanner.Region>AUS</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/ael"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/faceit"}>FACEIT Collegiate</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/faceit"} 
                        imgUrl={"https://i.imgur.com/e1oqsLF.png"} 
                        alt={"Faceit"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/faceit"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nse"}>National Student Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nse"} 
                        imgUrl={"https://i.imgur.com/mJJJD6e.png"} 
                        alt={"National Student Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>EU</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nse"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">High School Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/hsel"}>High School Esports League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/hsel"} 
                        imgUrl={"https://i.imgur.com/fYpPNR1.png"} 
                        alt={"High School Esports League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/hsel"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/playvs"}>PlayVS</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/playvs"} 
                        imgUrl={"https://i.imgur.com/dj20PCp.png"} 
                        alt={"PlayVS"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/playvs"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/tec"}>The Esports Company League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/tec"} 
                        imgUrl={"https://i.imgur.com/FZeLamS.png"} 
                        alt={"The Esports Company League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/tec"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/vantagg"}>VantaGG</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/vantagg"} 
                        imgUrl={"https://i.imgur.com/4Lv3iRp.png"} 
                        alt={"Vanta GG"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/vantagg"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/nasef"}>NASEF League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/nasef"} 
                        imgUrl={"https://i.imgur.com/x0SaVuR.png"} 
                        alt={"NASEF League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/nasef"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/egfh"}>EGFH League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/egfh"} 
                        imgUrl={"https://i.imgur.com/3DTxejo.png"} 
                        alt={"EGFH League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/egfh"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/aelhs"}>Australian Esports League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/aelhs"} 
                        imgUrl={"https://i.imgur.com/YYvUqCM.png"} 
                        alt={"Australian Esports League"}
                        verified={false}
                    />
                    <HostBanner.Region>AUS</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/aelhs"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/RocketLeague/leagues/ugc-hs"}>UGC HS Battle Academy</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/RocketLeague/leagues/ugc-hs"} 
                        imgUrl={"https://i.imgur.com/SVdtnVw.png"} 
                        alt={"UGC HS"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/RocketLeague/leagues/ugc-hs"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
