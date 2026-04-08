import { Link } from "react-router";
import { EventTypeImages } from "components";

export const ProblemWithEsports = () => {
    return (
        <div>
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                    <div>
                        <p className="articleHeaderText">
                            <Link to={"/"} className="articleLink">Home</Link> {" > "}
                            <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                            The Problem With Esports
                        </p>
                    </div>
                    <h1>What the Problem With Esports is</h1>
                    <img src="https://i.imgur.com/zvYfTtx.jpg" alt="World Economic Forum" />
                    <p className="ital">Image Credit: World Economic Forum</p>

                    <h3>The Problem With Esports Today</h3>
                    <p>
                        Esports has grown into a billion-dollar industry, yet it remains deeply decentralized. Players, coaches, teams, and 
                        organizations struggle to find an all-in-one platform to build relationships, find opportunities, and grow their competitive 
                        careers. The lack of community and accessibility is one of the biggest issues facing the esports community today. Often, you may 
                        find yourself searching things on google such as “how do I join an esports tournament?” or “how do people join esports teams?” 
                        or even “how do I sign up for esports?” This is for the lack of accessibility of one solo platform but with uSync, we're here 
                        to combine it all.
                    </p>

                    <br />

                    <p>
                        Typically, anyone interested in esports is forced to look through multiple websites to find tournaments, leagues, or competitive 
                        events that aren't near you or aren't all in one place. Whether you're a player searching for a reliable competition, a team 
                        looking for recruits, or a coach scouting talent, the process is very inefficient and takes a lot of time.
                    </p>

                    <br />

                    <p>
                        Esports is more compartmentalized than ever. Tournaments are scattered across various websites, each with different formats, 
                        rules, and registration processes. This lack of centralization makes it difficult for individuals and organizations to navigate 
                        the space efficiently. Instead of fostering collaboration and growth, this fragmentation slows down the industry's progress, 
                        making it harder for new and existing participants to engage with the competitive scene which would allow for it to grow.
                    </p>

                    <br />

                    <p>
                        If you've ever found yourself searching for "LANs near me," or “upcoming LANs near me,” or just plainly struggling to locate 
                        local esports tournaments, you're not alone. This is where uSync comes in. Recognizing these problems, uSync has developed a 
                        unified esports platform designed to streamline the competitive experience for everyone involved. We offer a solution that 
                        brings together leagues, LANs, online tournaments, wagers, and head-to-head competitions all in one place, saving users time 
                        and effort while fostering a true esports community. You'll never have to search for LANs near you or have to worry about 
                        searching for esports events across multiple sites. We Sync so uSync!
                    </p>
                    </div>
                </div>

                <div className="articleSectionTwo">
                    <div className="articleImageContainer">
                    <div className="articleLanMap">
                        <h1>ello there</h1>
                    </div>
                    </div>
                </div>
            </div>
            
            <h1 className="otherArticles">OTHER ARTICLES</h1>
            <EventTypeImages page={"Article"} articleName="The Problem With Esports"/>
        </div>
    );
}
