import { useState } from "react";
import { useNavigate } from "react-router";
import { FaCamera, FaTimes } from "react-icons/fa";
import {
    SeoData, AccountShell, ProfileSidebar, ProfileHeader, StatGrid, AchievementList,
    VerifiedLock, HostEventCard, AccountField, TileSelect
} from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import {
    COUNTRIES, US_STATES, GENDERS, GAMES, PERSONA_OPTIONS,
    HOST_EVENT_TYPES, LINK_PLATFORMS, HOST_LINK_PLATFORMS, VERIFIED_BENEFITS
} from "../SignUp/accountData";
import {
    SAMPLE_PLAYER_PROFILE, SAMPLE_HOST_PROFILE, ACHIEVEMENT_ICON_OPTIONS,
    HOST_EVENT_TYPE_FIELDS, HOST_EVENT_FIELD_LABELS, HOST_EVENT_TYPE_LABELS
} from "./profileData";

const PLAYER_SECTIONS = [
    { id: "basics", label: "Profile basics" },
    { id: "stats", label: "Stats & Achievements" },
    { id: "links", label: "Link accounts" },
    { id: "verified", label: "Verified" },
];

const HOST_SECTIONS = [
    { id: "basics", label: "Profile basics" },
    { id: "events", label: "Events" },
    { id: "links", label: "Link accounts" },
    { id: "verified", label: "Verified" },
];

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const emptyEventDraft = (type) => ({ type, id: null });

