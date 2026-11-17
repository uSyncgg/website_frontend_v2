import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";
import han86Base from 'assets/images/article_specific/article-mw4-han-86-base_10.24.26.webp';
import han86Build from 'assets/images/article_specific/article-mw4-han-86-build_10.24.26.webp';
import vel46Base from 'assets/images/article_specific/article-mw4-vel-46-base_10.24.26.webp';
import vel46Build from 'assets/images/article_specific/article-mw4-vel-46-build_10.24.26.webp';
import m4Base from 'assets/images/article_specific/article-mw4-m4-base_10.24.26.webp';
import m4Build from 'assets/images/article_specific/article-mw4-m4-build_10.24.26.webp';
import isoBase from 'assets/images/article_specific/article-mw4-iso-nightshade-base_10.24.26.webp';
import isoBuild from 'assets/images/article_specific/article-mw4-iso-nightshade-build_10.24.26.webp';
import castoffBase from 'assets/images/article_specific/article-mw4-castoff-762-base_10.24.26.webp';
import castoffBuild from 'assets/images/article_specific/article-mw4-castoff-762-build_10.24.26.webp';

const takeaways = [
    "The Han 86, VEL 46, M4, ISO Nightshade and Castoff 762 are the five builds to copy right now.",
    "Nearly every build runs a suppressor and a laser, trading recoil control for faster aim-down-sight speed.",
    "Every class shares the same kit: Claymores, Portable Radar, and Resupply, Ninja and Scavenger.",
];

const faqs = [
    {
        question: "What is the best gun in Modern Warfare 4 right now?",
        answer: "The M4 is the strongest all-round pick in this list, thanks to its very fast time to kill and controllable recoil. The ISO Nightshade is the top SMG.",
    },
    {
        question: "Should I use the Vizive 5 or the XRK Clutch LS?",
        answer: "The Vizive 5 gives bigger handling boosts but shows a visible beam while you aim. The XRK Clutch LS is weaker but hidden, so it suits slower, stealthier play.",
    },
    {
        question: "Why do these builds skip optics?",
        answer: "The M4 and VEL 46 have clean iron sights, so an optic would waste one of your five attachment slots. Add one if you prefer a cleaner sight picture.",
    },
];

