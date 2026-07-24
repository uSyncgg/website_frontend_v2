import { useMemo, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { AccountField, PasswordField, TileSelect } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import { COUNTRIES, US_STATES, GENDERS, GAMES, PLAYER_GENRES, PERSONA_OPTIONS, GENRE_ICONS } from "./accountData";
import { getTimezoneForAddress, formatTimezoneLabel, COMMON_TIMEZONES } from "./timezone";

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
            <p className={shared.eyebrow}>Step 2 · Credentials</p>
            <h1 className={shared.stepTitle}>Your login</h1>
            <p className={shared.stepSubtitle}>This is how you'll sign back in, your username is unique among players.</p>

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
            {usernameStatus === 'available' && <p className={shared.helperText} style={{ color: '#6bcf8f', marginTop: '.5rem', marginBottom: 0 }}>✓ Available</p>}

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

            <div style={{ height: '1.25rem' }} />

            <PasswordField
                name="password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                required
                error={errors.password}
            />

            <div style={{ height: '1.25rem' }} />

            <AccountField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)}
                placeholder="••••••••"
                required
                error={errors.confirmPassword}
                autoComplete="new-password"
            />

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

    // Manual mode always starts from whatever we auto-detected, so people are
    // adjusting a real starting point instead of picking blind.
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
            <p className={shared.stepSubtitle}>We use this to verify your account and connect you with the right region. Sensitive fields default to hidden on your public profile for your safety, you can turn that off later.</p>

            <div className={shared.formGrid}>
                <AccountField label="First name" name="firstName" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} required error={errors.firstName} autoComplete="given-name" />
                <AccountField label="Last name" name="lastName" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} required error={errors.lastName} autoComplete="family-name" />

                <AccountField
                    label="Phone number" name="phone" type="tel" value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)} placeholder="(555) 555-5555" required={false} error={errors.phone}
                    hideable hidden={form.hidden?.phone} onToggleHide={() => toggleHidden('phone')}
                />
                <AccountField
                    label="Gender" name="gender" as="select" options={GENDERS} value={form.gender}
                    onChange={(e) => setField('gender', e.target.value)} required error={errors.gender}
                    hideable hidden={form.hidden?.gender} onToggleHide={() => toggleHidden('gender')}
                />

                <AccountField
                    label="Birthday" name="birthday" type="date" value={form.birthday}
                    onChange={(e) => setField('birthday', e.target.value)} required error={errors.birthday}
                    hideable hidden={form.hidden?.birthday} onToggleHide={() => toggleHidden('birthday')}
                />
                <AccountField
                    label="Country" name="country" as="select"
                    options={COUNTRIES.map(c => ({ value: c, label: c }))} value={form.country}
                    onChange={(e) => setField('country', e.target.value)} required error={errors.country}
                    hideable hidden={form.hidden?.country} onToggleHide={() => toggleHidden('country')}
                />

                {form.country === 'United States' ? (
                    <AccountField
                        label="State" name="state" as="select"
                        options={US_STATES.map(s => ({ value: s, label: s }))} value={form.state}
                        onChange={(e) => setField('state', e.target.value)} required error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                ) : (
                    <AccountField
                        label="State / Province" name="state" value={form.state}
                        onChange={(e) => setField('state', e.target.value)} required error={errors.state}
                        hideable hidden={form.hidden?.state} onToggleHide={() => toggleHidden('state')}
                    />
                )}
                <AccountField
                    label="ZIP / Postal code" name="zip" value={form.zip}
                    onChange={(e) => setField('zip', e.target.value)} required={false} error={errors.zip}
                />
            </div>
            <p className={shared.helperText}>ZIP/postal code is for internal use only, it's never shown on your profile.</p>

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
                    <button
                        type="button"
                        className={shared.hideToggle}
                        onClick={toggleTimezoneMode}
                    >
                        {form.timezoneMode === 'manual' ? 'Use auto-detect instead' : "Not right? Choose manually"}
                    </button>
                </div>
            </div>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="submit" className={shared.primaryButton}>Continue</button>
            </div>
        </form>
    );
};

