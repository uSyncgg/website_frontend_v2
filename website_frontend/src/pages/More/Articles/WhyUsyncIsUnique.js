import { Link } from "react-router";
import { ArticleLayout } from "components";
import { articles } from "./articlesData";

const takeaways = [
    "Most esports sites are either online tournament platforms or online league platforms — uSync combines both and more.",
    "uSync aggregates leagues, LANs, tournaments, and wagers from across the internet into one easy-to-understand format.",
    "Event hosts get free discoverability and higher-quality entrants, while players pay lower fees than on other platforms.",
];

const faqs = [
    {
        question: "Does uSync host its own esports events?",
        answer: "No. uSync is an aggregator: it finds leagues, LANs, tournaments, and wagers from across the esports scene and showcases them in one place, so players can find exactly the right competition for their tastes.",
    },
    {
        question: "How is uSync different from other esports websites?",
        answer: "Typical esports websites are either online tournament platforms or online league platforms. uSync combines leagues, LANs, tournaments, wagers, and head-to-head events into a single hub instead of specializing in just one format.",
    },
    {
        question: "Why do event hosts use uSync?",
        answer: "Instead of relying on word of mouth or viral social media posts, hosts listed on uSync become discoverable through search, reaching passionate players while saving money on marketing and attracting higher-quality entrants.",
    },
];

export const WhyUsyncIsUnique = () => {
    return (
        <ArticleLayout article={articles.whyUsyncIsUnique} takeaways={takeaways} faqs={faqs}>
            <p>
                uSync is not your standard esports website… it's much more. Typically, esports websites have fallen into one or two main
                categories: OLTs (Online Tournaments) — where players pay money to enter into tournaments against one another for a cash
                prize — or OLLs (Online Leagues) — in which players enter and play weekly matches and eventually playoffs to be crowned
                champion. uSync isn't like those — it is those and more combined into one platform.
            </p>

            <h2>An Aggregator Built for Players</h2>
            <p>
                uSync is essentially an aggregator of esports events. Whether it be <Link to="/leagues">leagues</Link>,{" "}
                <Link to="/lans">LANs</Link>, <Link to="/tournaments">tournaments</Link>, or wagers, uSync has them all on the website
                and in an easy-to-understand format. uSync does not host events like other sites but rather finds all of the possible
                events for players to enter and showcases them on the website so players can find exactly the right competition for
                their tastes. No more searching across the internet or using AI to try and come up with ideas — uSync has what you are
                looking for and more.
            </p>

            <h2>A Win for Event Hosts Too</h2>
            <p>
                Esports event hosts love uSync as well. Instead of relying on word of mouth or for a social media post to go viral about
                their event, they now have a form of marketing that allows for Google searches and for passionate players to easily find
                them. They can save money on marketing while simultaneously finding higher quality entrants. uSync also offers lower fees
                than all other competitors, so players can enter events for cheaper than ever before!
            </p>

            <h2>The Possibilities Are Endless</h2>
            <p>
                uSync isn't like other esports platforms — it is much, much more. Explore <Link to="/games">esports events</Link> that
                you may want to enter or <Link to="/more/eventhost">showcase your own</Link> — the possibilities are endless!
            </p>
        </ArticleLayout>
    );
}
