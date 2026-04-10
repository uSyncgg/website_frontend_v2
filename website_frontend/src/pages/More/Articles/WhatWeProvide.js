import { Link } from "react-router";
import { EventTypeImages } from "components";

export const WhatWeProvide = () => {
    return (
        <div className="standardBlankContainer">
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                    <div>
                        <p className="articleHeaderText">
                            <Link to={"/"} className="articleLink">Home</Link> {" > "}
                            <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                            What uSync Provides For Esports
                        </p>
                    </div>
                    <h1>What uSync Provides For Esports</h1>
                    <img src="https://i.imgur.com/7MQUXKl.jpg" alt="ViewSonic" />
                    <p className="ital">Image Credit: ViewSonic</p>

                    <h3>What We Provide</h3>
                    <p>
                        At uSync, we are revolutionizing the way the esports community connects, competes, and thrives. 
                        We provide a one-stop hub for everything esports, eliminating the need for players, teams, coaches, 
                        and organizations to search across multiple platforms. Our platform simplifies the entire esports ecosystem 
                        by concentrating tournaments, events, and competitions all into one place.
                    </p>

                    <br />

                    <h3>Platforming Tournaments</h3>
                    <p>
                        uSync offers a fully integrated tournament hosting system, featuring leagues, LANs, online tournaments, and wagers. 
                        If you've ever searched for "how to find local LAN tournaments" or "where to compete in esports", uSync makes it easy 
                        to discover and participate in these well looked for competitive events. Say goodbye to endless Google searches—uSync 
                        provides a smart, searchable platform for ongoing and upcoming events all in one space.
                    </p>

                    <br />

                    <h3>Verified Hosting and Secure Competition</h3>
                    <p>
                        Unlike other platforms, uSync provides a safe, verified environment for esports competition. At uSync, we have a variety 
                        of verified hosts you can trust to complete fair payouts, fair rules, unbiased admins, and overall a safe to play environment 
                        for those that want to improve their skill.
                    </p>

                    <br />

                    <h3>Helping You Find LANs Near You</h3>
                    <p>
                        For anyone typing "LANs near me", "local call of duty tournaments", or "how to join a LAN event" into google, uSync is the 
                        answer you are looking for. Instead of bouncing between different event websites and social media pages, our platform 
                        consolidates all major esports events into one easy-to-navigate system.
                    </p>

                    <br />

                    <h3>Helping You Find the Best LANs and Events</h3>
                    <p>
                        For players searching for "LANs near me", "local gaming tournaments", or "how to compete in esports", uSync offers an 
                        easy-to-use platform that connects players to the best local and online events. We make LAN event discovery seamless and 
                        competition entry effortless, ensuring that every esports player can find the right opportunity to showcase their skills.
                    </p>

                    <br />
                    <br />

                    <p>
                        By providing a tuned, all-in-one solution, uSync is setting a new standard for accessibility and engagement in esports. 
                        We are committed to bridging the gaps in the industry, ensuring that players, teams, and professionals connect, compete, 
                        and grow like never before.
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
            <EventTypeImages page={"Article"} articleName="What We Provide"/>
        </div>
    );
}
