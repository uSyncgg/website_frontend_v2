import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "Start at 1.00–1.05 stick sensitivity with a 0.90–1.00 ADS multiplier, and use the lowest deadzone that doesn't cause drift.",
    "Use Tactical layout (or Default with back buttons) so you can slide, crouch, and dive without leaving the aiming stick.",
    "Keep both aim assist settings on, turn motion blur off, and test every change in a private match before Ranked Play.",
];

const faqs = [
    {
        question: "What sensitivity do pro BO7 players use?",
        answer: "Competitive players use different values based on controller, role, and personal mechanics. Treat a pro setting as a starting point, not a prescription.",
    },
    {
        question: "Should BO7 deadzones be set to zero?",
        answer: "Only if your controller produces no unwanted movement. The correct minimum is the lowest value that does not create stick drift.",
    },
    {
        question: "Is Tactical better than Default?",
        answer: "Tactical can make sliding and crouching easier without back buttons. Default can be just as effective with paddles or a claw grip.",
    },
];

export const BlackOps7Settings = () => {
    return (
        <ArticleLayout article={articles.blackOps7Settings} takeaways={takeaways} faqs={faqs}>
            <p>
                A strong Black Ops 7 controller baseline is Tactical or Default Flipped layout, 1.00–1.05 horizontal and vertical
                sensitivity, a 0.90–1.00 ADS multiplier, the lowest stick minimum deadzone that does not cause drift, Target Aim Assist
                on, ADS Aim Assist on, and motion blur off. Test every change in a private match before entering Ranked Play.
            </p>
            <p>
                There is no universal sensitivity that fits every player, controller, and thumb. The best settings are a stable starting
                point that you can adjust without changing five variables at once.
            </p>

            <h2>The Best BO7 Controller Settings at a Glance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Setting</th>
                        <th>Recommended Starting Point</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Button layout</td><td>Tactical, or Default Flipped if you prefer bumpers for firing</td></tr>
                    <tr><td>Horizontal stick sensitivity</td><td>1.00–1.05</td></tr>
                    <tr><td>Vertical stick sensitivity</td><td>1.00–1.05</td></tr>
                    <tr><td>ADS sensitivity multiplier</td><td>0.90–1.00</td></tr>
                    <tr><td>Left stick minimum deadzone</td><td>Start at 5; raise only if the stick drifts</td></tr>
                    <tr><td>Right stick minimum deadzone</td><td>Start at 5; raise only if the camera drifts</td></tr>
                    <tr><td>Left/right stick maximum</td><td>99</td></tr>
                    <tr><td>L2/LT and R2/RT deadzone</td><td>0–3 if your controller registers cleanly</td></tr>
                    <tr><td>ADS sensitivity transition timing</td><td>Instant</td></tr>
                    <tr><td>Target Aim Assist</td><td>On</td></tr>
                    <tr><td>ADS Aim Assist</td><td>On</td></tr>
                    <tr><td>Aim Down Sight behavior</td><td>Hold</td></tr>
                    <tr><td>World motion blur</td><td>Off</td></tr>
                    <tr><td>Weapon motion blur</td><td>Off</td></tr>
                    <tr><td>Field of view</td><td>100–105 as a practical starting range</td></tr>
                </tbody>
            </table>

            <h2>Step 1: Choose a Layout That Supports Movement</h2>
            <p>
                Use <strong>Tactical</strong> if you want crouch, slide, and dive on the right stick. That lets you move without taking
                your thumb off the aiming stick. If you use a controller with back buttons, Default can still work well because you can
                map movement actions to the paddles.
            </p>
            <p>
                Use <strong>Default Flipped</strong> if you prefer firing with L1/R1 or LB/RB. Bumpers have less physical travel than
                triggers, which can make firing feel more immediate. This is preference, not a guaranteed competitive advantage.
            </p>

            <h2>Step 2: Set a Controllable Sensitivity</h2>
            <p>
                Start horizontal and vertical sensitivity at <strong>1.00</strong>. Play for several minutes before changing it. If you
                consistently stop short of a target, increase sensitivity by 0.05. If you swing past targets, decrease it by 0.05.
            </p>
            <p>
                If hip-fire movement feels right but aiming down sights feels too fast, lower only the ADS multiplier. Do not change
                sensitivity after every missed shot. Test one setting for at least two or three matches so your hands have time to adapt.
            </p>

            <h2>Step 3: Find the Lowest Deadzone Without Drift</h2>
            <p>
                A deadzone is the amount you must move a stick before the game registers input. A lower minimum deadzone feels more
                responsive, but setting it too low can cause your character or camera to move on its own.
            </p>
            <p>
                Open <strong>Settings &gt; Controller &gt; Deadzone Inputs</strong>. Set the minimum deadzone to 5. Let go of the stick
                completely and watch for movement or camera drift. If it drifts, raise the value one point at a time until it stops.
                Repeat for both sticks — your left and right minimum deadzones do not need to match.
            </p>

            <h2>Step 4: Keep Aim Assist On, Then Learn Its Range</h2>
            <p>
                Set Target Aim Assist and ADS Aim Assist to On. Aim assist can help controller input feel consistent, but it does not
                replace centering. Keep your crosshair near the place an enemy is likely to appear before the fight begins.
            </p>

            <h2>Step 5: Remove Visual Clutter</h2>
            <p>
                Turn World Motion Blur and Weapon Motion Blur off. Start with an FOV around 100–105 if you sit near a monitor. A wider
                view shows more of the environment, but targets also appear smaller — max FOV is not automatically best.
            </p>

            <h2>How to Test the Settings Correctly</h2>
            <p>
                Create a private Free-For-All match with recruit bots. Use the same weapon for the entire test. Track a moving bot
                without firing, snap between two fixed objects, and fire at close, medium, and long range. Adjust only one value at a
                time, then repeat the same test. Once the settings feel predictable, stop tuning and play — consistency builds aim
                better than a permanently moving settings menu.
            </p>

            <h2>Turn the Settings Into Competition</h2>
            <p>
                Once your controls feel consistent, put them under real pressure. <Link to="/">uSync</Link> helps players find{" "}
                <Link to="/tournaments">esports tournaments</Link>, <Link to="/lans">LANs</Link>,{" "}
                <Link to="/games/call-of-duty/leagues">leagues</Link>, wagers, and head-to-head events without hunting across
                scattered sites.
            </p>
        </ArticleLayout>
    );
}
