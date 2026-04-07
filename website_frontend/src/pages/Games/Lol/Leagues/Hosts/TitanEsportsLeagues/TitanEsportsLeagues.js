import { HeaderImage, HostBanner } from "components";
import { useCheckResize } from "hooks";

export const TitanEsportsLeagues = () => {
    const isMobile = useCheckResize();

    const immortal = isMobile ? "Immortal League - 600LP Cap | Thursdays" : "600LP Cap | Thursdays";
    const vanquisher = isMobile ? "Vanquisher League - M100 Cap | Tuesdays" : "M100 Cap | Tuesdays";
    const eternal = isMobile ? "Eternal League - Diamond 4 Cap | Mondays" : "Diamond 4 Cap | Mondays";
    const conqueror = isMobile ? "Conqueror League - Diamond 4 Cap | Wednesdays" : "Diamond 4 Cap | Wednesdays";
    const olympus = isMobile ? "Olympus League - Diamond 4 Cap | Fridays" : "Diamond 4 Cap | Fridays";
    const divinity = isMobile ? "Divinity League - Emerald 4 Cap | Mondays" : "Emerald 4 Cap | Mondays";
    const gladiator = isMobile ? "Gladiator League - Platinum 4 Cap | Tuesdays" : "Platinum 4 Cap | Tuesdays";

    return (
        <div className="standardContainer">
            <HeaderImage imageClass={"titanLOLLeagues"} />
            
            <div className="eventBannerContainer">
                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/immortal"}>Immortal League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/immortal"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{immortal}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/immortal"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/vanquisher"}>Vanquisher League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/vanquisher"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{vanquisher}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/vanquisher"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/eternal"}>Eternal League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/eternal"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{eternal}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/eternal"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/conqueror"}>Conqueror League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/conqueror"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{conqueror}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/conqueror"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/olympus"}>Olympus League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/olympus"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{olympus}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/olympus"} />
                </HostBanner>

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/divinity"}>Divinity League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/divinity"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{divinity}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/divinity"} />
                </HostBanner>

                <div className="hrEvents" />

                <HostBanner>
                    <HostBanner.Title path={"/games/LoL/leagues/titan-leagues/gladiator"}>Gladiator League</HostBanner.Title>
                    <HostBanner.Image 
                        path={"/games/LoL/leagues/titan-leagues/gladiator"} 
                        imgUrl={"https://i.imgur.com/SoRhxEf.png"} 
                        alt={"Titan Leagues"}
                        verified={true}
                    />
                    <HostBanner.Region>{gladiator}</HostBanner.Region>
                    <HostBanner.Button title={"More Info"} path={"/games/LoL/leagues/titan-leagues/gladiator"} />
                </HostBanner>

                <div className="hrEvents" />
            </div>
        </div>
    );
}
