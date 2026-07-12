import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "Esports is a billion-dollar industry, yet events, leagues, and tournaments remain scattered across dozens of disconnected websites.",
    "Fragmentation makes it harder for players, teams, and coaches to find opportunities — and slows the industry's growth.",
    "uSync centralizes leagues, LANs, online tournaments, wagers, and head-to-head competition into one platform.",
];

const faqs = [
    {
        question: "Why is esports so fragmented?",
        answer: "Tournaments and leagues are run by many different organizers, each with their own website, format, rules, and registration process. There has never been a single hub that brings them together, so players are forced to search across multiple platforms to find events.",
    },
    {
        question: "How do I find esports tournaments or LANs near me?",
        answer: "Instead of searching individual organizer sites one by one, you can use uSync to browse leagues, LANs, online tournaments, and head-to-head events for major titles like Call of Duty, Valorant, Rocket League, and more — all in one place.",
    },
    {
        question: "What is uSync?",
        answer: "uSync is a unified esports platform that brings together leagues, LANs, online tournaments, wagers, and head-to-head competitions, saving players, teams, and coaches the time of searching across multiple websites.",
    },
];

export const ProblemWithEsports = () => {
    return (
        <ArticleLayout article={articles.problemWithEsports} takeaways={takeaways} faqs={faqs}>
            <p>
                Esports has grown into a billion-dollar industry, yet it remains deeply decentralized. Players, coaches, teams, and
                organizations struggle to find an all-in-one platform to build relationships, find opportunities, and grow their competitive
                careers. The lack of community and accessibility is one of the biggest issues facing the esports community today.
            </p>

            <h2>A Billion-Dollar Industry Without a Home</h2>
            <p>
                Often, you may find yourself searching things on Google such as "how do I join an esports tournament?" or "how do people
                join esports teams?" or even "how do I sign up for esports?" This is because there is no single, accessible platform that
                brings the competitive scene together — but with uSync, we're here to combine it all.
            </p>
            <p>
                Typically, anyone interested in esports is forced to look through multiple websites to find tournaments, leagues, or
                competitive events that aren't near you or aren't all in one place. Whether you're a player searching for a reliable
                competition, a team looking for recruits, or a coach scouting talent, the process is very inefficient and takes a lot of time.
            </p>

            <h2>Fragmentation Slows the Whole Industry Down</h2>
            <p>
                Esports is more compartmentalized than ever. Tournaments are scattered across various websites, each with different formats,
                rules, and registration processes. This lack of centralization makes it difficult for individuals and organizations to
                navigate the space efficiently. Instead of fostering collaboration and growth, this fragmentation slows down the industry's
                progress, making it harder for new and existing participants to engage with the competitive scene and allow it to grow.
            </p>

            <h2>Where uSync Comes In</h2>
            <p>
                If you've ever found yourself searching for "LANs near me" or "upcoming LANs near me," or just plainly struggling to locate
                local esports tournaments, you're not alone. This is where uSync comes in. Recognizing these problems, uSync has developed a
                unified esports platform designed to streamline the competitive experience for everyone involved.
            </p>
            <p>
                We offer a solution that brings together <Link to="/leagues">leagues</Link>, <Link to="/lans">LANs</Link>,{" "}
                <Link to="/tournaments">online tournaments</Link>, wagers, and head-to-head competitions all in one place, saving users
                time and effort while fostering a true esports community. You'll never have to search for LANs near you or worry about
                hunting down esports events across multiple sites. <strong>We Sync so uSync!</strong>
            </p>
        </ArticleLayout>
    );
}