export const MW4Loadouts = () => {
    return (
        <ArticleLayout article={articles.mw4Loadouts} takeaways={takeaways} faqs={faqs}>
            <p>
                Whether you want more kills in Team Deathmatch or more wins in objective modes, your loadout does a lot of the work.
                Modern Warfare 4 gives each weapon five attachment slots, and the right five can turn a slow rifle into a run-and-gun
                threat. The builds below come from{" "}
                <a href="https://www.youtube.com/watch?v=QnNxlKKB_Aw" target="_blank" rel="noopener noreferrer">this loadout video</a>,
                cleaned up and organized so you can set them up in Gunsmith fast.
            </p>

            <h2>1. Best Han 86 Loadout</h2>
            <img src={han86Base} alt="Han 86 in Modern Warfare 4" loading="lazy" />
            <p>The Han 86 is one of the easiest assault rifles in the game, with very low recoil and a fast time to kill. Built this way, you can hold the trigger at long range without burst firing.</p>
            <ol>
                <li><strong>Optic: Slimline Elite Mini Reflex.</strong> A clean sight picture for longer fights. Slide the rail position closest to you to cut visual recoil.</li>
                <li><strong>Laser: Vizive 5.</strong> Boosts sprint-to-fire speed, ADS speed and ADS gun bob. Prefer not to show a beam? Use the XRK Clutch LS for faster ADS with no visible laser.</li>
                <li><strong>Barrel: Han 86 Silenced Barrel.</strong> An integrated suppressor keeps you off the radar while adding muzzle velocity, damage range and recoil control.</li>
                <li><strong>Underbarrel: FSS TAC 90 Grip.</strong> Cuts idle sway and gun bob for steadier long-range shots.</li>
                <li><strong>Stock: L9P Fold Stock.</strong> Raises movement speed so the rifle feels less sluggish. Swap it for the Justice 2 rear grip if you want even faster ADS.</li>
            </ol>
            <img src={han86Build} alt="The finished Han 86 build in Gunsmith" loading="lazy" />
            <p>This is a true all-range rifle, so it works as a primary for almost any mode.</p>

            <h2>2. Best VEL 46 Loadout</h2>
            <img src={vel46Base} alt="VEL 46 in Modern Warfare 4" loading="lazy" />
            <p>The VEL 46 is the game's take on the MP7, and it hits closer to an assault rifle than an SMG. Its iron sights are clean, so you don't need to spend a slot on an optic.</p>
            <ol>
                <li><strong>Laser: Vizive 5.</strong> ADS speed matters most on an SMG, and this also speeds up sprint-to-fire. If you play slower and want to stay hidden, run the XRK Clutch LS.</li>
                <li><strong>Barrel: Series 11 Barrel.</strong> Adds damage range, muzzle velocity and recoil control so you can fight past point-blank range.</li>
                <li><strong>Muzzle: Crackdown Muzzle.</strong> A heavy suppressor that keeps you off the radar and improves damage range.</li>
                <li><strong>Rear Grip: LM Combat Grip.</strong> More ADS speed. The recoil penalty is covered by the barrel and muzzle.</li>
                <li><strong>Stock: VEL 46 Extended Stock.</strong> One more ADS speed boost for snappier close-range fights.</li>
            </ol>
            <img src={vel46Build} alt="The finished VEL 46 build in Gunsmith" loading="lazy" />
            <p>The result is an SMG/AR hybrid that wins fights at close and medium range.</p>

            <h2>3. Best M4 Loadout</h2>
            <img src={m4Base} alt="M4 in Modern Warfare 4" loading="lazy" />
            <p>The M4 is arguably the best assault rifle in Modern Warfare 4, with a very fast time to kill and controllable recoil. Skip the barrel slot entirely: every barrel option makes this gun worse.</p>
            <ol>
                <li><strong>Laser: SA L500.</strong> Faster ADS with no downsides on this weapon.</li>
                <li><strong>Muzzle: IS300.</strong> A suppressor that adds muzzle velocity, damage range and recoil control.</li>
                <li><strong>Underbarrel: Fireline Grip.</strong> Extra ADS recoil control on top of an already stable rifle.</li>
                <li><strong>Rear Grip: Phase Grip.</strong> Improves ADS and sprint-to-fire speed where the M4 is weakest.</li>
                <li><strong>Stock: ASP50 Stock.</strong> Raises movement speed. Prefer an optic? Drop the stock for the Slimline Elite and slide it closest to you.</li>
            </ol>
            <img src={m4Build} alt="The finished M4 build in Gunsmith" loading="lazy" />
            <p>The iron sights are strong enough to run without an optic. At extreme range, tap or burst fire to stay on target.</p>

            <h2>4. Best ISO Nightshade Loadout</h2>
            <img src={isoBase} alt="ISO Nightshade in Modern Warfare 4" loading="lazy" />
            <p>The ISO Nightshade is pitched as the strongest SMG on paper, and this build turns it into an AR hybrid that can still run and gun.</p>
            <ol>
                <li><strong>Laser: Vizive 5.</strong> Faster sprint-to-fire, faster ADS and less gun bob. Swap to the XRK Clutch LS to hide your beam.</li>
                <li><strong>Barrel: ZLR Carbon 900.</strong> Adds damage range, muzzle velocity and recoil control for medium- and long-range fights.</li>
                <li><strong>Muzzle: XRK Herder 40.</strong> A suppressor that improves firing stability. The small ADS penalty is offset by the laser and grip.</li>
                <li><strong>Underbarrel: FSS TAC 90 Grip.</strong> Reduces idle sway and gun bob for longer shots.</li>
                <li><strong>Rear Grip: Demo STP1.</strong> Brings back ADS speed for close-range fights. The recoil cost is covered by the rest of the build.</li>
            </ol>
            <img src={isoBuild} alt="The finished ISO Nightshade build in Gunsmith" loading="lazy" />
            <p>You only get 30 rounds, so avoid taking on multiple enemies at once.</p>

            <h2>5. Best Castoff 762 Loadout</h2>
            <img src={castoffBase} alt="Castoff 762 in Modern Warfare 4" loading="lazy" />
            <p>The Castoff 762 hits harder than the other rifles here, but its handling is slow. This build is about speeding it up without losing its punch.</p>
            <ol>
                <li><strong>Optic: Cronin 0K.</strong> Cleans up the sight picture for medium- and long-range fights. You can't adjust the rail position on this gun.</li>
                <li><strong>Barrel: FJX Ghostfire 16.3".</strong> An integrated suppressor plus better muzzle velocity and recoil control.</li>
                <li><strong>Underbarrel: FSS TAC 90 Grip.</strong> Removes as much sway and gun bob as possible.</li>
                <li><strong>Rear Grip: Mugi O YK1 Grip.</strong> Faster ADS and sprint-to-fire speed.</li>
                <li><strong>Stock: Castoff Dogfighter 27.</strong> Raises movement speed so the rifle doesn't feel stuck in the mud.</li>
            </ol>
            <img src={castoffBuild} alt="The finished Castoff 762 build in Gunsmith" loading="lazy" />
            <p>It's the pick if you want a heavier-hitting rifle for longer sightlines.</p>

            <h2>Best Perks, Equipment and Killstreaks</h2>
            <p>Run the same kit on all five classes. It's built to punish campers and keep your equipment stocked.</p>
            <table>
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Pick</th>
                        <th>Why</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Secondary</td><td>Sang 9mm</td><td>Reliable backup pistol</td></tr>
                    <tr><td>Melee</td><td>Knife</td><td>Standard</td></tr>
                    <tr><td>Tactical</td><td>Flash Grenade</td><td>Clears rooms before you push</td></tr>
                    <tr><td>Lethal</td><td>Claymore</td><td>Place in high-traffic or camping spots for easy kills</td></tr>
                    <tr><td>Field Upgrade</td><td>Portable Radar</td><td>Alerts you when someone is camping nearby</td></tr>
                    <tr><td>Perks</td><td>Resupply, Ninja, Scavenger</td><td>Claymores refill, silent footsteps, ammo from kills</td></tr>
                    <tr><td>Killstreaks</td><td>UAV, Crossfire, Advanced UAV</td><td>Personal preference</td></tr>
                </tbody>
            </table>
            <p>
                Ninja is the standout right now. Silent footsteps make it one of the strongest perks in the game, so expect most
                lobbies to run it.
            </p>

            <h2>Find the Best Loadout for You</h2>
            <p>
                Start with the M4 or Han 86 if you want a forgiving all-range rifle. Pick the VEL 46 or ISO Nightshade if you play
                aggressively, or the Castoff 762 for harder-hitting long-range fights. Test each one in the firing range, then take
                your favorite into a match and adjust the laser and stock to fit how you play.
            </p>
            <p>
                <em>Attachment names are taken from a video transcript and may be spelled slightly differently in game. Meta picks can
                change with each balance patch.</em>
            </p>

            <h2>Put Your Loadout to the Test</h2>
            <p>
                Once your class is dialed in, take it into real competition. <Link to="/">uSync</Link> helps players find{" "}
                <Link to="/tournaments">esports tournaments</Link>, <Link to="/lans">LANs</Link>,{" "}
                <Link to="/games/call-of-duty/leagues">leagues</Link>, wagers, and head-to-head events without hunting across
                scattered sites.
            </p>
        </ArticleLayout>
    );
}
