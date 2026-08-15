import { useMemo, useState } from "react";
import { FaCamera, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { AccountField, TileSelect } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { COUNTRIES, US_STATES, GENDERS, GAMES, GAME_TOURNAMENT_SUPPORT } from "./accountData";
import { getTimezoneForAddress, formatTimezoneLabel, COMMON_TIMEZONES } from "./timezone";

// No password field here on purpose — Supabase owns credential storage, so
// all we keep is the username and the email it's tied to.
export const CredentialsStep = ({ form, setField, errors, onNext, onBack }) => {
    const usernameStatus = useMemo(() => {
        if (!form.username || form.username.length < 3) return null;
        return "available";
    }, [form.username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className={shared.eyebrow}>Step 2 · Your login</p>
            <h1 className={shared.stepTitle}>Pick your username</h1>
            <p className={shared.stepSubtitle}>This is how you'll show up across uSync. Your email carries over from the account you just created.</p>

            <AccountField
                label="Username"
                name="username"
                value={form.username}
                onChange={(e) => setField('username', e.target.value)}
                placeholder="frostbyte"
                required
                error={errors.username}
                autoComplete="username"
            />
            {usernameStatus === 'available' && (
                <p className={shared.helperText} style={{ color: '#6bcf8f', marginTop: '.5rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                    <FaCheckCircle /> Available
                </p>
            )}

            <div style={{ height: usernameStatus === 'available' ? '.75rem' : '1.25rem' }} />

            <AccountField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="you@email.com"
                required
                error={errors.email}
                autoComplete="email"
                hideable
                hidden={form.hidden?.email}
                onToggleHide={() => setField('hidden', { ...form.hidden, email: !form.hidden?.email })}
            />
            <p className={shared.helperText} style={{ marginTop: '.5rem' }}>Pre-filled from signup — change it here if you'd rather use a different address.</p>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton}>Continue</button>
            </div>
        </form>
    );
};

export const AboutYouStep = ({ form, setField, errors, onNext, onBack }) => {
    const timeZone = useMemo(
        () => getTimezoneForAddress({ country: form.country, state: form.state, zip: form.zip }),
        [form.country, form.state, form.zip]
    );
    const toggleHidden = (field) => setField('hidden', { ...form.hidden, [field]: !form.hidden?.[field] });

    // Region fields differ per country (states vs provinces vs neither), so
    // don't show them until we know which country's rules apply.
    const countryChosen = !!form.country;
    const isUS = form.country === 'United States';

    const toggleTimezoneMode = () => {
        if (form.timezoneMode === 'manual') {
            setField('timezoneMode', 'auto');
        } else {
            setField('timezoneManual', timeZone);
            setField('timezoneMode', 'manual');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setField('timezone', form.timezoneMode === 'manual' ? form.timezoneManual : timeZone);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className={shared.eyebrow}>Step 3 · About you</p>
            <h1 className={shared.stepTitle}>Tell us about yourself</h1>
            <p className={shared.stepSubtitle}>Only your name is required. The rest helps us connect you with the right region and events near you, and sensitive fields stay hidden on your public profile by default.</p>

            <div className={shared.formGrid}>
                <AccountField label="First name" name="firstName" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} required error={errors.firstName} autoComplete="given-name" />
                <AccountField label="Last name" name="lastName" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} required error={errors.lastName} autoComplete="family-name" />

                <AccountField
                    label="Phone number" name="phone" type="tel" value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)} placeholder="Optional" required={false} error={errors.phone}
                    hideable hidden={form.hidden?.phone} onToggleHide={() => toggleHidden('phone')}
                />
                <AccountField
                    label="Gender" name="gender" as="select" options={GENDERS} value={form.gender}
                    onChange={(e) => setField('gender', e.target.value)} placeholder="Optional" required={false} error={errors.gender}
                    hideable hidden={form.hidden?.gender} onToggleHide={() => toggleHidden('gender')}
                />

                <AccountField
                    label="Birthday" name="birthday" type="date" value={form.birthday}
                    onChange={(e) => setField('birthday', e.target.value)} required={false} error={errors.birthday}
                    hideable hidden={form.hidden?.birthday} onToggleHide={() => toggleHidden('birthday')}
                />
                <AccountField
                    label="Country" name="country" as="select"
                    options={COUNTRIES.map(c => ({ value: c, label: c }))} value={form.country}
                    onChange={(e) => setField('country', e.target.value)} placeholder="Optional" required={false} error={errors.country}
                    hideable hidden={form.hidden?.country} onToggleHide={() => toggleHidden('country')}
                />

                {countryChosen && (isUS ? (
                    <AccountField
                        label="State" name="state" as="select"
                        options={US_STATES.map(s => ({ value: s, label: s }))} value={form.state}
                        onChange={(e) => setField('state', e.target.value)} required={false} error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                ) : (
                    <AccountField
                        label="State / Province / Region" name="state" value={form.state}
                        onChange={(e) => setField('state', e.target.value)} required={false} error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                ))}
                {countryChosen && (
                    <AccountField
                        label={isUS ? "ZIP code" : "Postal code"} name="zip" value={form.zip}
                        onChange={(e) => setField('zip', e.target.value)} required={false} error={errors.zip}
                    />
                )}
            </div>
            {countryChosen && <p className={shared.helperText}>ZIP/postal code is for internal use only, it's never shown on your profile.</p>}

            {countryChosen && (
                <div className={shared.field} style={{ marginBottom: '1.5rem' }}>
                    <div className={shared.labelRow}>
                        <span className={shared.label}>Time zone</span>
                        <span className={shared.badge}>{form.timezoneMode === 'manual' ? 'Manual' : 'Auto-detected'}</span>
                    </div>

                    {form.timezoneMode === 'manual' ? (
                        <select
                            className={shared.input}
                            style={{ padding: '1rem 1.25rem' }}
                            value={form.timezoneManual}
                            onChange={(e) => setField('timezoneManual', e.target.value)}
                        >
                            {COMMON_TIMEZONES.map(tz => (
                                <option key={tz.value} value={tz.value}>{tz.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input className={shared.input} style={{ padding: '1rem 1.25rem' }} value={formatTimezoneLabel(timeZone)} disabled readOnly />
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.6rem', gap: '.75rem', flexWrap: 'wrap' }}>
                        <p className={shared.helperText} style={{ margin: 0 }}>
                            {form.timezoneMode === 'manual'
                                ? "Pick whichever zone is right for you."
                                : "Based on your state and ZIP, updates automatically as you fill them in."}
                        </p>
                        <button type="button" className={shared.hideToggle} onClick={toggleTimezoneMode}>
                            {form.timezoneMode === 'manual' ? 'Use auto-detect instead' : "Not right? Choose manually"}
                        </button>
                    </div>
                </div>
            )}

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton}>Continue</button>
            </div>
        </form>
    );
};

// There is deliberately no RoleStep here. Roles (Player / Coach / Caster /
// Analyst / Talent / Organizer) are profile decoration, not registration data —
// nothing in the product consumes them yet, and asking up front meant people
// set them once and forgot. They live in Edit profile instead, so they can be
// filled in when they actually mean something.

export const GamesStep = ({ form, setField, onNext, onBack, isPlayer, isHost }) => {
    const showOtherInput = form.games?.includes('other');

    // Statements, not questions — a question headline reads like an
    // interrogation partway through signup and makes people likelier to bail.
    const title = isPlayer && isHost ? "Add the games you're involved with"
        : isHost ? 'Add the games you host for'
        : 'Add the games you play';

    const subtitle = isHost && !isPlayer
        ? "These decide which sections your events show up in. You can add more later."
        : "These will be added to your feed. Pick every game you're involved with. You can add more later.";

    return (
        <>
            <p className={shared.eyebrow}>Your games</p>
            <h1 className={shared.stepTitle}>{title}</h1>
            <p className={shared.stepSubtitle}>{subtitle}</p>

            <TileSelect options={GAMES} value={form.games} onChange={(v) => setField('games', v)} multi compact />

            {showOtherInput && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <AccountField
                        label="Other: Which game?"
                        name="otherGame"
                        value={form.otherGame}
                        onChange={(e) => setField('otherGame', e.target.value)}
                        placeholder="e.g. Apex Legends"
                        required={false}
                    />
                </div>
            )}

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} disabled={!form.games?.length} onClick={onNext}>Continue</button>
            </div>
        </>
    );
};

export const BracketHostingStep = ({ form, setField, onNext, onBack }) => {
    const pickedGames = (form.games || []).filter(g => g !== 'other').map(g => GAMES.find(x => x.value === g)).filter(Boolean);

    return (
        <>
            <p className={shared.eyebrow}>Bracket hosting</p>
            <h1 className={shared.stepTitle}>Run your own brackets</h1>
            <p className={shared.stepSubtitle}>Totally optional — turn this on if you plan to host tournaments yourself.</p>

            <div className={shared.radioCardRow}>
                <button type="button" className={`${shared.radioCard} ${form.bracketHosting === true ? shared.radioCardSelected : ''}`} onClick={() => setField('bracketHosting', true)}>
                    <div>
                        <div className={shared.radioCardTitle}>Yes, enable it</div>
                        <div className={shared.radioCardDescription}>Build a "Create" view so you can run your own brackets.</div>
                    </div>
                </button>
                <button type="button" className={`${shared.radioCard} ${form.bracketHosting === false ? shared.radioCardSelected : ''}`} onClick={() => setField('bracketHosting', false)}>
                    <div>
                        <div className={shared.radioCardTitle}>Not right now</div>
                        <div className={shared.radioCardDescription}>You can turn hosting on later.</div>
                    </div>
                </button>
            </div>

            {pickedGames.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <p className={shared.label} style={{ marginBottom: '.6rem' }}>Tournament support for your games</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        {pickedGames.map(game => {
                            const supported = GAME_TOURNAMENT_SUPPORT[game.value];
                            return (
                                <div key={game.value} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.6rem .75rem', borderRadius: '.65rem', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)' }}>
                                    {game.logo && <img src={game.logo} alt="" style={{ width: '1.4rem', height: '1.4rem', borderRadius: '.35rem', objectFit: 'cover' }} />}
                                    <span style={{ flex: 1, fontSize: '.85rem', fontWeight: 600, color: 'rgba(255,255,255,.85)' }}>{game.label}</span>
                                    <span
                                        className={shared.badge}
                                        style={supported ? undefined : { background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.14)' }}
                                    >
                                        {supported ? 'Tournaments live' : 'Coming soon'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <p className={shared.helperText}>You can turn this on or off at any time in <strong>Settings → Hosting</strong>. Nothing here is permanent.</p>
            <p className={shared.helperText}>Free plans get 2 hosted tournaments / month.</p>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} disabled={form.bracketHosting === null} onClick={onNext}>Continue</button>
            </div>
        </>
    );
};

// The last step, so it carries the submit. Anything still required is named
// here with a link straight to the step that asks for it — people can fill the
// flow out in any order, so the finish is where that gets reconciled.
export const ProfileBasicsStep = ({ form, setField, onNext, onBack, isHost, finishLabel = 'Continue', missing = [], onFixMissing }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setField('avatar', file.name);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <p className={shared.eyebrow}>Profile basics</p>
            <h1 className={shared.stepTitle}>Make it yours</h1>
            <p className={shared.stepSubtitle}>
                {isHost
                    ? "This is the face of your profile — players see it on every event you run. Skip and finish later if you'd rather."
                    : "Skip and finish later if you'd rather."}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <label style={{
                    width: '4.5rem', height: '4.5rem', borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                    backgroundImage: previewUrl ? `url(${previewUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'
                }}>
                    {!previewUrl && <FaCamera style={{ color: 'rgba(255,255,255,.4)' }} />}
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                </label>
                <div>
                    <div className={shared.label}>{isHost ? 'Upload your logo' : 'Upload photo or GIF'}</div>
                    <div className={shared.helperText} style={{ margin: 0 }}>PNG, JPG or GIF, up to 8MB</div>
                </div>
            </div>

            <div className={shared.field} style={{ marginBottom: '1.75rem' }}>
                <div className={shared.labelRow}>
                    <span className={shared.label}>{isHost ? 'About your organization' : 'Short bio'}</span>
                </div>
                <textarea
                    className={shared.input}
                    rows={3}
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    placeholder={isHost
                        ? "Running competitive CoD and Valorant events across the West Coast since 2021."
                        : "Controller CoD player & part-time wager grinder."}
                    value={form.bio}
                    onChange={(e) => setField('bio', e.target.value)}
                />
            </div>

            {missing.length > 0 && (
                <div className={shared.missingNote}>
                    <FaExclamationCircle />
                    <span>
                        Still needed before we can create the account:{' '}
                        {missing.map((m, i) => (
                            <span key={m.label}>
                                <button type="button" className={shared.missingLink} onClick={() => onFixMissing?.(m.step)}>{m.label}</button>
                                {i < missing.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </span>
                </div>
            )}

            <p className={shared.helperText} style={{ margin: '0 0 1rem' }}>
                Linking your accounts and turning on bracket hosting happen on your profile — you can do both the moment you land there.
            </p>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} onClick={onNext}>{finishLabel}</button>
            </div>
        </>
    );
};
