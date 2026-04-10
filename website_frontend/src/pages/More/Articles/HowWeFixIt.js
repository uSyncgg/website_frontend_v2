import { Link } from "react-router";
import { EventTypeImages } from "components";

export const HowWeFixIt = () => {
    return (
        <div className="standardBlankContainer">
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                    <div>
                        <p className="articleHeaderText">
                            <Link to={"/"} className="articleLink">Home</Link> {" > "}
                            <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                            How We Fix It
                        </p>
                    </div>
                    <h1>How uSync Fixes The Problem With Esports</h1>
                    <img src="https://i.imgur.com/TTV0RZS.jpg" alt="World Economic Forum" className="expandArticleImage" />
                    <p className="ital">Image Credit: World Economic Forum</p>

                    <br />

                    <p>
                        The esports industry has long suffered from fragmentation, making it challenging for players, 
                        teams, and organizations to navigate the competitive landscape. At uSync, we have developed a 
                        game-changing platform that unites the esports community and provides the space needed for long-term success.
                    </p>

                    <br />

                    <h3>Unifying the Esports Landscape</h3>
                    <p>
                        The biggest issue in esports today is the lack of a centralized hub. Instead of users being forced to search through 
                        multiple sites to find the right tournaments, leagues, or head-to-head matches, uSync combines it all into one platform. 
                        By integrating every key aspect of competitive gaming, we ensure that players, teams, and coaches can easily find opportunities 
                        that match their needs. We provide you with the best of both worlds in terms of searching for and verifying your next league, 
                        LAN, tournament, or more.
                    </p>

                    <br />

                    <h3>Reducing Search Time</h3>
                    <p>
                        Before uSync, finding the right competition required hours of searching across multiple websites, Discord servers, and social 
                        media posts. If you've ever typed "where to find local esports tournaments" or "how to join a LAN and Esports League", you 
                        understand the struggle. Our platform cuts down search time significantly, allowing users to discover and join esports events 
                        effortlessly.
                    </p>

                    <br />

                    <h3>Supporting All Levels of Competition</h3>
                    <p>
                        From beginner or amateur players looking to hone their skills to esports organizations seeking professional-level events, 
                        uSync provides every level of competition. We offer structured leagues, casual head-to-heads, and secure wagers ensuring that 
                        players and teams of all skill levels have a place to grow and compete.
                    </p>

                    <br />

                    <h3>Helping You Find the Best LANs and Events</h3>
                    <p>
                        For players searching for "LANs near me", "local gaming tournaments", or "how to compete in esports", uSync offers an 
                        easy-to-use platform that connects players to the best local and online events. We make LAN event discovery seamless and 
                        competition entry effortless, ensuring that every esports player can find the right opportunity to showcase their skills.
                    </p>

                    <br />

                    <h3>The Future of Esports is Here</h3>
                    <p>
                        Esports is evolving, and uSync is leading the charge. Our mission is to eliminate the disorganization of the industry, 
                        build a strong competitive environment, and create a centralized esports hub that caters to players, teams, coaches, and 
                        organizations alike. With our platform and commitment to community building, uSync is setting a new standard for how esports 
                        should operate.
                    </p>

                    <br />

                    <p>
                        By bringing everything under one roof, we make esports simpler, faster, and more accessible than ever before. 
                        If you've been searching for LAN events, competitive tournaments, or reliable esports networking, look no further—join 
                        uSync today and be part of the revolution in centralized esports competition.
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
            <EventTypeImages page={"Article"} articleName="How We Fix It"/>
        </div>
    );
}
