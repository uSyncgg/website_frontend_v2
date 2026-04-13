import { HostBanner, HeaderImage } from "components";
import '../../EventBanners.css';

export const CodLeagues = () => {
    return (
        <div className="standardContainer">
            <HeaderImage title={"Call of Duty Leagues"} imageClass={"lansPage"} />
            
            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/lockdowncl-leagues"}>LockdownCL</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/lockdowncl-leagues"} 
                        imgUrl={"https://i.imgur.com/MQkAGHe.png"} 
                        alt={"LockdownCL Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/call-of-duty/leagues/lockdowncl-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/u18-league"}>U18 COD League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/u18-league"} 
                        imgUrl={"https://i.imgur.com/AMzISPh.png"} 
                        alt={"U18 COD League"}
                        verified={false}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/u18-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/xp-league-cod"}>XP League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/xp-league-cod"} 
                        imgUrl={"https://i.imgur.com/d4kQBH4.png"} 
                        alt={"XP Leaue"}
                        verified={false}
                    />
                    <HostBanner.Region>NA/EU</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/xp-league-cod"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-beer-league"}>COD Beer League (21+)</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-beer-league"} 
                        imgUrl={"https://i.imgur.com/GKRvsAM.png"} 
                        alt={"CoD Beer League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-beer-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/pulse-x-leagues"}>Pulse X League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/pulse-x-leagues"} 
                        imgUrl={"https://i.imgur.com/RHgIQV1.jpg"} 
                        alt={"Pulse X Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/call-of-duty/leagues/pulse-x-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/united-rogue-league"}>United Rogue</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/united-rogue-league"} 
                        imgUrl={"https://i.imgur.com/jZK2DCe.png"} 
                        alt={"United Rogue League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/united-rogue-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/tpc-womens-cod"}>TPC Womens COD</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/tpc-womens-cod"} 
                        imgUrl={"https://i.imgur.com/u9cCMVa.png"} 
                        alt={"TPC Womens CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/tpc-womens-cod"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/fcl"}>Female COD League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/fcl"} 
                        imgUrl={"https://i.imgur.com/SBSXD2X.png"} 
                        alt={"Female CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/fcl"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/zoned-out"}>Zoned Out Gaming League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/zoned-out"} 
                        imgUrl={"https://i.imgur.com/qiN8RKF.png"} 
                        alt={"Zoned Out Gaming League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/zoned-out"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/airforce-league"}>Airforce Gaming League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/airforce-league"} 
                        imgUrl={"https://i.imgur.com/4o2rJWS.png"} 
                        alt={"Airforce Gaming League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA/EU/APAC</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/airforce-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/corporate-cod-league"}>Corporate COD League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/corporate-cod-league"} 
                        imgUrl={"https://i.imgur.com/k63mdno.png"} 
                        alt={"Corporate CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/corporate-cod-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/ixi-esports"}>IXI Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/ixi-esports"} 
                        imgUrl={"https://i.imgur.com/mVoGJG4.png"} 
                        alt={"IXI Esports"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/ixi-esports"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/tpc-league"}>The Premier Circuit League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/tpc-league"} 
                        imgUrl={"https://i.imgur.com/t4k8Qi6.png"} 
                        alt={"Premier Circuit League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/tpc-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cod-rec-leagues"}>COD Rec Leagues</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cod-rec-leagues"} 
                        imgUrl={"https://i.imgur.com/qbmhh4T.png"} 
                        alt={"CoD Rec Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>All Leagues</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/cod-rec-leagues"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/elite-gaming-warfare-league"}>Elite Warfare Gaming League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/elite-gaming-warfare-league"} 
                        imgUrl={"https://i.imgur.com/7o2e5a3.png"} 
                        alt={"Elite Warfare Gaming League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/elite-gaming-warfare-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/casual-xp-league"}>Casual XP League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/casual-xp-league"} 
                        imgUrl={"https://i.imgur.com/wW4jVQ0.png"} 
                        alt={"Casual XP League"}
                        verified={false}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/casual-xp-league"} />
                </HostBanner>

                <div className="hrEvents" />

                {/* TEMP REMOVED, THEY MAY RESTART */}
                {/* <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/old-heads-circuit"}>Old Heads Circuit</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/old-heads-circuit"} 
                        imgUrl={"https://i.imgur.com/ndryPxn.png"} 
                        alt={"Old Heads Circuit"}
                        verified={false}
                    />
                    <HostBanner.Region>All Regions</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/old-heads-circuit"} />
                </HostBanner> */}

                <div className="hrEvents" />

                <h2 className="eventSeparationTitle">Collegiate Leagues</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className="hrEvents" />
                
                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/cxp-leagues"}>College XP</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/cxp-leagues"} 
                        imgUrl={"https://i.imgur.com/jGdqqOZ.png"} 
                        alt={"College XP Leagues"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"All Leagues"} path={"/games/call-of-duty/leagues/cxp-leagues"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/playfly-cod-league"}>Playfly College</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/playfly-cod-league"} 
                        imgUrl={"https://i.imgur.com/XHCsRTv.png"} 
                        alt={"Playfly College"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/playfly-cod-league"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/ccl-league"}>College COD</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/ccl-league"} 
                        imgUrl={"https://i.imgur.com/71EePEn.png"} 
                        alt={"College CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>NA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/ccl-league"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/ecac"}>ECAC Esports</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/ecac"} 
                        imgUrl={"https://i.imgur.com/VCXkcNL.png"} 
                        alt={"ECAC CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/ecac"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/call-of-duty/leagues/njcaae"}>NJCAAE</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/call-of-duty/leagues/njcaae"} 
                        imgUrl={"https://i.imgur.com/Yer31Qr.png"} 
                        alt={"NJCAAE CoD League"}
                        verified={false}
                    />
                    <HostBanner.Region>USA</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/call-of-duty/leagues/njcaae"} />
                </HostBanner>

                <div className="hrEvents" />
            </div> 
        </div>
    );
}