export const RoleStep = ({ form, setField, onNext, onBack }) => {
    const showOtherGenre = form.persona === 'player' && form.genre === 'other';

    return (
        <>
            <p className={shared.eyebrow}>Step 4 · Your role</p>
            <h1 className={shared.stepTitle}>What best describes you?</h1>
            <p className={shared.stepSubtitle}>This shapes what shows up on your profile and what you can be tagged as.</p>

            <TileSelect options={PERSONA_OPTIONS} value={form.persona} onChange={(v) => setField('persona', v)} />

            {form.persona === 'player' && (
                <>
                    <p className={shared.label} style={{ marginBottom: '.85rem' }}>Which kind of player?</p>
                    <TileSelect
                        options={PLAYER_GENRES.map(g => ({ ...g, icon: GENRE_ICONS[g.value] }))}
                        value={form.genre}
                        onChange={(v) => setField('genre', v)}
                        compact
                    />

                    {showOtherGenre && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <AccountField
                                label="Other: What do you play?"
                                name="otherGenre"
                                value={form.otherGenre}
                                onChange={(e) => setField('otherGenre', e.target.value)}
                                placeholder="e.g. Racing sims"
                                required={false}
                            />
                        </div>
                    )}
                </>
            )}

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} disabled={!form.persona || (form.persona === 'player' && !form.genre)} onClick={onNext}>Continue</button>
            </div>
        </>
    );
};

export const GamesStep = ({ form, setField, onNext, onBack }) => {
    const isPlayer = form.persona === 'player';
    const showOtherInput = form.games?.includes('other');

    return (
        <>
            <p className={shared.eyebrow}>Step 5 · Your games</p>
            <h1 className={shared.stepTitle}>{isPlayer ? 'Pick the games you play' : 'Which games do you want to add?'}</h1>
            <p className={shared.stepSubtitle}>
                {isPlayer
                    ? "These power your feed, and the games you're allowed to host brackets for."
                    : "These power your feed and profile. Pick every game you're involved with."}
            </p>

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

export const BracketHostingStep = ({ form, setField, onNext, onBack }) => (
    <>
        <p className={shared.eyebrow}>Step 6 · Bracket hosting</p>
        <h1 className={shared.stepTitle}>Do you plan on hosting any brackets?</h1>
        <p className={shared.stepSubtitle}>Turn on bracket hosting for your account, totally optional.</p>

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
                    <div className={shared.radioCardDescription}>Keep it off, a clean player profile only.</div>
                </div>
            </button>
        </div>

        <p className={shared.helperText}>Unsure? You can turn this on later in Settings → Hosting anytime. Nothing here is permanent.</p>
        <p className={shared.helperText}>Free plans get 2 hosted tournaments / month.</p>

        <div className={shared.stepFooter}>
            <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
            <button type="button" className={shared.primaryButton} disabled={form.bracketHosting === null} onClick={onNext}>Continue</button>
        </div>
    </>
);

export const ProfileBasicsStep = ({ form, setField, onNext, onBack }) => {
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
            <p className={shared.eyebrow}>Step 7 · Profile basics</p>
            <h1 className={shared.stepTitle}>Make it yours</h1>
            <p className={shared.stepSubtitle}>Skip and finish later if you'd rather.</p>

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
                    <div className={shared.label}>Upload photo or GIF</div>
                    <div className={shared.helperText} style={{ margin: 0 }}>PNG, JPG or GIF, up to 8MB</div>
                </div>
            </div>

            <div className={shared.field} style={{ marginBottom: '1.75rem' }}>
                <div className={shared.labelRow}>
                    <span className={shared.label}>Short bio</span>
                </div>
                <textarea
                    className={shared.input}
                    rows={3}
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    placeholder="Controller CoD player & part-time wager grinder."
                    value={form.bio}
                    onChange={(e) => setField('bio', e.target.value)}
                />
            </div>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.secondaryButton} onClick={onBack}>Back</button>
                <button type="button" className={shared.primaryButton} onClick={onNext}>Create account</button>
            </div>
        </>
    );
};
