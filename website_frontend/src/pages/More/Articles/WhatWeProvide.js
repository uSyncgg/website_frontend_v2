import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "uSync is a one-stop hub for esports: leagues, LANs, online tournaments, wagers, and head-to-head competition.",
    "Verified hosts provide fair payouts, fair rules, unbiased admins, and a safe environment to compete in.",
    "All major esports events are consolidated into one easy-to-navigate system, with no more endless Google searches.",
];

const faqs = [
    {
        question: "What kinds of events can I find on uSync?",
        answer: "uSync features leagues, LAN events, online tournaments, wagers, and head-to-head competitions across major esports titles, all consolidated into one searchable platform.",
    },
    {
        question: "What does it mean for a host to be verified on uSync?",
        answer: "Verified hosts on uSync are organizers you can trust to deliver fair payouts, fair rules, and unbiased admins, creating a safe environment for competitive play.",
    },
    {
        question: "How do I find LAN tournaments near me?",
        answer: "uSync consolidates major LAN events into one system, so instead of bouncing between event websites and social media pages you can browse local and online events directly on the platform.",
    },
];

export const WhatWeProvide = () => {
    return (
        <ArticleLayout article={articles.whatWeProvide} takeaways={takeaways} faqs={faqs}>
            <p>
                At uSync, we are revolutionizing the way the esports community connects, competes, and thrives.
                We provide a one-stop hub for everything esports, eliminating the need for players, teams, coaches,
                and organizations to search across multiple platforms. Our platform simplifies the entire esports ecosystem
                by concentrating tournaments, events, and competitions all into one place.
            </p>

            <h2>Platforming Tournaments</h2>
            <p>
                uSync offers a fully integrated tournament hosting system, featuring <Link to="/leagues">leagues</Link>,{" "}
                <Link to="/lans">LANs</Link>, <Link to="/tournaments">online tournaments</Link>, and wagers.
                If you've ever searched for "how to find local LAN tournaments" or "where to compete in esports", uSync makes it easy
                to discover and participate in these sought-after competitive events. Say goodbye to endless Google searches. uSync
                provides a smart, searchable platform for ongoing and upcoming events all in one space.
            </p>

            <h2>Verified Hosting and Secure Competition</h2>
            <p>
                Unlike other platforms, uSync provides a safe, verified environment for esports competition. At uSync, we have a variety
                of <Link to="/more/verification">verified hosts</Link> you can trust to complete fair payouts, fair rules, unbiased
                admins, and an overall safe-to-play environment for those who want to improve their skill.
            </p>

            <h2>Helping You Find LANs Near You</h2>
            <p>
                For anyone typing "LANs near me", "local Call of Duty tournaments", or "how to join a LAN event" into Google, uSync is
                the answer you are looking for. Instead of bouncing between different event websites and social media pages, our platform
                consolidates all major esports events into one easy-to-navigate system. We make LAN event discovery seamless and
                competition entry effortless, ensuring that every esports player can find the right opportunity to showcase their skills.
            </p>

            <h2>A New Standard for Esports</h2>
            <p>
                By providing a tuned, all-in-one solution, uSync is setting a new standard for accessibility and engagement in esports.
                We are committed to bridging the gaps in the industry, ensuring that players, teams, and professionals connect, compete,
                and grow like never before.
            </p>
        </ArticleLayout>
    );
}
