import { Link } from "react-router";
import { EventTypeImages } from "components";

export const HowEsportsCanBeBetter = () => {
    return (
        <div className="standardBlankContainer">
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                    <div>
                        <p className="articleHeaderText">
                            <Link to={"/"} className="articleLink">Home</Link> {" > "}
                            <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                            How Esports Can Be Better
                        </p>
                    </div>
                    <h1>How Esports Can Be Better</h1>
                    <img src="https://i.imgur.com/4lgBfVg.jpg" alt="Live Production" className="expandArticleImage" />
                    <p className="ital">Image Credit: Live Production</p>

                    <h3>How Esports Can Be Better: Transforming the Community and the Industry</h3>
                    <p>
                        Esports has come a long way, evolving into a multi-billion-dollar industry with millions of fans worldwide. 
                        From League of Legends esports to Valorant esports, the competitive gaming scene is stronger than ever. However, 
                        there's still room for growth, both for the community and the industry at large. The biggest challenge lies in unifying 
                        esports under a centralized platform that benefits players, teams, and organizations alike. That's where uSync comes in.
                    </p>

                    <br />

                    <h3>A Centralized Hub for Esports Events</h3>
                    <p>
                        uSync changes the game by offering a centralized esports hub where players and organizations can easily discover and join 
                        competitive events. Whether you're a die-hard Rocket League esports player, looking for a solidified Call of Duty league, or 
                        trying to keep up with the latest tournaments, uSync has everything.
                    </p>

                    <br />

                    <h3>How uSync Strengthens the Esports Community</h3>
                    <p>
                        The esports community is built on passion, but it's also filled with barriers that prevent growth. Finding competitive leagues, 
                        casual tournaments, or upcoming events shouldn't be an exhausting process.
                    </p>

                    <br />

                    <h3>Through uSync, players can:</h3>
                    <p>
                        - Discover and join plenty of leagues across top esports games like League of Legends, Valorant, and Counter-Strike 2, 
                        and many more.
                    </p>

                    <br />

                    <p>
                        - Find high-quality upcoming tournaments in one place and plenty of other features.

                    </p>

                    <br />

                    <p>
                        - A strong community also means creating a smoother path for beginner players to try competitive esports. uSync makes it easier for tournament hosts to attract new players, ensuring that competitions remain active, well-organized, and engaging for all skill types.
                    </p>

                    <br />

                    <h3>How uSync Improves the Esports Industry</h3>
                    <p>
                        Better Event Visibility - Many competitive platforms lack proper event discovery. uSync helps hosts connect with a 
                        larger audience and attract committed players.
                    </p>

                    <br />

                    <h3>Stronger Competitive Structure</h3>
                    <p>
                        uSync ensures that verified esports events are better organized and more transparent. A Home for Esports Events - 
                        Instead of searching through multiple platforms, players can find verified and high-quality hosted events all in one place.
                    </p>

                    <br />

                    <h3>The Future of Esports with uSync</h3>
                    <p>
                        From helping players join leagues to providing better visibility for tournament hosts, uSync is the missing piece in the 
                        esports puzzle. If esports is to reach its full potential, it must be more accessible, streamlined, and community-driven—and 
                        uSync is leading that change.
                    </p>

                    <br />
                    <br />

                    <p>Join uSync today and be part of the next evolution of esports.</p>
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
            <EventTypeImages page={"Article"} articleName="How Esports Can Be Better"/>
        </div>
    );
}