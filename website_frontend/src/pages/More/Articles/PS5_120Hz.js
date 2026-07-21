import { Link } from "react-router";
import { SeoData, EventTypeImages, ArticleImages } from "components";

export const PS5_120Hz = () => {
    return (
        <div className="standardBlankContainer">
            <SeoData
                title={"How to Enable 120Hz on PS5"}
                description="Enable 120Hz on PS5 in minutes. Follow the exact console, display, cable, and in-game steps, plus fixes when PS5 stays at 60Hz."
                canonicalPath={"/more/articles/how-to-enable-120hz-ps5"}
            />
            <div className="articleContainer">
                <div className="articleSectionOne">
                    <div className="articleTextContainer">
                        <div>
                            <p className="articleHeaderText">
                                <Link to={"/"} className="articleLink">Home</Link> {" > "}
                                <Link to={"/more/articles"} className="articleLink">Articles</Link> {" > "}
                                How to Enable 120Hz on PS5
                            </p>
                        </div>
                        <h1>How to Enable 120Hz on PS5 and Fix 120 FPS Problems</h1>
                        <img src="https://i.imgur.com/ivLdBog.png" alt="PS5 120Hz Setup" className="expandArticleImage" />

                        <h3>What You Need Before Changing Settings</h3>
                        <p>
                            Connect the PS5 directly to a 120Hz-capable display, then go to <strong>Settings &gt; Screen and Video &gt; Video Output &gt; 120 Hz Output</strong> and choose <strong>Automatic</strong>. Launch a game that supports 120 fps and enable its performance or 120Hz mode. The PS5 menu itself may still display at 60Hz.
                        </p>

                        <br />

                        <p>You need all four parts of the chain:</p>
                        <ul className="articleList">
                            <li>A PS5 game that supports a 120 fps mode</li>
                            <li>A TV or monitor that accepts a 120Hz signal at your chosen resolution</li>
                            <li>A compatible HDMI port and cable</li>
                            <li>The correct console and in-game settings</li>
                        </ul>
                        <p>
                            A "144Hz monitor" label does not guarantee that the display accepts 120Hz from a PS5 over HDMI. Check the monitor manual for its supported HDMI resolutions and refresh rates.
                        </p>

                        <br />

                        <h3>Step 1: Use the Correct HDMI Connection</h3>
                        <p>
                            Connect the PS5 directly to the display while troubleshooting. Use the HDMI cable included with the console or a certified Ultra High Speed HDMI cable when targeting 4K at 120Hz. Plug into the TV's 120Hz-capable HDMI port — some TVs support their full gaming bandwidth on only one or two ports, and that port may need an "Enhanced," "Deep Color," or similar setting enabled in the TV menu.
                        </p>

                        <br />

                        <h3>Step 2: Enable 120Hz Output on PS5</h3>
                        <p>
                            Open <strong>Settings</strong> from the PS5 home screen. Select <strong>Screen and Video</strong>, then <strong>Video Output</strong>. Set <strong>120 Hz Output</strong> to <strong>Automatic</strong>. Leave Resolution on Automatic, or choose a resolution you know the display supports at 120Hz. If your display supports 1440p, use Test 1440p Output to check its 60Hz and 120Hz modes.
                        </p>

                        <br />

                        <h3>Step 3: Choose Performance Mode</h3>
                        <p>
                            Go to <strong>Settings &gt; Saved Data and Game/App Settings &gt; Game Presets &gt; Performance Mode or Resolution Mode</strong>. Choose <strong>Performance Mode</strong>. This preference does not force every game to run at 120 fps — it tells supported games to favor performance when they provide the option.
                        </p>

                        <br />

                        <h3>Step 4: Enable 120Hz Inside the Game</h3>
                        <p>
                            Open the game's graphics or video menu and look for a setting such as: 120Hz Mode, 120 FPS Mode, High Frame Rate Mode, or Performance Mode. Enable it, then restart the game if prompted. Only games with a supported high-frame-rate mode can output 120 fps.
                        </p>

                        <br />

                        <h3>Step 5: Verify the Active Signal</h3>
                        <p>
                            Launch the game first. Then open <strong>Settings &gt; Screen and Video &gt; Video Output &gt; Current Video Output Signal</strong>. Verify that it reports 120Hz while the supported game is running. Do not rely on the PS5 home menu as the test.
                        </p>

                        <br />

                        <h3>PS5 Stuck at 60Hz? Try These Fixes in Order</h3>
                        <ul className="articleList">
                            <li>Confirm the game and the installed PS5 version support 120 fps</li>
                            <li>Enable the game's own 120Hz or performance option</li>
                            <li>Connect the console directly to the display, bypassing a receiver, splitter, soundbar, or capture card</li>
                            <li>Try the original PS5 HDMI cable</li>
                            <li>Move the cable to the display's 120Hz-capable port</li>
                            <li>Enable the display's enhanced HDMI or gaming input mode</li>
                            <li>Update the PS5 system software and display firmware</li>
                            <li>Test 1080p or 1440p at 120Hz if 4K 120Hz is unavailable</li>
                            <li>Set Video Transfer Rate back to Automatic</li>
                            <li>Power-cycle the console and display after changing HDMI settings</li>
                        </ul>

                        <br />

                        <h3>Frequently Asked Questions</h3>
                        <p><strong>Do all PS5 games run at 120 fps?</strong></p>
                        <p>No. The developer must include a 120 fps or high-frame-rate mode.</p>

                        <br />

                        <p><strong>Do I need HDMI 2.1 for 120Hz on PS5?</strong></p>
                        <p>HDMI 2.1 is needed for the full 4K 120Hz target. Some displays can accept 1080p or 1440p at 120Hz over other HDMI configurations. Check the display's official input specifications.</p>

                        <br />

                        <p><strong>Why does the PS5 menu show 60Hz?</strong></p>
                        <p>The console may switch to 120Hz only after a supported game starts. Verify the signal during gameplay.</p>

                        <br />

                        <h3>Ready for a Smoother Match?</h3>
                        <p>
                            Once the setup is working,{" "}
                            <Link to={"/"} className="articleLink">uSync</Link>{" "}
                            can help you find LANs, tournaments, leagues, and other competitive events where the extra responsiveness matters.
                        </p>
                    </div>
                </div>

                <div className="articleSectionTwo">
                    <ArticleImages />
                </div>
            </div>

            <h1 className="otherArticles">OTHER ARTICLES</h1>
            <EventTypeImages page={"Article"} articleName="How to Enable 120Hz on PS5" />
        </div>
    );
}
