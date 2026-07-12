import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "Esports is a multi-billion-dollar industry, but barriers to entry still prevent the community from reaching its full potential.",
    "A centralized hub for events makes it easier for players to compete and for hosts to attract committed players.",
    "uSync verifies events and improves visibility, creating a smoother path for beginners into competitive esports.",
];

const faqs = [
    {
        question: "What is the biggest challenge facing esports today?",
        answer: "The biggest challenge is the lack of a centralized platform. Leagues, tournaments, and events are spread across many websites, which creates barriers for players trying to compete and for hosts trying to reach an audience.",
    },
    {
        question: "How does uSync help beginner players get into esports?",
        answer: "uSync creates a smoother path into competitive play by making it easy to discover leagues and tournaments across skill levels, so beginners can find well-organized, engaging competitions that fit where they are.",
    },
    {
        question: "How does uSync help tournament hosts?",
        answer: "uSync gives hosts better event visibility by connecting them with a larger audience of committed players, and its verification system helps keep events organized and transparent.",
    },
];

export const HowEsportsCanBeBetter = () => {
    return (
        <ArticleLayout article={articles.howEsportsCanBeBetter} takeaways={takeaways} faqs={faqs}>
            <p>
                Esports has come a long way, evolving into a multi-billion-dollar industry with millions of fans worldwide.
                From League of Legends esports to Valorant esports, the competitive gaming scene is stronger than ever. However,
                there's still room for growth, both for the community and the industry at large. The biggest challenge lies in unifying
                esports under a centralized platform that benefits players, teams, and organizations alike. That's where uSync comes in.
            </p>

            <h2>A Centralized Hub for Esports Events</h2>
            <p>
                uSync changes the game by offering a centralized esports hub where players and organizations can easily discover and join
                competitive events. Whether you're a die-hard Rocket League esports player, looking for a solidified Call of Duty league,
                or trying to keep up with the latest tournaments, uSync has everything.
            </p>

            <h2>How uSync Strengthens the Esports Community</h2>
            <p>
                The esports community is built on passion, but it's also filled with barriers that prevent growth. Finding competitive
                leagues, casual tournaments, or upcoming events shouldn't be an exhausting process. Through uSync, players can:
            </p>
            <ul>
                <li>
                    Discover and join plenty of <Link to="/leagues">leagues</Link> across top esports games like League of Legends,
                    Valorant, Counter-Strike 2, and many more.
                </li>
                <li>
                    Find high-quality upcoming <Link to="/tournaments">tournaments</Link> in one place, alongside plenty of other features.
                </li>
                <li>
                    Take an easier path into competitive play — uSync makes it simple for tournament hosts to attract new players,
                    keeping competitions active, well-organized, and engaging for all skill types.
                </li>
            </ul>

            <h2>How uSync Improves the Esports Industry</h2>
            <ul>
                <li>
                    <strong>Better event visibility</strong> — Many competitive platforms lack proper event discovery. uSync helps hosts
                    connect with a larger audience and attract committed players.
                </li>
                <li>
                    <strong>Stronger competitive structure</strong> — uSync ensures that verified esports events are better organized
                    and more transparent.
                </li>
                <li>
                    <strong>A home for esports events</strong> — Instead of searching through multiple platforms, players can find
                    verified and high-quality hosted events all in one place.
                </li>
            </ul>

            <h2>The Future of Esports With uSync</h2>
            <p>
                From helping players join leagues to providing better visibility for tournament hosts, uSync is the missing piece in the
                esports puzzle. If esports is to reach its full potential, it must be more accessible, streamlined, and community-driven —
                and uSync is leading that change.
            </p>
            <p>
                Join uSync today and be part of the next evolution of esports.
            </p>
        </ArticleLayout>
    );
}
