import { useState } from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaCalendarAlt, FaSitemap } from "react-icons/fa";
import { MatchChat } from "components/MatchChat/MatchChat";
import hostStyles from "pages/Host/Host.module.css";
import { SCENARIOS, useMockChat } from "./mockChat";
import styles from "./ChatMock.module.css";

// MOCK PAGE - DELETE src/pages/Mock (and its routes in src/index.js) before this ships.
//
// /mock/chat: the match details page with the match chat in it, switchable between everything the
// chat can look like. Nothing talks to the API. The real thing lives on /brackets/:event/matches/:match.

const TRY_THESE = [
    ['Banned word', 'what the fuck'],
    ['Shortened link', 'join here bit.ly/3xYz'],
    ['Adult site', 'check out pornhub.com/video'],
    ['IP logger', 'click https://grabify.link/ABC123'],
    ['Program download', 'get it https://cdn.example.com/setup.exe'],
    ['Allowed link', 'rules are on https://www.twitch.tv/usync'],
];

const Chat = ({ scenario }) => {
    const mock = useMockChat(scenario);
    return (
        <>
            <MatchChat
                chat={mock.chat}
                messages={mock.messages}
                error={mock.error}
                sendError={mock.sendError}
                busy={mock.busy}
                onSend={mock.send}
                onRequestAdmin={mock.requestAdmin}
                onJoin={mock.join}
                onClearError={mock.clearSendError}
            />
            <div className={styles.tools}>
                <button type="button" className={hostStyles.ghostBtn} onClick={mock.reset}>Reset this scenario</button>
                <span className={styles.toolsLabel}>Send a message the filters should catch (the real filters run on the server):</span>
                <div className={styles.examples}>
                    {TRY_THESE.map(([label, text]) => (
                        <button key={label} type="button" className={styles.example} disabled={!mock.chat.canWrite} onClick={() => mock.send(text)} title={text}>{label}</button>
                    ))}
                </div>
            </div>
        </>
    );
};

export const ChatMock = () => {
    const [key, setKey] = useState(SCENARIOS[0].key);
    const scenario = SCENARIOS.find(s => s.key === key);

    return (
        <div className={`standardContainer ${hostStyles.page}`}>
            <title>uSync | Match chat mock</title>
            <meta name="robots" content="noindex, nofollow" />
            <div className={hostStyles.inner}>
                <p className={hostStyles.mockBanner}>
                    Mock page for review. Nothing here is saved or sent, and it will be deleted later.{' '}
                    <Link to="/mock/chat/notifications" style={{ color: 'inherit', fontWeight: 700 }}>Admin notifications preview</Link>
                    {' · '}
                    <Link to="/more/terms-of-service" style={{ color: 'inherit', fontWeight: 700 }}>Terms (7.10)</Link>
                    {' · '}
                    <Link to="/more/privacy-policy" style={{ color: 'inherit', fontWeight: 700 }}>Privacy Policy</Link>
                </p>

                <nav className={styles.scenarios} aria-label="Scenarios">
                    {SCENARIOS.map(s => (
                        <button key={s.key} type="button" aria-pressed={s.key === key}
                            className={`${styles.pill} ${s.key === key ? styles.pillOn : ''}`} onClick={() => setKey(s.key)}>
                            {s.label}
                        </button>
                    ))}
                </nav>
                <p className={styles.blurb}>{scenario.blurb}</p>

                <div className={hostStyles.pageHeader}>
                    <div>
                        <p className={hostStyles.eyebrow}><span className={hostStyles.eyebrow}><FaArrowLeft /> Spring Showdown 4v4</span></p>
                        <h1 className={hostStyles.title}>Semifinals</h1>
                        <div className={hostStyles.metaRow}>
                            <span className={hostStyles.chip}>Ready to play</span>
                            <span><FaSitemap /> Best of 5 · first to 3</span>
                            <span><FaCalendarAlt /> Sat, Nov 14, 7:00 PM</span>
                        </div>
                    </div>
                </div>

                <section className={`${hostStyles.card} ${hostStyles.versus}`}>
                    <div className={`${hostStyles.matchSide} ${hostStyles.matchSideYou}`}>
                        <h2 className={hostStyles.matchSideName}>Alpha<span className={hostStyles.chip}>You</span></h2>
                        <p className={hostStyles.muted}>Captain: ace</p>
                    </div>
                    <span className={hostStyles.versusTag}>vs</span>
                    <div className={hostStyles.matchSide}>
                        <h2 className={hostStyles.matchSideName}>Delta</h2>
                        <p className={hostStyles.muted}>Captain: cat</p>
                    </div>
                </section>

                <div className={hostStyles.chatSlot} style={{ marginTop: '1rem' }}>
                    <Chat key={key} scenario={scenario} />
                </div>
            </div>
        </div>
    );
};
