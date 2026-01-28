import { GameIcon, GameChildrenIcon, HostBanner } from "components";

const Home = () => {
    return (
        <div style={{backgroundColor: "black"}}>
            <h1>Home Page</h1>
            {/* <GameIcon path = "/Games" imgUrl = "https://i.imgur.com/gNvoNEo.png" alt = "Call of Duty" /> */}
            {/* <GameChildrenIcon path="/Games" imgUrl = "https://i.imgur.com/NXTgpHd.png" alt = "Call of Duty LANs" /> */}
            {/* <MoreInfoButton title="All Leagues" path="/Games" /> */}
            <HostBanner>
                <HostBanner.Title path={"/Games"}>To Games</HostBanner.Title>
                <HostBanner.Image path={"/Games"} imgUrl={"https://i.imgur.com/MQkAGHe.png"} alt={"Lockdown CL"} />
                <HostBanner.Region>All Regions</HostBanner.Region>
                <HostBanner.Button title={"More Info"} path={"/Games"} />
            </HostBanner>
        </div>
    );
}

export default Home;