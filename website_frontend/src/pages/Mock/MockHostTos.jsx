// TEMPORARY review page for the host-TOS changes. Delete before merging (route: /mock/host-tos).
import { useState } from "react";
import { Link } from "react-router";
import { buildStepSequence, buildSettingsSteps, buildAddProfileSteps } from "components/SignUpFormWizard/stepConfig";
import { buildSignUpRequest } from "utils/profileForm";
import { TOS_URL } from "utils/legal";
import styles from "components/SignUpFormWizard/SignUpFormWizard.module.css";

const COMBOS = [["player"], ["host"], ["venue"], ["org"], ["player", "host"], ["player", "org"]];

const box = { border: "1px solid rgba(255,255,255,.15)", borderRadius: 12, padding: "1.25rem", margin: "1rem 0" };

export const MockHostTos = () => {
    const [agreed, setAgreed] = useState(false);
    const sample = buildSignUpRequest({ signup_path: ["player"], username_player: "Demo", tos_accepted: agreed }).data;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", color: "inherit" }}>
            <h1>Host-TOS review (mock)</h1>
            <p>Temporary page. Nothing here is saved.</p>

            <section style={box}>
                <h2>1. Terms of Service</h2>
                <p>
                    Open the real page: <Link to={TOS_URL} target="_blank">{TOS_URL}</Link>. Check the summary box at the
                    top, §2.1, §2.2, §7.1–7.8 and §8.4, §8.7, §8.10, §8.11.
                </p>
            </section>

            <section style={box}>
                <h2>2. Sign-up last step: required checkbox</h2>
                <div className={styles.card}>
                    <label className={styles.tosCheck}>
                        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                        <span>
                            I have read and agree to the{" "}
                            <Link to={TOS_URL} target="_blank" rel="noopener noreferrer">Terms of Service</Link>.
                        </span>
                    </label>
                    <div className={styles.stepFooter}>
                        <button type="button" className={styles.btnPrimary} disabled={!agreed}>Submit</button>
                    </div>
                    {!agreed && <p className={styles.submitHint}>Agree to the Terms of Service to submit.</p>}
                </div>
                <p>What sign-up sends to the backend (player example):</p>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: ".8rem" }}>{JSON.stringify(sample, null, 2)}</pre>
            </section>

            <section style={box}>
                <h2>3. Bracket Hosting step by profile type</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead><tr><th align="left">Profiles</th><th>Sign-up</th><th>Add profile</th><th>Settings</th></tr></thead>
                    <tbody>
                        {COMBOS.map(types => {
                            const has = steps => steps.some(s => s.key === "bracket_hosting") ? "Asked" : "Not asked";
                            return (
                                <tr key={types.join("+")}>
                                    <td>{types.join(" + ")}</td>
                                    <td align="center">{has(buildStepSequence(types))}</td>
                                    <td align="center">{types.length === 1 ? has(buildAddProfileSteps(types[0])) : "-"}</td>
                                    <td align="center">{types.length === 1 ? has(buildSettingsSteps(types[0])) : "-"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
};
