import { Link } from "react-router";
import { SeoData, EventTypeImages, ArticleImages } from "components";

export const WhyUsyncIsUnique = () => {
    return (
        <div className="standardBlankContainer">
            <SeoData
                description="uSync isn't your standard esports website — it's an aggregator that brings leagues, LANs, tournaments, wagers, and more into one easy-to-use hub."
                canonicalPath={"/more/articles/why-usync-is-unique"}
            />
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                        <div>
                            <p className="articleHeaderText">
                                <Link to={"/"} className="articleLink">Home</Link> {" > "}
                                <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                                Why uSync Is Like No Other Esports Platform
                            </p>
                        </div>
                        <h1>Why uSync Is Like No Other Esports Platform</h1>
                        <img src="https://i.imgur.com/PbSPBiB.jpg" alt="uSync Esports Hub" className="expandArticleImage" />
                        <p className="ital">Image Credit: uSync</p>

                        <h3>Not Your Standard Esports Website</h3>
                        <p>
                            <a href="https://www.usync.gg" className="articleLink" target="_blank" rel="noreferrer">www.usync.gg</a> is not your standard esports website… it's much more. Typically, esports websites have fallen into one or two main categories: OLTs (Online Tournaments) — where players pay money to enter into tournaments against one another for a cash prize — or OLLs (Online Leagues) — in which players enter and play weekly matches and eventually playoffs to be crowned champion. uSync isn't like those — it is those and more combined into one platform.
                        </p>

                        <br />

                        <h3>An Aggregator Built for Players</h3>
                        <p>
                            uSync is essentially an aggregator of esports events. Whether it be leagues, LANs, tournaments, or wagers, uSync has them all on their website and in an easy-to-understand format. uSync does not host events like other sites but rather finds all of the possible events for players to enter and showcases them on the website so players can find exactly the right competition for their tastes. No more searching across the internet or using AI to try and come up with ideas — uSync has what you are looking for and more.
                        </p>

                        <br />

                        <h3>A Win for Event Hosters Too</h3>
                        <p>
                            Esport event hosters love uSync as well. Instead of relying on word of mouth or for a social media post to go viral about their event, they now have a form of marketing that allows for Google searches and for passionate players to easily find them. They can save money on marketing while simultaneously finding higher quality entrants. uSync also offers lower fees than all other competitors so players can enter events for cheaper than ever before!
                        </p>

                        <br />

                        <h3>The Possibilities Are Endless</h3>
                        <p>
                            uSync isn't like other esport platforms — it is much much more. Visit{" "}
                            <a href="https://www.usync.gg" className="articleLink" target="_blank" rel="noreferrer">www.usync.gg</a>{" "}
                            to learn more about esports events that you may want to enter or showcase — the possibilities are endless!
                        </p>
                    </div>
                </div>

                <div className="articleSectionTwo">
                    <ArticleImages />
                </div>
            </div>

            <h1 className="otherArticles">OTHER ARTICLES</h1>
            <EventTypeImages page={"Article"} articleName="Why uSync Is Like No Other Esports Platform" />
        </div>
    );
}