// This page has no backend yet (see repo-wide "UI-only mockup" convention in
// SignUp/Login) — edits only live in local state. The account-type/preview
// switcher exists purely so both Player and Host editing can be reviewed
// without real accounts; a real build would derive accountType from the
// signed-in user instead.
export const EditProfile = () => {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState("player");
    const [verified, setVerified] = useState(true);
    const [activeSection, setActiveSection] = useState("basics");
    const [playerProfile, setPlayerProfile] = useState(() => clone(SAMPLE_PLAYER_PROFILE));
    const [hostProfile, setHostProfile] = useState(() => clone(SAMPLE_HOST_PROFILE));
    const [eventDraft, setEventDraft] = useState(() => emptyEventDraft("lans"));
    const [saved, setSaved] = useState(false);

    const isHost = accountType === "host";
    const profile = isHost ? hostProfile : playerProfile;
    const setProfile = isHost ? setHostProfile : setPlayerProfile;
    const sections = isHost ? HOST_SECTIONS : PLAYER_SECTIONS;

    const setField = (name, value) => setProfile(prev => ({ ...prev, [name]: value }));
    const toggleHidden = (field) => setProfile(prev => ({ ...prev, hidden: { ...prev.hidden, [field]: !prev.hidden?.[field] } }));
    const setLink = (platform, value) => setProfile(prev => ({ ...prev, links: { ...prev.links, [platform]: value } }));

    const switchAccountType = (type) => {
        setAccountType(type);
        setActiveSection("basics");
        setSaved(false);
    };

    const handleAddAchievement = (achievement) => setProfile(prev => ({ ...prev, achievements: [...(prev.achievements || []), achievement] }));
    const handleRemoveAchievement = (id) => setProfile(prev => ({ ...prev, achievements: (prev.achievements || []).filter(a => a.id !== id) }));

    const handleAddLanStat = () => setProfile(prev => ({ ...prev, lanStats: [...(prev.lanStats || []), { placing: "", event: "", proof: "" }] }));
    const handleLanStatChange = (index, field, value) => setProfile(prev => ({
        ...prev,
        lanStats: prev.lanStats.map((l, i) => i === index ? { ...l, [field]: value } : l),
    }));
    const handleRemoveLanStat = (index) => setProfile(prev => ({ ...prev, lanStats: prev.lanStats.filter((_, i) => i !== index) }));

    const handleAddEvent = () => {
        if (!eventDraft.name?.trim()) return;
        setProfile(prev => ({ ...prev, events: [...(prev.events || []), { ...eventDraft, id: `e${Date.now()}` }] }));
        setEventDraft(emptyEventDraft(eventDraft.type));
    };
    const handleRemoveEvent = (id) => setProfile(prev => ({ ...prev, events: (prev.events || []).filter(e => e.id !== id) }));
    const handleEventFieldChange = (key, value) => setEventDraft(prev => ({ ...prev, [key]: value }));
    const handleEventTypeChange = (type) => setEventDraft({ type, id: null });
    const handleEventImageUpload = (key, file) => {
        if (file) setEventDraft(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => navigate("/account/profile"), 900);
    };

    // Host-only accounts link their public presence; game/competitive platforms
    // belong to the Player side, which is chosen at signup.
    const linkPlatforms = isHost ? HOST_LINK_PLATFORMS : LINK_PLATFORMS;

    const renderBasics = () => (
        <>
            <p className={shared.eyebrow}>Profile basics</p>
            <h1 className={shared.stepTitle}>{isHost ? "Your organization" : "Your identity"}</h1>
            <p className={shared.stepSubtitle}>This is what shows at the top of your profile. Sensitive fields can be hidden from your public profile.</p>

            <ProfileHeader profile={profile} mode="edit" showLinks={false} onFieldChange={setField} onAvatarChange={(url) => setField("avatar", url)} />

            <div style={{ height: "1.5rem" }} />

            {isHost ? (
                <>
                    <div className={shared.formGrid}>
                        <AccountField label="Account / organization name" name="accountName" value={profile.accountName} onChange={(e) => setField("accountName", e.target.value)} span={2} />
                        <AccountField label="Username" name="username" value={profile.username} onChange={(e) => setField("username", e.target.value)} />
                        <AccountField label="Email" name="email" type="email" value={profile.email} onChange={(e) => setField("email", e.target.value)} hideable hidden={profile.hidden?.email} onToggleHide={() => toggleHidden("email")} />
                        <AccountField label="Country" name="country" as="select" options={COUNTRIES.map(c => ({ value: c, label: c }))} value={profile.country} onChange={(e) => setField("country", e.target.value)} hideable hidden={profile.hidden?.country} onToggleHide={() => toggleHidden("country")} />
                        {profile.country === "United States" ? (
                            <AccountField label="State" name="state" as="select" options={US_STATES.map(s => ({ value: s, label: s }))} value={profile.state} onChange={(e) => setField("state", e.target.value)} required={false} hideable hidden={profile.hidden?.state} onToggleHide={() => toggleHidden("state")} />
                        ) : (
                            <AccountField label="State / Province" name="state" value={profile.state} onChange={(e) => setField("state", e.target.value)} required={false} hideable hidden={profile.hidden?.state} onToggleHide={() => toggleHidden("state")} />
                        )}
                        <AccountField label="ZIP / Postal code" name="zip" value={profile.zip} onChange={(e) => setField("zip", e.target.value)} required={false} />
                    </div>

                    {/* No "Contact person" block — the org name plus the account
                        email above is the whole contact story, and Discord
                        belongs in Link accounts as a social. */}

                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Games you host for</p>
                    <TileSelect options={GAMES} value={profile.games} onChange={(v) => setField("games", v)} multi compact />

                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Event types you run</p>
                    <TileSelect options={HOST_EVENT_TYPES} value={profile.eventTypes} onChange={(v) => setField("eventTypes", v)} multi compact />

                    {/* "Are you also a player?" used to live here. Account type
                        is now picked on the first signup screen (Player, Host,
                        or both), so asking again would be a second source of
                        truth. Changing it belongs in Settings → Account type. */}
                </>
            ) : (
                <>
                    <div className={shared.formGrid}>
                        <AccountField label="Username" name="username" value={profile.username} onChange={(e) => setField("username", e.target.value)} />
                        <AccountField label="Email" name="email" type="email" value={profile.email} onChange={(e) => setField("email", e.target.value)} hideable hidden={profile.hidden?.email} onToggleHide={() => toggleHidden("email")} />
                        <AccountField label="First name" name="firstName" value={profile.firstName} onChange={(e) => setField("firstName", e.target.value)} />
                        <AccountField label="Last name" name="lastName" value={profile.lastName} onChange={(e) => setField("lastName", e.target.value)} />
                        <AccountField label="Phone number" name="phone" type="tel" value={profile.phone} onChange={(e) => setField("phone", e.target.value)} required={false} hideable hidden={profile.hidden?.phone} onToggleHide={() => toggleHidden("phone")} />
                        <AccountField label="Gender" name="gender" as="select" options={GENDERS} value={profile.gender} onChange={(e) => setField("gender", e.target.value)} hideable hidden={profile.hidden?.gender} onToggleHide={() => toggleHidden("gender")} />
                        <AccountField label="Birthday" name="birthday" type="date" value={profile.birthday} onChange={(e) => setField("birthday", e.target.value)} hideable hidden={profile.hidden?.birthday} onToggleHide={() => toggleHidden("birthday")} />
                        <AccountField label="Country" name="country" as="select" options={COUNTRIES.map(c => ({ value: c, label: c }))} value={profile.country} onChange={(e) => setField("country", e.target.value)} hideable hidden={profile.hidden?.country} onToggleHide={() => toggleHidden("country")} />
                        {profile.country === "United States" ? (
                            <AccountField label="State" name="state" as="select" options={US_STATES.map(s => ({ value: s, label: s }))} value={profile.state} onChange={(e) => setField("state", e.target.value)} hideable hidden={profile.hidden?.state} onToggleHide={() => toggleHidden("state")} />
                        ) : (
                            <AccountField label="State / Province" name="state" value={profile.state} onChange={(e) => setField("state", e.target.value)} hideable hidden={profile.hidden?.state} onToggleHide={() => toggleHidden("state")} />
                        )}
                    </div>

                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Your role</p>
                    <TileSelect options={PERSONA_OPTIONS} value={profile.personas} onChange={(v) => setField("personas", v)} multi />

                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Games you play</p>
                    <TileSelect options={GAMES} value={profile.games} onChange={(v) => setField("games", v)} multi compact />
                </>
            )}

            <div className={shared.stepFooter}>
                <button type="button" className={shared.primaryButton} onClick={handleSave}>Save changes</button>
            </div>
            {saved && <p className={shared.helperText} style={{ color: "#6bcf8f", textAlign: "center", marginTop: ".85rem" }}>✓ Saved — heading back to your profile...</p>}
        </>
    );

    const renderStatsAchievements = () => (
        <>
            <p className={shared.eyebrow}>Stats & achievements</p>
            <h1 className={shared.stepTitle}>Your record</h1>
            <p className={shared.stepSubtitle}>Tournament, wager, and XP stats are tracked automatically from your matches, they can't be edited here. Achievements are yours to add.</p>

            {profile.personas?.includes("player") && (
                <>
                    <div className={shared.profileSection}>
                        <p className={shared.label} style={{ marginBottom: ".85rem" }}>Tournament stats</p>
                        <StatGrid stats={profile.stats.tournament} />
                    </div>
                    <div className={shared.profileSection}>
                        <p className={shared.label} style={{ marginBottom: ".85rem" }}>Wager stats</p>
                        <StatGrid stats={profile.stats.wager} />
                    </div>
                    <div className={shared.profileSection}>
                        <p className={shared.label} style={{ marginBottom: ".85rem" }}>XP stats</p>
                        <StatGrid stats={profile.stats.xp} />
                    </div>
                </>
            )}

            <div className={shared.profileSection}>
                <p className={shared.label} style={{ marginBottom: ".85rem" }}>Achievements</p>
                <AchievementList
                    achievements={profile.achievements || []}
                    iconOptions={ACHIEVEMENT_ICON_OPTIONS}
                    editable
                    onAdd={handleAddAchievement}
                    onRemove={handleRemoveAchievement}
                />
            </div>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.primaryButton} onClick={handleSave}>Save changes</button>
            </div>
            {saved && <p className={shared.helperText} style={{ color: "#6bcf8f", textAlign: "center", marginTop: ".85rem" }}>✓ Saved — heading back to your profile...</p>}
        </>
    );

    const renderLinks = () => (
        <>
            <p className={shared.eyebrow}>Link accounts</p>
            <h1 className={shared.stepTitle}>Connect your platforms</h1>
            <p className={shared.stepSubtitle}>Optional, these show as icons on your public profile.</p>

            <div className={shared.linkAccountsGrid}>
                {linkPlatforms.map(({ value, label, icon: Icon }) => (
                    <div className={shared.linkAccountRow} key={value}>
                        <Icon className={shared.linkAccountIcon} />
                        <span className={shared.linkAccountLabel}>{label}</span>
                        <input
                            className={shared.linkAccountInput}
                            placeholder="Username"
                            value={profile.links?.[value] || ""}
                            onChange={(e) => setLink(value, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className={shared.stepFooter}>
                <button type="button" className={shared.primaryButton} onClick={handleSave}>Save changes</button>
            </div>
            {saved && <p className={shared.helperText} style={{ color: "#6bcf8f", textAlign: "center", marginTop: ".85rem" }}>✓ Saved — heading back to your profile...</p>}
        </>
    );

    const renderEvents = () => {
        const fields = HOST_EVENT_TYPE_FIELDS[eventDraft.type] || [];

        return (
            <>
                <p className={shared.eyebrow}>Events</p>
                <h1 className={shared.stepTitle}>Your listings</h1>
                <p className={shared.stepSubtitle}>Everything you host, grouped by type. Add a new listing below.</p>

                <div className={shared.profileSection}>
                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Current events</p>
                    {(profile.events || []).length === 0 && <p className={shared.emptyState}>No events yet, add one below.</p>}
                    {(profile.events || []).map(ev => (
                        <div key={ev.id} style={{ position: "relative" }}>
                            <HostEventCard event={ev} typeLabel={HOST_EVENT_TYPE_LABELS[ev.type]} />
                            <button type="button" className={shared.achievementRemove} style={{ position: "absolute", top: ".9rem", right: ".9rem" }} onClick={() => handleRemoveEvent(ev.id)} aria-label="Remove event">
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={shared.profileSection}>
                    <p className={shared.label} style={{ marginBottom: ".85rem" }}>Add an event</p>
                    <TileSelect options={HOST_EVENT_TYPES} value={eventDraft.type} onChange={handleEventTypeChange} compact />

                    <div style={{ height: ".5rem" }} />

                    <div className={shared.formGrid}>
                        {fields.filter(f => f !== "details" && f !== "headerImg" && f !== "bannerImg").map(key => (
                            <AccountField
                                key={key}
                                label={HOST_EVENT_FIELD_LABELS[key]}
                                name={key}
                                type={key === "date" ? "date" : "text"}
                                value={eventDraft[key] || ""}
                                onChange={(e) => handleEventFieldChange(key, e.target.value)}
                                required={false}
                            />
                        ))}
                    </div>

                    {fields.includes("details") && (
                        <div className={shared.field} style={{ marginBottom: "1.5rem" }}>
                            <div className={shared.labelRow}><span className={shared.label}>Details</span></div>
                            <textarea
                                className={shared.input}
                                rows={3}
                                style={{ resize: "vertical", fontFamily: "inherit" }}
                                value={eventDraft.details || ""}
                                onChange={(e) => handleEventFieldChange("details", e.target.value)}
                            />
                        </div>
                    )}

                    {(fields.includes("headerImg") || fields.includes("bannerImg")) && (
                        <div className={shared.imageUploadRow}>
                            {["headerImg", "bannerImg"].filter(k => fields.includes(k)).map(key => (
                                <label
                                    key={key}
                                    className={shared.imageUploadTile}
                                    style={eventDraft[key] ? { backgroundImage: `url(${eventDraft[key]})`, color: "transparent" } : undefined}
                                >
                                    <FaCamera />
                                    {HOST_EVENT_FIELD_LABELS[key]}
                                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleEventImageUpload(key, e.target.files?.[0])} />
                                </label>
                            ))}
                        </div>
                    )}

                    <button type="button" className={shared.secondaryButton} onClick={handleAddEvent} disabled={!eventDraft.name?.trim()}>Add event</button>
                </div>

                <div className={shared.stepFooter}>
                    <button type="button" className={shared.primaryButton} onClick={handleSave}>Save changes</button>
                </div>
                {saved && <p className={shared.helperText} style={{ color: "#6bcf8f", textAlign: "center", marginTop: ".85rem" }}>✓ Saved — heading back to your profile...</p>}
            </>
        );
    };

    const renderVerified = () => (
        <>
            <p className={shared.eyebrow}>uSync Verified</p>
            <h1 className={shared.stepTitle}>{verified ? "You're Verified" : "Get Verified"}</h1>
            <p className={shared.stepSubtitle}>
                {isHost
                    ? "Verified hosts get top placement, event analytics, and lower fees for their players."
                    : "Verified players unlock LAN placement history, a live GameBattles rank badge, and a fully customizable profile."}
            </p>

            <VerifiedLock
                verified={verified}
                title={isHost ? "Verified hosts only" : "Verified players only"}
                description="This demo toggle stands in for a real uSync Verified subscription."
                ctaLabel="Preview as Verified"
                onCtaClick={() => setVerified(true)}
                benefits={isHost ? VERIFIED_BENEFITS : [
                    "LAN placement history with proof links",
                    "Live GameBattles rank badge",
                    "Email alerts for the games you play",
                    "Customizable profile — hide or show any section",
                ]}
            >
                {isHost ? (
                    <div className={shared.achievementCard}>
                        <div className={shared.achievementBody}>
                            <p className={shared.achievementTitle}>Customizable feedback forms</p>
                            <p className={shared.achievementDesc}>Build a post-attendee feedback form for every event you run.</p>
                        </div>
                    </div>
                ) : (
                    <div className={shared.profileSection}>
                        <p className={shared.label} style={{ marginBottom: ".5rem" }}>GameBattles rank</p>
                        <p className={shared.helperText} style={{ marginTop: 0 }}>Pulled automatically from your linked GB username once verified.</p>

                        <p className={shared.label} style={{ margin: "1.25rem 0 .85rem" }}>LAN results</p>
                        {(profile.lanStats || []).map((lan, i) => (
                            <div className={shared.formGrid} key={i} style={{ alignItems: "flex-end" }}>
                                <AccountField label="Placing" name={`placing-${i}`} value={lan.placing} onChange={(e) => handleLanStatChange(i, "placing", e.target.value)} required={false} />
                                <AccountField label="Event" name={`event-${i}`} value={lan.event} onChange={(e) => handleLanStatChange(i, "event", e.target.value)} required={false} />
                                <AccountField label="Proof URL" name={`proof-${i}`} value={lan.proof} onChange={(e) => handleLanStatChange(i, "proof", e.target.value)} required={false} span={2} />
                                <button type="button" className={shared.achievementRemove} onClick={() => handleRemoveLanStat(i)} aria-label="Remove LAN result">
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                        <button type="button" className={shared.secondaryButton} onClick={handleAddLanStat}>Add LAN result</button>
                    </div>
                )}

                <div className={shared.stepFooter}>
                    <button type="button" className={shared.primaryButton} onClick={handleSave}>Save changes</button>
                </div>
                {saved && <p className={shared.helperText} style={{ color: "#6bcf8f", textAlign: "center", marginTop: ".85rem" }}>✓ Saved — heading back to your profile...</p>}
            </VerifiedLock>
        </>
    );

    const sectionRenderers = {
        basics: renderBasics,
        stats: renderStatsAchievements,
        events: renderEvents,
        links: renderLinks,
        verified: renderVerified,
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={"Edit Profile"}
                description="Edit your uSync profile: identity, stats, achievements, link accounts, and verified features."
                canonicalPath={"/account/profile/edit"}
            />

            <div className={shared.previewSwitcher}>
                <span className={shared.previewSwitcherLabel}>Editing as</span>
                <div className={shared.previewToggleGroup}>
                    <button type="button" className={`${shared.previewToggleBtn} ${accountType === "player" ? shared.previewToggleBtnActive : ""}`} onClick={() => switchAccountType("player")}>Player</button>
                    <button type="button" className={`${shared.previewToggleBtn} ${accountType === "host" ? shared.previewToggleBtnActive : ""}`} onClick={() => switchAccountType("host")}>Host</button>
                </div>
            </div>

            <AccountShell sidebar={<ProfileSidebar sections={sections} activeId={activeSection} onSelect={setActiveSection} />}>
                {(sectionRenderers[activeSection] || renderBasics)()}
            </AccountShell>
        </div>
    );
};
