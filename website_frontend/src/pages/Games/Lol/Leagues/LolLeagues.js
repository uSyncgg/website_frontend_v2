import { HeaderImage, HostBanner } from "components";

export const LolLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"League of Legends Leagues"} imageClass={"lolLeaguePage"} />

            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues"}>Titan Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Esports Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/titan-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/risen-leagues"}>Risen Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/risen-leagues"} 
                        imgUrl={"https://i.imgur.com/s5LrZoC.png"} 
                        alt={"Risen Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/risen-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/aegis-leagues"}>Aegis Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/aegis-leagues"} 
                        imgUrl={"https://i.imgur.com/o0sTnrZ.png"} 
                        alt={"Aegis Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/aegis-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/blue-otter-leagues"}>Blue Otter Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/blue-otter-leagues"} 
                        imgUrl={"https://i.imgur.com/RaTizzw.png"} 
                        alt={"Blue Otter Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/blue-otter-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/black-twitch-league"}>Black Twitch League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/black-twitch-league"} 
                        imgUrl={"https://i.imgur.com/ZuJA3w1.png"} 
                        alt={"Black Twitch League"}
                        verified={false}
                    />
                    <HostBanner.Region>Gold Cap</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/black-twitch-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/low-budget-leagues"}>Low Budget LCS Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/low-budget-leagues"} 
                        imgUrl={"https://i.imgur.com/lPFfJL9.png"} 
                        alt={"Low Budget LCS Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/low-budget-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/meta-shift-leagues"}>MetaShift Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/meta-shift-leagues"} 
                        imgUrl={"https://i.imgur.com/XiFomA7.png"} 
                        alt={"MetaShift Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/meta-shift-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/sdc"}>SDC League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/sdc"} 
                        imgUrl={"https://i.imgur.com/A4LXnAj.png"} 
                        alt={"SDC League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/sdc"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/cobalt-winds-leagues"}>CWL Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/cobalt-winds-leagues"} 
                        imgUrl={"https://i.imgur.com/sMnBEnL.png"} 
                        alt={"Cobalt Winds Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>EUW</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/LoL/leagues/cobalt-winds-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/corporate-league"}>Corporate LoL League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/corporate-league"} 
                        imgUrl={"https://i.imgur.com/k63mdno.png"} 
                        alt={"Corporate LoL League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/corporate-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/clol"}>CLOL</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/clol"} 
                        imgUrl={"https://i.imgur.com/2jNA26x.png"} 
                        alt={"CLOL"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/clol"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/playfly"}>Playfly College</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/playfly"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly College League"}
                        verified={true}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/playfly"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/necc"}>NECC</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/necc"} 
                        imgUrl={"https://i.imgur.com/wUMekqz.png"} 
                        alt={"NECC League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/necc"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/ecac"}>ECAC Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/ecac"} 
                        imgUrl={"https://i.imgur.com/hsLZywE.png"} 
                        alt={"ECAC"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/ecac"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/nse"}>National Student Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/nse"} 
                        imgUrl={"https://i.imgur.com/mJJJD6e.png"} 
                        alt={"National Student Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>UK</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/nse"} />
                </HostBanner>

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">High School Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                
                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/playvs"}>PlayVS</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/playvs"} 
                        imgUrl={"https://i.imgur.com/dj20PCp.png"} 
                        alt={"PlayVS"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/playvs"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
