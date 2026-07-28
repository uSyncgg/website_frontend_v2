import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "Choose your game, region, and format first, then find a reputable event with written rules and a clear organizer contact.",
    "Registration reserves your place; check-in confirms you're present, and many brackets remove players who miss the check-in window.",
    "Save score screenshots and replays after every match in case the organizer requires reporting or dispute evidence.",
];

const faqs = [
    {
        question: "Can beginners join online gaming tournaments?",
        answer: "Yes. Look for amateur, community, beginner, rank-capped, or open events and confirm the eligibility rules.",
    },
    {
        question: "Do online gaming tournaments cost money?",
        answer: "Some are free and others charge an entry fee. Review the organizer, rules, refund policy, prize terms, age requirements, and local restrictions before paying.",
    },
    {
        question: "Do I need a full team before registering?",
        answer: "Not for solo events. Some team tournaments provide free-agent channels, but do not assume the organizer will build a team for you.",
    },
    {
        question: "Where can I find online esports tournaments?",
        answer: "Browse uSync to search tournaments, leagues, LANs, wagers, and head-to-head opportunities across games.",
    },
];

export const JoinOnlineTournament = () => {
    return (
        <ArticleLayout article={articles.joinOnlineTournament} takeaways={takeaways} faqs={faqs}>
            <p>
                To join an online gaming tournament, choose your game and region, find a reputable event, read the rules, confirm your
                eligibility, register your account or team, complete check-in, and join the required match lobby or communications
                server on time. Save screenshots or replays in case the organizer requires score reporting or dispute evidence.
            </p>

            <h2>Step 1: Decide What Kind of Event You Want</h2>
            <p>Choose your game, platform, region, and format before searching. A useful checklist:</p>
            <ul>
                <li>Game and mode</li>
                <li>PC, PlayStation, Xbox, Switch, or cross-platform</li>
                <li>Solo, duo, or team</li>
                <li>Casual, amateur, ranked, or open skill level</li>
                <li>Free entry or paid entry</li>
                <li>One-day bracket or multi-week league</li>
            </ul>
            <p>These filters prevent you from registering for an event you cannot actually play.</p>

            <h2>Step 2: Find a Reputable Tournament</h2>
            <p>
                Use <Link to="/">uSync</Link> to browse <Link to="/tournaments">esports tournaments</Link> and other competitive events
                in one place. Compare the event date, game, region, format, fee, prize, and registration deadline. Regardless of the
                source, the event should lead to written rules and a clear organizer contact.
            </p>

            <h2>Step 3: Read the Entire Rules Page</h2>
            <p>Before registering, confirm:</p>
            <ul>
                <li>Your region and age are eligible</li>
                <li>Your rank falls within any limits</li>
                <li>Your platform and input device are allowed</li>
                <li>Your account meets level, verification, or good-standing requirements</li>
                <li>You understand the bracket format and match schedule</li>
                <li>You can use the required voice or text communication platform</li>
                <li>You understand the score-reporting and dispute process</li>
            </ul>
            <p>
                If prizes or entry fees are involved, also review the payment, refund, tax, identity-verification, and geographic
                restrictions. Minors should involve a parent or guardian.
            </p>

            <h2>Step 4: Register Yourself or Your Team</h2>
            <p>
                Create the required tournament account and use the same in-game name the organizer expects. For team events, appoint one
                captain to manage registration and communication. Add every required player before roster lock. Confirm spelling,
                platform IDs, substitutes, and cross-platform identifiers, because a small typo can prevent an organizer or opponent from
                finding the correct account.
            </p>

            <h2>Step 5: Prepare Your Connection and Game Client</h2>
            <p>At least one day before the event:</p>
            <ul>
                <li>Install all game and system updates</li>
                <li>Confirm two-factor authentication and login access</li>
                <li>Use wired internet when possible</li>
                <li>Restart the router if you have recurring connection issues</li>
                <li>Close large downloads and background applications</li>
                <li>Test your microphone and required communications app</li>
                <li>Save the rules, bracket, and organizer contact</li>
            </ul>
            <p>Do not wait until check-in to discover a large game update.</p>

            <h2>Step 6: Check In Early</h2>
            <p>
                Registration and check-in are different. Registration reserves your place; check-in confirms that you are present. Many
                brackets remove players who miss the check-in window. Join the organizer's required server, open the bracket, and be
                ready 15–30 minutes early. Follow only the lobby and server instructions posted by the organizer.
            </p>

            <h2>Step 7: Play, Report, and Keep Evidence</h2>
            <p>After each match:</p>
            <ul>
                <li>Capture the final score screen</li>
                <li>Save a replay or VOD if the rules request it</li>
                <li>Report the score through the official bracket process</li>
                <li>Stay available until the result is confirmed</li>
                <li>Contact an admin calmly if the opponent reports a conflicting result</li>
            </ul>
            <p>Never edit evidence. Provide the original screenshot or recording and let the tournament admin apply the rules.</p>

            <h2>Common First-Tournament Mistakes</h2>
            <ul>
                <li>Registering without reading region or platform restrictions</li>
                <li>Missing check-in</li>
                <li>Using an unapproved substitute</li>
                <li>Changing an in-game name after registration</li>
                <li>Installing updates at start time</li>
                <li>Contacting an opponent through the wrong channel</li>
                <li>Leaving before the reported result is accepted</li>
            </ul>
            <p>Avoiding these errors matters more in a first event than building a perfect pre-match routine.</p>
        </ArticleLayout>
    );
}
