import { useState } from 'react';
import { SeoData } from "components";
import { Link } from "react-router";
import { FaChevronDown } from 'react-icons/fa';
import styles from './Faqs.module.css';

const FAQS = [
    {
        question: "How do I sign up for competitions?",
        answer: (
            <>
                You can sign up directly from the "Join Now" button on your desired event. From there, you will be redirected to that event's registration page. If you have any trouble, feel free to{" "}
                <Link to={"/more/contactus"} className={styles.answerLink}>Contact Us</Link>.
            </>
        ),
    },
    {
        question: "What are the different types of competitions?",
        answer: (
            <>
                There are 5 types of competitions for each game: Tournaments, Wagers, LANs, Head-to-head, and Leagues. To learn more about each type, check out our video explaining them{" "}
                <Link to={"https://www.youtube.com/watch?v=2EebBr4dd2c"} className={styles.answerLink} target="_blank" rel="noreferrer">Here</Link>.
            </>
        ),
    },
    {
        question: "What's the easiest way to navigate the site?",
        answer: (
            <>
                The best way to navigate the site is either going page-to-page or watching this{" "}
                <Link to={"https://www.youtube.com/watch?v=ojWSFWJX4b8"} className={styles.answerLink} target="_blank" rel="noreferrer">Short Video</Link>.
            </>
        ),
    },
    {
        question: "What are the rules?",
        answer: (
            <>
                Each game title has a different ruleset based on the gamemode. The best way to find the rules is to check through the provider you are playing for as each has their own variation. Here is an{" "}
                <Link to={"https://docs.google.com/document/d/1X0wywI5JhINTL4RqaUXS8fPj1TaVcsAHJjks9KfeEQU/edit"} className={styles.answerLink} target="_blank" rel="noreferrer">Example</Link>.
            </>
        ),
    },
    {
        question: "How do I post my own event?",
        answer: (
            <>
                You can post your own event by submitting an{" "}
                <Link to={"/more/eventhost"} className={styles.answerLink}>Event Host</Link>
                {" "}form. Once submitted we will ensure the event is to the uSync standard, and post it within 2-3 business days.
            </>
        ),
    },
    {
        question: "What is uSync Verified?",
        answer: (
            <>
                uSync Verified is our way of ensuring the legitimacy of our event hosts. All events with the uSync Verified checkmark have been independently verified by our team to be a safe, and quality competition for all entrants.{" "}
                <Link to={"/more/verification"} className={styles.answerLink}>Learn more</Link>.
            </>
        ),
    },
];

export const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div className="standardContainer">
            <SeoData
                title={"FAQ"}
                description="Frequently asked questions about esports and how to begin. Find articles on the competitive esports landscape today."
                canonicalPath={"/more/FAQ"}
            />

            <div className={styles.faqPage}>
                <h1 className={styles.pageTitle}>FAQ</h1>
                <span className={styles.titleAccent} />

                <div className={styles.layout}>
                    {/* ── Left column: games only ── */}
                    <div className={styles.leftCol}>
                        <p className={styles.sectionLabel}>Featured Games</p>
                        <div className={styles.gamesCard}>
                            <Link to={"/games/call-of-duty"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/faZHdLx.png" alt="Call of Duty" className={styles.gameImg} />
                            </Link>
                            <Link to={"/games/warzone"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/IBGIbY2.png" alt="Warzone" className={styles.gameImg} />
                            </Link>
                            <Link to={"/games/halo"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/wqKJfEu.png" alt="Halo" className={styles.gameImg} />
                            </Link>
                            <Link to={"/games/LoL"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/5riYNow.png" alt="League of Legends" className={styles.gameImg} />
                            </Link>
                            <Link to={"/games/RocketLeague"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/GJO8JIZ.png" alt="Rocket League" className={styles.gameImg} />
                            </Link>
                            <Link to={"/games/Valorant"} className={styles.gameLink}>
                                <img src="https://i.imgur.com/Gsl3oIp.png" alt="Valorant" className={styles.gameImg} />
                            </Link>
                        </div>
                    </div>

                    {/* ── Right column ── */}
                    <div className={styles.rightCol}>
                        <p className={styles.faqHeading}>Frequently Asked Questions</p>
                        <div className={styles.accordion}>
                            {FAQS.map((faq, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div
                                        key={i}
                                        className={`${styles.item}${isOpen ? ` ${styles.itemOpen}` : ''}`}
                                    >
                                        <div className={styles.questionRow} onClick={() => toggle(i)} role='button'>
                                            <p className={styles.questionText}>{faq.question}</p>
                                            <FaChevronDown
                                                className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ''}`}
                                            />
                                        </div>
                                        {isOpen && (
                                            <div className={styles.answerWrap}>
                                                <p className={styles.answerText}>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Full-width articles below ── */}
                <div className={styles.articlesSection}>
                    <div className={styles.articlesSectionHeader}>
                        <p className={styles.sectionLabel}>FAQ Articles</p>
                        <Link to={"/more/articles"} className={styles.articlesViewAll}>View all →</Link>
                    </div>
                    <div className={styles.articlesThumbs}>
                        <Link to={"/more/articles/The-Problem-With-Esports"} className={styles.articleThumb}>
                            <img src="https://i.imgur.com/vBqSUhI.png" alt="The Problem With Esports" className={styles.articleThumbImg} />
                        </Link>
                        <Link to={"/more/articles/What-We-Provide"} className={styles.articleThumb}>
                            <img src="https://i.imgur.com/Fr7yPnN.png" alt="What We Provide" className={styles.articleThumbImg} />
                        </Link>
                        <Link to={"/more/articles/How-We-Fix-It"} className={styles.articleThumb}>
                            <img src="https://i.imgur.com/Q6NQGsD.png" alt="How We Fix It" className={styles.articleThumbImg} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
