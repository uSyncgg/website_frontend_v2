import { Link } from "react-router";
import { SeoData, EventTypeImages, ArticleImages } from "components";

export const ValorantDPI = () => {
    return (
        <div className="standardBlankContainer">
            <SeoData
                description="Learn the best starting DPI for VALORANT, calculate eDPI, and tune your sensitivity with a simple repeatable test."
                canonicalPath={"/more/articles/best-dpi-valorant-sensitivity"}
            />
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                        <div>
                            <p className="articleHeaderText">
                                <Link to={"/"} className="articleLink">Home</Link> {" > "}
                                <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                                Best DPI for VALORANT
                            </p>
                        </div>
                        <h1>Best DPI for VALORANT and How to Find Your Sensitivity</h1>
                        <img src="https://i.imgur.com/AVvF0gH.jpg" alt="VALORANT" className="expandArticleImage" />

                        <h3>DPI, Sensitivity, and eDPI Explained</h3>
                        <p>
                            Start with 800 DPI and an in-game sensitivity of 0.25 to 0.40, giving you an eDPI of 200 to 320. Then adjust in small increments until you can make a controlled 180-degree turn while still correcting accurately at long range.
                        </p>

                        <br />

                        <p>
                            DPI is the mouse's hardware sensitivity. In-game sensitivity is VALORANT's software multiplier. eDPI combines them so two setups can be compared:
                        </p>
                        <p><strong>eDPI = mouse DPI × in-game sensitivity</strong></p>
                        <p>
                            For example, 800 DPI at 0.30 sensitivity equals 240 eDPI. A player at 400 DPI and 0.60 sensitivity also uses 240 eDPI. Their cursor behavior outside the game may differ, but their effective in-game sensitivity is comparable.
                        </p>

                        <br />

                        <h3>A Reliable Starting Setup</h3>

                        <table className="articleTable">
                            <thead>
                                <tr>
                                    <th>Setting</th>
                                    <th>Starting Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Mouse DPI</td><td>800</td></tr>
                                <tr><td>VALORANT sensitivity</td><td>0.30</td></tr>
                                <tr><td>Resulting eDPI</td><td>240</td></tr>
                                <tr><td>Scoped sensitivity multiplier</td><td>1.0</td></tr>
                                <tr><td>Windows pointer speed</td><td>6/11</td></tr>
                                <tr><td>Enhance pointer precision</td><td>Off</td></tr>
                                <tr><td>Mouse polling rate</td><td>1,000 Hz if stable</td></tr>
                            </tbody>
                        </table>

                        <br />

                        <h3>Step 1: Measure Your Usable Mouse Space</h3>
                        <p>
                            Place your mouse in the center of the space you normally use. Swipe comfortably from one side to the other. You should be able to turn far enough to react behind you without lifting the mouse repeatedly, but ordinary aiming should not feel twitchy.
                        </p>
                        <p>
                            Players with small mousepads may need a slightly higher sensitivity. Players with large desk space can usually use more arm movement and a lower sensitivity.
                        </p>

                        <br />

                        <h3>Step 2: Start at 240 eDPI</h3>
                        <p>
                            Set the mouse to <strong>800 DPI</strong> and VALORANT sensitivity to <strong>0.30</strong>. Leave the scoped multiplier at 1.0 while establishing your base aim. If your mouse only supports 400 DPI, use 0.60 to produce the same 240 eDPI.
                        </p>

                        <br />

                        <h3>Step 3: Run the Range Test</h3>
                        <p>
                            Enter the Practice Range and use the same rifle throughout. Place the crosshair on one bot's head, flick to a second bot, and note whether you stop before or after the target. Track a bot smoothly while strafing and practice a controlled 180-degree turn.
                        </p>
                        <p>
                            If you regularly overshoot, reduce in-game sensitivity by 0.02. If you regularly undershoot or cannot turn comfortably, raise it by 0.02.
                        </p>

                        <br />

                        <h3>Step 4: Validate It in Real Matches</h3>
                        <p>
                            The Practice Range removes pressure, movement, and unusual angles. Play Deathmatch or Team Deathmatch and watch for patterns across several fights. Missing tiny long-range corrections suggests sensitivity may be too high. Running out of mousepad while clearing corners suggests it may be too low.
                        </p>
                        <p>
                            One bad match proves almost nothing. Keep the same setting for several sessions before making another small change.
                        </p>

                        <br />

                        <h3>Step 5: Save the Value and Stop Chasing Pro Settings</h3>
                        <p>
                            Copying a professional player's DPI does not copy their desk space, mouse weight, grip, posture, or years of practice. Once your sensitivity lets you turn comfortably and make small corrections, stability matters more than finding a supposedly perfect number.
                        </p>

                        <br />

                        <h3>Frequently Asked Questions</h3>
                        <p><strong>Is 800 DPI good for VALORANT?</strong></p>
                        <p>Yes. It is a flexible starting point and makes eDPI easy to calculate. It is not inherently more accurate than every other DPI.</p>

                        <br />

                        <p><strong>Is lower sensitivity always better?</strong></p>
                        <p>No. Very low sensitivity can improve fine control but may make turning and clearing angles difficult. Your usable mouse space sets a practical lower limit.</p>

                        <br />

                        <p><strong>What is a good VALORANT eDPI?</strong></p>
                        <p>Try 200–320 as a starting band, then tune for control and movement. Your best value is the one you can reproduce under pressure.</p>

                        <br />

                        <h3>Put Your Aim to Work</h3>
                        <p>
                            When you are ready to move beyond the range and ranked queue, browse{" "}
                            <Link to={"/"} className="articleLink">uSync</Link>{" "}
                            for competitive gaming events, leagues, LANs, and tournaments.
                        </p>
                    </div>
                </div>

                <div className="articleSectionTwo">
                    <ArticleImages />
                </div>
            </div>

            <h1 className="otherArticles">OTHER ARTICLES</h1>
            <EventTypeImages page={"Article"} articleName="Best DPI for VALORANT" />
        </div>
    );
}
