import { useState } from 'react';
import { SeoData } from "components";
import { Link } from "react-router";
import { FaCheck, FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import verifiedWordmark from 'assets/images/usync-verified-wordmark.png';
import verifiedCheck from 'assets/images/verified-check.png';
import verifiedCross from 'assets/images/verified-cross.png';
import styles from './Verification.module.css';

const SUBSCRIBE_URL = "https://buy.stripe.com/eVadRz4PY0s31mEcMV";

const FEATURES = [
    "Verified badge",
    "Top of page placement",
    "uSync team access",
    "Social media marketing",
    "Custom graphics",
    "Event-pass payment portal",
    "Bracket system",
    "Event analytics",
];

const PLAN_INCLUDES = [
    "Every feature listed",
    "Covers all of your events",
    "Cancel any time",
];

const FAQS = [
    {
        question: "What does uSync Verified mean?",
        answer: (
            <>
                It means our team has reviewed the host behind an event, including their rules, payout history,
                scheduling, and how they handle disputes. It is a review of the host, not a guarantee of any single
                match result.
            </>
        ),
    },
    {
        question: "Do I have to be Verified to be listed on uSync?",
        answer: (
            <>
                No. Listing your event is free and always will be. Verification is an optional subscription. Start with
                the <Link to={"/more/eventhost"} className={styles.answerLink}>event host</Link> form.
            </>
        ),
    },
    {
        question: "How do I apply, and how long does it take?",
        answer: (
            <>
                Subscribe above and tell us which events you run. Most reviews are done within 2-3 business days, and
                the checkmark goes live on your listings once you are approved.
            </>
        ),
    },
    {
        question: "Can a host lose their Verified badge?",
        answer: (
            <>
                Yes. If a host stops paying out, abandons events mid-season, or racks up unresolved disputes, we remove
                the badge. If you have had a problem with a Verified event, please{" "}
                <Link to={"/reportproblem"} className={styles.answerLink}>report it</Link>.
            </>
        ),
    },
];

export const Verification = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div className={`standardContainer ${styles.page}`}>
            <SeoData
                title={"uSync Verified"}
                description="uSync Verified is our review of esports LAN, league, tournament, head-to-head, and wager hosts. See what the badge covers, what it costs, and how to apply."
                canonicalPath={"/more/verification"}
            />

            {/* ── Title ────────────────────────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroCopy}>
                        <p className={`${styles.mono} ${styles.heroKicker}`}>uSync Verified</p>

                        <h1 className={styles.heroTitle}>
                            Verified means<br />
                            <span className={styles.heroTitleAccent}>we checked.</span>
                        </h1>

                        <p className={styles.heroSubtext}>
                            uSync Verified providers are the most trusted hosts we feature: we review their rules,
                            their payout record, and how they treat players. We verify as many events as we can, so
                            you can bring your organization to the highest level of competitive play.
                        </p>

                        <div className={styles.marks}>
                            <span className={styles.mark}>
                                <img className={styles.markIcon} src={verifiedCheck} alt="" />
                                Verified host
                            </span>
                            <span className={styles.mark}>
                                <img className={styles.markIcon} src={verifiedCross} alt="" />
                                Not verified
                            </span>
                        </div>

                        <div className={styles.heroButtons}>
                            <Link to={SUBSCRIBE_URL} target="_blank" rel="noreferrer" className={styles.buttonPrimary}>
                                Get Verified
                            </Link>
                        </div>
                    </div>

                    <div className={styles.credential}>
                        <div className={styles.credentialTop}>
                            <img className={styles.credentialWordmark} src={verifiedWordmark} alt="uSync Verified" />
                            <img className={styles.credentialSeal} src={verifiedCheck} alt="" />
                        </div>

                        <div className={styles.credentialBody}>
                            <p className={styles.credentialLabel}>Status</p>
                            <p className={styles.credentialName}>Verified Host</p>

                            <div className={styles.credentialRows}>
                                <div>
                                    <p className={styles.credentialLabel}>Review</p>
                                    <p className={styles.credentialRowValue}>Passed</p>
                                </div>
                                <div>
                                    <p className={styles.credentialLabel}>Payouts</p>
                                    <p className={styles.credentialRowValue}>Confirmed</p>
                                </div>
                            </div>

                            <p className={styles.credentialCheck}>
                                <FaCheckCircle /> Issued by the uSync team
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features + subscribe ─────────────────────────── */}
            <section className={styles.section}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.sectionTitle}>What verified hosts get</h2>
                    <p className={styles.sectionLede}>One subscription covers every event you run on uSync.</p>
                </div>

                <div className={styles.planLayout}>
                    <ul className={styles.featureList}>
                        {FEATURES.map((feature, i) => (
                            <li className={styles.featureRow} key={feature}>
                                <span className={styles.featureNum}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className={styles.featureName}>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.plan}>
                        <p className={styles.planLabel}>uSync Verified</p>
                        <p className={styles.planPrice}>
                            $7.99<span className={styles.planPeriod}>/mo</span>
                        </p>
                        <p className={styles.planNote}>
                            Billed monthly through Stripe. Covers your whole organization.
                        </p>

                        <ul className={styles.planList}>
                            {PLAN_INCLUDES.map((item) => (
                                <li key={item}>
                                    <FaCheck className={styles.yes} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link to={SUBSCRIBE_URL} target="_blank" rel="noreferrer" className={styles.planButton}>
                            Subscribe
                        </Link>
                        <p className={styles.planFinePrint}>Secure checkout · Cancel any time</p>
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────── */}
            <section className={styles.section}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.sectionTitle}>Verified FAQ</h2>
                </div>

                <div className={styles.faqList}>
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={faq.question}
                                className={`${styles.faqItem}${isOpen ? ` ${styles.faqItemOpen}` : ''}`}
                            >
                                <button
                                    type="button"
                                    className={styles.faqButton}
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={styles.faqNum}>{String(i + 1).padStart(2, "0")}</span>
                                    <p className={styles.faqQuestion}>{faq.question}</p>
                                    <FaChevronDown
                                        className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ''}`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className={styles.faqAnswer}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
