import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "uSync combines leagues, LANs, online tournaments, wagers, and head-to-head matches into one centralized hub.",
    "Players no longer need to dig through multiple websites, Discord servers, and social media posts to find their next competition.",
    "The platform supports every level of play, from beginners honing their skills to organizations running professional-level events.",
];

const faqs = [
    {
        question: "How does uSync reduce the time it takes to find events?",
        answer: "Instead of searching across multiple websites, Discord servers, and social media posts, uSync consolidates leagues, LANs, tournaments, and head-to-head matches into one searchable platform, so you can discover and join events in minutes.",
    },
    {
        question: "Is uSync only for professional players?",
        answer: "No. uSync supports all levels of competition — from beginner and amateur players looking to improve, to teams and organizations seeking professional-level structured leagues, casual head-to-heads, and secure wagers.",
    },
    {
        question: "Can I find local LAN events on uSync?",
        answer: "Yes. uSync makes LAN event discovery seamless by connecting players to the best local and online events, so you no longer need to search 'LANs near me' across scattered event pages.",
    },
];

export const HowWeFixIt = () => {
    return (
        <ArticleLayout article={articles.howWeFixIt} takeaways={takeaways} faqs={faqs}>
            <p>
                The esports industry has long suffered from fragmentation, making it challenging for players,
                teams, and organizations to navigate the competitive landscape. At uSync, we have developed a
                game-changing platform that unites the esports community and provides the space needed for long-term success.
            </p>

            <h2>Unifying the Esports Landscape</h2>
            <p>
                The biggest issue in esports today is the lack of a centralized hub. Instead of users being forced to search through
                multiple sites to find the right tournaments, leagues, or head-to-head matches, uSync combines it all into one platform.
                By integrating every key aspect of competitive gaming, we ensure that players, teams, and coaches can easily find
                opportunities that match their needs. We provide you with the best of both worlds in terms of searching for and verifying
                your next league, LAN, tournament, or more.
            </p>

            <h2>Reducing Search Time</h2>
            <p>
                Before uSync, finding the right competition required hours of searching across multiple websites, Discord servers, and
                social media posts. If you've ever typed "where to find local esports tournaments" or "how to join a LAN and esports
                league", you understand the struggle. Our platform cuts down search time significantly, allowing users to discover and
                join esports events effortlessly.
            </p>

            <h2>Supporting All Levels of Competition</h2>
            <p>
                From beginner or amateur players looking to hone their skills to esports organizations seeking professional-level events,
                uSync provides every level of competition. We offer structured <Link to="/leagues">leagues</Link>, casual head-to-heads,
                and secure wagers, ensuring that players and teams of all skill levels have a place to grow and compete.
            </p>

            <h2>Helping You Find the Best LANs and Events</h2>
            <p>
                For players searching for "LANs near me", "local gaming tournaments", or "how to compete in esports", uSync offers an
                easy-to-use platform that connects players to the best local and online events. We make{" "}
                <Link to="/lans">LAN event discovery</Link> seamless and competition entry effortless, ensuring that every esports player
                can find the right opportunity to showcase their skills.
            </p>

            <h2>The Future of Esports Is Here</h2>
            <p>
                Esports is evolving, and uSync is leading the charge. Our mission is to eliminate the disorganization of the industry,
                build a strong competitive environment, and create a centralized esports hub that caters to players, teams, coaches, and
                organizations alike. With our platform and commitment to community building, uSync is setting a new standard for how
                esports should operate.
            </p>
            <p>
                By bringing everything under one roof, we make esports simpler, faster, and more accessible than ever before.
                If you've been searching for LAN events, competitive tournaments, or reliable esports networking, look no further — join
                uSync today and be part of the revolution in centralized esports competition.
            </p>
        </ArticleLayout>
    );
}
