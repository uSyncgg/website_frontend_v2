import { LegalDocument, LegalEmail, SectionRef, LegalNotice, LegalContactCard, LegalListLabel, LegalCaps } from "components";
import { Link } from "react-router";

// Update this date whenever the Terms change (see Section 3).
const LAST_UPDATED = "October 8, 2026";

const SECTIONS = [
    {
        id: "acceptance",
        number: 1,
        title: "Acceptance of Terms",
        content: (
            <>
                <h3>1.1 Agreement to These Terms</h3>
                <p>
                    By accessing, browsing, or using the Services in any way, including by creating an account,
                    registering for or purchasing a pass to an event, listing or hosting an event, running a bracket,
                    or submitting content, you confirm that you have read, understood, and agree to be bound by these
                    Terms and by the policies referenced in them. <strong>If you do not agree, you must not access or
                    use the Services.</strong>
                </p>
                <p>
                    Where we ask you to affirmatively accept these Terms (for example, by checking a box or clicking a
                    button when you create an account or check out), that acceptance applies in addition to your
                    acceptance through use.
                </p>

                <h3>1.2 Related Policies and Additional Terms</h3>
                <p>The following also apply to your use of the Services and form part of these Terms:</p>
                <ul>
                    <li>
                        <strong><Link to="/more/privacy-policy">Privacy Policy</Link>.</strong> Describes how we
                        collect, use, and share personal information, including information about minors.
                    </li>
                    <li>
                        <strong>Checkout disclosures.</strong> Pricing, platform fee, and renewal terms shown to you at
                        the time of purchase.
                    </li>
                    <li>
                        <strong>Program terms.</strong> Any guidelines we provide for uSync Verified or for promotional
                        programs you participate in.
                    </li>
                </ul>
                <p>
                    Rules, refund policies, and waivers published by the organizer of an event or bracket you join are
                    an agreement between you and that organizer. They do not modify these Terms or create obligations
                    for uSync.
                </p>

                <h3>1.3 Accepting on Behalf of an Organization</h3>
                <p>
                    If you use the Services on behalf of a team, esports organization, company, or other entity, you
                    represent that you are authorized to bind that entity to these Terms, and “you” refers to both you
                    and that entity.
                </p>

                <h3>1.4 Parents and Legal Guardians</h3>
                <p>
                    If you are a parent or legal guardian who permits a minor to use the Services, you agree to these
                    Terms on your own behalf and on behalf of the minor. You are responsible for the minor’s use of the
                    Services, including any purchases and content, and you agree to supervise that use as appropriate.
                </p>
            </>
        ),
    },
    {
        id: "about",
        number: 2,
        title: "About uSync and Our Services",
        content: (
            <>
                <p>
                    uSync is an esports discovery, promotion, and competition platform. We bring competitive gaming
                    opportunities that are usually scattered across dozens of websites, Discord servers, and social
                    media pages into one hub, so players, teams, and organizers can find, promote, and run events. We
                    currently cover titles including Call of Duty, Warzone, Counter-Strike 2, Halo, League of Legends,
                    Rocket League, and Valorant, and we may add or remove titles at any time.
                </p>

                <h3>2.1 What the Services Include</h3>
                <p>Depending on availability, the Services include:</p>
                <ul>
                    <li>
                        <strong>Event discovery.</strong> Searchable listings of LAN events, leagues, online
                        tournaments, head-to-head (“H2H”) platforms, and wager or cash-match platforms, along with game
                        hubs, filters, and an interactive map for finding events near you.
                    </li>
                    <li>
                        <strong>Event promotion and marketing.</strong> Tools and services that let event organizers
                        (“Hosts”) submit events for listing on uSync and, where offered, purchase promotional services
                        such as featured placement, sponsored listings, or promotion on uSync’s social media channels.
                    </li>
                    <li>
                        <strong>uSync Verified.</strong> A paid program through which Hosts can apply to have their
                        organization reviewed and, if approved, display the uSync Verified badge.
                    </li>
                    <li>
                        <strong>Event registration and passes.</strong> A checkout flow, powered by our third-party
                        payment processor, through which participants can register for and purchase passes or entries to
                        events run by Hosts.
                    </li>
                    <li>
                        <strong>Bracket and tournament hosting.</strong> Tools that allow users to create, manage, and
                        run their own brackets and tournaments, including seeding, scheduling, and results reporting.
                    </li>
                    <li>
                        <strong>Accounts and profiles.</strong> Player and Host accounts with public profiles, linked
                        gaming and social accounts, and competition history.
                    </li>
                    <li>
                        <strong>Content.</strong> Articles, guides, FAQs, and other editorial content about esports.
                    </li>
                </ul>

                <h3>2.2 uSync Is Not the Event Organizer</h3>
                <p>
                    Unless we expressly state otherwise for a particular event, uSync does not organize, operate,
                    sponsor, or control the events, leagues, tournaments, platforms, or brackets listed on or hosted
                    through the Services. They are run by independent third parties. When you register for, purchase a
                    pass to, or participate in an event, your agreement for that event is with its Host, not with
                    uSync. See <SectionRef to="events-hosts">Section 7</SectionRef> for more detail.
                </p>

                <h3>2.3 Sponsored and Featured Content</h3>
                <p>
                    Some listings or content may be featured or promoted because a Host paid for promotion. Where
                    required by law, we will label paid placements (for example, as “Sponsored,” “Featured,” or
                    “Promoted”). The placement and order of listings may also be influenced by factors such as
                    verification status, relevance, date, and location.
                </p>

                <h3>2.4 No Affiliation with Game Publishers</h3>
                <p>
                    uSync is an independent platform. Unless expressly stated, uSync is not affiliated with, endorsed
                    by, or sponsored by any game publisher or platform, including Activision, Riot Games, Valve,
                    Microsoft, Epic Games, or Psyonix. All game titles and related marks belong to their respective
                    owners.
                </p>

                <h3>2.5 Beta and Evolving Features</h3>
                <p>
                    Some features may be labeled beta, preview, or early access, or may be released gradually. These
                    features may be incomplete, may change or be discontinued without notice, and are provided without
                    any commitment that they will become generally available.
                </p>

                <h3>2.6 Promotions, Contests, and Giveaways</h3>
                <p>
                    uSync, Hosts, and sponsors may run promotions, contests, sweepstakes, or giveaways on or through the
                    Services. Each one is governed by its own official rules, which will describe eligibility (including
                    any age or location limits), how to enter, how winners are chosen, the prizes, and who is
                    responsible for awarding them. If official rules conflict with these Terms, the official rules
                    control for that promotion. Promotions run by Hosts or sponsors are their responsibility, not
                    uSync’s, and are void where prohibited.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        number: 3,
        title: "Changes to These Terms",
        content: (
            <>
                <h3>3.1 Our Right to Update</h3>
                <p>
                    We may revise these Terms from time to time, for example to reflect new features, changes to our
                    business, or changes in the law. The “Last Updated” date at the top of this page shows when these
                    Terms were last changed.
                </p>

                <h3>3.2 How We Will Notify You</h3>
                <ul>
                    <li>
                        <strong>Material changes.</strong> We will give you at least 14 days’ notice before material
                        changes take effect by posting a notice on the Services, emailing the address associated with
                        your account, and/or displaying a notice when you sign in.
                    </li>
                    <li>
                        <strong>Non-material changes.</strong> Clarifications, formatting updates, and corrections may
                        be made by posting the revised Terms on this page.
                    </li>
                    <li>
                        <strong>Urgent changes.</strong> Changes required by law, or that address new features or urgent
                        security, safety, or legal concerns, may take effect immediately.
                    </li>
                </ul>

                <h3>3.3 Your Choices</h3>
                <p>
                    Revised Terms apply from their effective date going forward. If you continue to use the Services
                    after that date, you accept the revised Terms. If you do not agree, you must stop using the
                    Services and may close your account (see <SectionRef to="termination">Section 13</SectionRef>). If you hold a
                    paid subscription, you may cancel it before the revised Terms take effect, as described
                    in <SectionRef to="purchases">Section 8</SectionRef>.
                </p>

                <h3>3.4 No Retroactive Effect on Disputes</h3>
                <p>
                    Revised Terms will not apply to any dispute between you and uSync that arose, or that either of us
                    had notice of, before the revised Terms took effect. Changes to the arbitration agreement are also
                    subject to Section 12.10.
                </p>

                <h3>3.5 Changes to the Services</h3>
                <p>
                    We may add, change, suspend, or discontinue any part of the Services at any time. If a change
                    materially reduces a paid feature you have prepaid for, we will notify you and, where appropriate,
                    provide a pro-rated refund or credit.
                </p>
            </>
        ),
    },
    {
        id: "eligibility",
        number: 4,
        title: "Use of the Website & Eligibility",
        content: (
            <>
                <h3>4.1 Age Requirements</h3>
                <p>uSync is open to the general public, including minors, subject to the following rules:</p>
                <ul>
                    <li>
                        <strong>Everyone</strong> may browse the public pages of the Services.
                    </li>
                    <li>
                        <strong>Children under 13</strong> may not create an account, purchase passes or
                        subscriptions, host brackets, register for events through uSync, or submit any personal
                        information or content to us. We do not knowingly collect personal information from children
                        under 13 without verifiable parental consent as required by the Children’s Online Privacy
                        Protection Act (“COPPA”). If we learn that we have collected such information, we will delete
                        it. A parent or guardian who believes their child has provided us with personal information may
                        contact us at <LegalEmail />.
                    </li>
                    <li>
                        <strong>Minors ages 13 to 17</strong> (or under the age of majority where they live) may create
                        an account and use the Services only with the permission and supervision of a parent or legal
                        guardian who has reviewed and agreed to these Terms. Purchases by minors must be made, or
                        expressly authorized, by a parent or legal guardian.
                    </li>
                    <li>
                        <strong>Adults 18 and older</strong> may use the Services subject to these Terms.
                    </li>
                    <li>
                        <strong>Age-restricted events and platforms.</strong> Some events, Hosts, prizes, venues, and
                        third-party platforms (including wager and cash-match platforms) set their own minimum ages,
                        often 18 or older, or have additional eligibility rules. You must meet those requirements before
                        you participate, and you may not misrepresent your age to anyone. We may restrict access to
                        certain features or listings based on age.
                    </li>
                </ul>

                <h3>4.2 Geographic Limits</h3>
                <p>
                    The Services are operated by uSync from the State of Ohio, United States, and are intended primarily
                    for users in the United States. We make no representation that the Services, any listed event, or
                    any third-party platform is appropriate, lawful, or available in every location. If you access the
                    Services from outside the United States, you do so on your own initiative and are responsible for
                    complying with local laws.
                </p>
                <p>
                    You may not use the Services if you are located in a country subject to comprehensive U.S.
                    government sanctions or are identified on any U.S. government list of prohibited or restricted
                    parties. You agree to comply with all applicable U.S. export control and sanctions laws.
                </p>

                <h3>4.3 Your License to Use the Services</h3>
                <p>
                    Subject to your compliance with these Terms, uSync grants you a limited, revocable, non-exclusive,
                    non-transferable, non-sublicensable license to access and use the Services for your personal,
                    non-commercial use and, if you are a Host, to promote and administer your own events using the
                    features we provide. All rights not expressly granted are reserved by uSync.
                </p>

                <h3>4.4 Prohibited Activities</h3>
                <p>You agree not to do, attempt to do, or help anyone else do any of the following:</p>

                <LegalListLabel>Security and technical abuse</LegalListLabel>
                <ul>
                    <li>
                        Hack, probe, scan, or test the vulnerability of the Services, or breach or circumvent any
                        security, authentication, rate-limiting, or access-control measure.
                    </li>
                    <li>Introduce viruses, malware, or other harmful code, or launch denial-of-service or other attacks.</li>
                    <li>
                        Interfere with, disrupt, or place an unreasonable load on the Services or the networks and
                        servers that support them.
                    </li>
                    <li>
                        Reverse engineer, decompile, or disassemble any part of the Services, except where this
                        restriction is prohibited by law.
                    </li>
                    <li>Access non-public areas of the Services, or another user’s account, without authorization.</li>
                </ul>

                <LegalListLabel>Scraping and automated access</LegalListLabel>
                <ul>
                    <li>
                        Use any robot, spider, scraper, crawler, or other automated means to access, copy, or collect
                        data from the Services, including event listings, Host information, profiles, or results.
                        Public search engines may index the Services in accordance with our robots.txt file.
                    </li>
                    <li>
                        Harvest or collect personal information about other users, including email addresses,
                        usernames, or linked accounts.
                    </li>
                    <li>
                        Copy, aggregate, or republish our event listings or other content to build a competing
                        directory, database, or service.
                    </li>
                    <li>
                        Use content from the Services to train, fine-tune, or develop artificial intelligence or
                        machine learning models without our written permission.
                    </li>
                </ul>

                <LegalListLabel>Illegal and fraudulent use</LegalListLabel>
                <ul>
                    <li>Use the Services for any unlawful purpose or in violation of any applicable law or regulation.</li>
                    <li>
                        Operate, promote, or facilitate illegal gambling, lotteries, or sweepstakes, or any wagering
                        activity that is not lawful where you or other participants are located.
                    </li>
                    <li>
                        Use stolen or unauthorized payment methods, launder money, file fraudulent chargebacks, or
                        engage in any other payment fraud.
                    </li>
                    <li>
                        Avoid or circumvent fees owed to uSync, including by redirecting payment for passes sold
                        through uSync off the platform.
                    </li>
                    <li>Post fake, misleading, or deceptive events, prizes, listings, or offers.</li>
                </ul>

                <LegalListLabel>Harmful conduct toward others</LegalListLabel>
                <ul>
                    <li>Harass, bully, threaten, stalk, intimidate, or abuse anyone.</li>
                    <li>
                        Post content that is hateful, discriminatory, violent, sexually explicit, or otherwise
                        objectionable, or that is harmful to minors.
                    </li>
                    <li>Disclose anyone’s private information (“doxxing”) without their consent.</li>
                    <li>
                        Impersonate any person or organization, including uSync staff, a Host, or a professional
                        player, or misrepresent your affiliation with anyone.
                    </li>
                    <li>Send spam, chain messages, unsolicited promotions, or phishing messages.</li>
                </ul>

                <LegalListLabel>Competitive integrity</LegalListLabel>
                <ul>
                    <li>
                        Cheat, use unauthorized software or exploits, or engage in match-fixing, collusion, or
                        deliberately losing.
                    </li>
                    <li>
                        Report false results, manipulate brackets, seeding, or rankings, or use multiple accounts to
                        gain an unfair advantage.
                    </li>
                    <li>
                        Share, sell, buy, or transfer accounts, or play on another person’s account in violation of
                        event rules.
                    </li>
                </ul>

                <LegalListLabel>Misuse of uSync branding</LegalListLabel>
                <ul>
                    <li>
                        Display the uSync Verified badge or any uSync logo without authorization, or suggest that uSync
                        endorses you or your event when it does not.
                    </li>
                </ul>

                <h3>4.5 Child Safety</h3>
                <p>
                    uSync has zero tolerance for child sexual exploitation or abuse, grooming, or any attempt to
                    solicit minors for sexual purposes or to obtain their personal information. Adults may not use the
                    Services to seek private contact with minors they do not know. We will remove violating content,
                    terminate associated accounts, and report apparent child sexual exploitation to the National Center
                    for Missing &amp; Exploited Children (NCMEC) and to law enforcement as required by law.
                </p>

                <h3>4.6 Reporting Violations</h3>
                <p>
                    If you see something that violates these Terms, please tell us through
                    our <Link to="/reportproblem">Report a Problem</Link> page or by emailing <LegalEmail />. We review
                    reports in good faith but cannot guarantee a particular outcome or timeline.
                </p>
            </>
        ),
    },
    {
        id: "accounts",
        number: 5,
        title: "User Accounts & Security",
        content: (
            <>
                <h3>5.1 Creating an Account</h3>
                <p>Some features require an account. When you create one, you agree to:</p>
                <ul>
                    <li>provide accurate, current, and complete information, and keep it up to date;</li>
                    <li>
                        create only one personal account, unless we permit otherwise (for example, a separate Host
                        account for an organization); and
                    </li>
                    <li>
                        choose a username that does not impersonate anyone, infringe anyone’s rights, or contain
                        offensive language.
                    </li>
                </ul>
                <p>
                    We may refuse, reclaim, or change usernames at our discretion, for example to resolve impersonation
                    or trademark complaints.
                </p>

                <h3>5.2 Keeping Your Login Credentials Safe</h3>
                <p>
                    You are responsible for safeguarding your account and for all activity that occurs under it. You
                    agree to:
                </p>
                <ul>
                    <li>keep your password and other login credentials confidential and never share them;</li>
                    <li>use a strong, unique password and keep the email account linked to your uSync account secure;</li>
                    <li>sign out of shared or public devices; and</li>
                    <li>
                        notify us immediately at <LegalEmail subject="Account Security" /> if you suspect unauthorized
                        access to or use of your account.
                    </li>
                </ul>
                <p>
                    If you sign in through a third-party sign-in provider, you are also responsible for the security
                    of that account, and your use of it is governed by that provider’s terms. uSync will never ask for
                    your password by email, direct message, or phone. uSync is not liable for any loss or damage
                    arising from your failure to protect your credentials, and you may be liable for losses that uSync
                    or others incur because of unauthorized use of your account.
                </p>

                <h3>5.3 Gaming and Social Accounts on Your Profile</h3>
                <p>
                    You may add your usernames for third-party gaming, streaming, and social platforms (for example,
                    Twitch, Discord, Steam, Riot, Battle.net, Activision, or X) to your uSync profile, where they are
                    displayed publicly. Adding a username does not give uSync access to that account. You may only add
                    usernames for accounts that you own or are authorized to represent, and you may remove them at any
                    time. Your use of those platforms is governed by their own terms, and uSync is not responsible for
                    their services, availability, or practices.
                </p>

                <h3>5.4 Public Profiles</h3>
                <p>
                    Player and Host profiles are publicly viewable and may display your username, name, profile
                    picture, bio, games, roles, gaming and social usernames, teams, competition history, and, for
                    Hosts, organization details and venues. Do not put anything in your profile that you do not want
                    to be public. Our <Link to="/more/privacy-policy">Privacy Policy</Link> explains which profile
                    information is public by default. We strongly encourage minors not to share their full name, school,
                    home address, phone number, or other identifying details anywhere on the Services.
                </p>

                <h3>5.5 No Transfers</h3>
                <p>
                    Your account is personal to you. You may not sell, rent, transfer, or share your account, and any
                    attempt to do so is void.
                </p>

                <h3>5.6 Closing Your Account</h3>
                <p>
                    You may stop using the Services at any time and may ask us to close your account through your
                    account settings (where available) or by emailing <LegalEmail subject="Close My Account" />.
                    See <SectionRef to="termination">Section 13</SectionRef> for what happens when an account is closed.
                </p>
            </>
        ),
    },
    {
        id: "intellectual-property",
        number: 6,
        title: "Intellectual Property Rights",
        content: (
            <>
                <h3>6.1 uSync’s Content</h3>
                <p>
                    The Services and the content and materials we provide, including software, code, design, layouts,
                    text, graphics, images, the selection and arrangement of event listings, and the overall look and
                    feel of the site (“uSync Content”), are owned by uSync or its licensors and are protected by
                    copyright, trademark, and other intellectual property laws. Apart from the limited license
                    in Section 4.3, nothing in these Terms gives you any right, title, or interest in uSync Content.
                </p>

                <h3>6.2 uSync Trademarks</h3>
                <p>
                    “uSync,” “uSync Verified,” the uSync logo, the Verified badge, and related names, logos, and designs
                    are trademarks of uSync LLC. You may not use them without our prior written permission, except that
                    approved uSync Verified Hosts may display the Verified badge in line with our guidelines while
                    their verification remains active.
                </p>

                <h3>6.3 Third-Party Marks and Content</h3>
                <p>
                    Game titles, artwork, publisher and platform names, and other third-party trademarks, trade dress,
                    and copyrighted materials that appear on the Services belong to their respective owners and are
                    used for identification and informational purposes only. Their appearance does not imply any
                    affiliation with or endorsement by those owners.
                </p>

                <h3>6.4 Your Content</h3>
                <p>
                    “Your Content” means anything you submit, post, upload, or transmit through the Services, including
                    profile information, usernames, avatars, bios, team names and logos, event listings and
                    descriptions, images, bracket data, match results, comments, and messages. As between you and
                    uSync, you keep ownership of Your Content.
                </p>

                <h3>6.5 License You Grant to uSync</h3>
                <p>
                    By submitting Your Content, you grant uSync a worldwide, non-exclusive, royalty-free, fully paid-up,
                    transferable, and sublicensable license to host, store, reproduce, modify (for example, to resize or
                    reformat), adapt, publish, translate, publicly display, publicly perform, distribute, and create
                    derivative works of Your Content, in any media now known or later developed, to operate, provide,
                    improve, and promote the Services and the events listed on them. This includes, for example:
                </p>
                <ul>
                    <li>
                        displaying Host event listings, names, logos, and images on uSync and in uSync’s marketing and
                        social media to promote the event and uSync;
                    </li>
                    <li>
                        displaying usernames, gamertags, team names, and competition results publicly in brackets,
                        standings, and rankings; and
                    </li>
                    <li>allowing our service providers to process Your Content on our behalf.</li>
                </ul>
                <p>
                    This license ends when you delete Your Content or close your account, except to the extent that
                    (i) Your Content has been shared with or by others, or incorporated into brackets, results, or
                    records that other users rely on (which we keep in de-identified form after you close your
                    account, as described in our Privacy Policy); (ii) it appears in promotional materials created before
                    deletion; (iii) we keep backup copies for a reasonable period; or (iv) we must retain it for legal
                    reasons. To the extent permitted by law, you waive, and agree not to assert, any moral rights in
                    Your Content against uSync for uses permitted by this license. We will not use the real name or
                    photograph of a user we know to be a minor in paid advertising without the consent of a parent or
                    guardian.
                </p>

                <h3>6.6 Your Promises About Your Content</h3>
                <p>You represent and warrant that:</p>
                <ul>
                    <li>
                        you own Your Content or have all the rights, licenses, and permissions needed to grant the
                        license above;
                    </li>
                    <li>
                        Your Content, and our use of it as permitted by these Terms, will not infringe or misappropriate
                        any copyright, trademark, privacy, publicity, or other right of any person;
                    </li>
                    <li>
                        you have the consent of every identifiable person who appears in Your Content, and of a parent
                        or guardian for any minor; and
                    </li>
                    <li>
                        Your Content is accurate (in the case of event listings, results, and other factual information)
                        and complies with these Terms and all applicable laws.
                    </li>
                </ul>

                <h3>6.7 Content Moderation</h3>
                <p>
                    We are not obligated to monitor content, but we may review, screen (including with automated
                    moderation tools), edit, refuse, or remove any content at any time and for any reason, including content we believe violates these Terms or could
                    harm uSync, our users, or third parties. Content posted by users and Hosts reflects their views,
                    not ours, and we are not responsible for it.
                </p>

                <h3>6.8 Feedback</h3>
                <p>
                    If you send us suggestions, ideas, or feedback about the Services, you agree that we may use them
                    for any purpose without restriction or compensation to you.
                </p>

                <h3>6.9 Copyright Complaints (DMCA)</h3>
                <p>
                    We respond to notices of alleged copyright infringement that comply with the Digital Millennium
                    Copyright Act (“DMCA”), 17 U.S.C. § 512. If you believe content on the Services infringes your
                    copyright, send our designated agent a written notice that includes:
                </p>
                <ol>
                    <li>your physical or electronic signature;</li>
                    <li>identification of the copyrighted work you claim has been infringed;</li>
                    <li>
                        identification of the material you claim is infringing and where it is located on the Services
                        (such as a URL);
                    </li>
                    <li>your name, mailing address, telephone number, and email address;</li>
                    <li>
                        a statement that you have a good-faith belief that the use is not authorized by the copyright
                        owner, its agent, or the law; and
                    </li>
                    <li>
                        a statement, made under penalty of perjury, that the information in your notice is accurate and
                        that you are the copyright owner or authorized to act on the owner’s behalf.
                    </li>
                </ol>
                <p>
                    Send notices to uSync LLC, Attn: Copyright Agent, at <LegalEmail subject="DMCA Notice" />. If your
                    content was removed and you believe it was removed by mistake or misidentification, you may submit
                    a counter-notice as provided in 17 U.S.C. § 512(g). In appropriate circumstances, we will terminate
                    the accounts of repeat infringers. Knowingly misrepresenting that material is infringing may expose
                    you to liability.
                </p>
            </>
        ),
    },
    {
        id: "events-hosts",
        number: 7,
        title: "Events, Hosts & Third-Party Services",
        content: (
            <>
                <h3>7.1 Events Are Run by Independent Hosts</h3>
                <p>
                    Events, leagues, tournaments, brackets, H2H platforms, and wager platforms listed on or hosted
                    through the Services are operated by independent third parties (each a “Host”). uSync does not
                    control and is not responsible for:
                </p>
                <ul>
                    <li>whether an event takes place as scheduled, or at all;</li>
                    <li>event rules, formats, administration, rulings, or dispute outcomes;</li>
                    <li>the awarding, amount, timing, or payment of any prize or winnings;</li>
                    <li>a Host’s refund, cancellation, or transfer policies;</li>
                    <li>the safety, security, accessibility, or condition of any venue; or</li>
                    <li>the conduct of Hosts, admins, participants, spectators, or other third parties.</li>
                </ul>
                <p>
                    Your participation in an event is at your own discretion and risk and is governed by your agreement
                    with the Host. Please review the Host’s rules and policies before registering.
                </p>

                <h3>7.2 Listing Accuracy</h3>
                <p>
                    Event information on uSync is provided by Hosts or gathered from publicly available sources. Dates,
                    locations, formats, prize pools, prices, and other details can change and may be inaccurate,
                    incomplete, or out of date. Always confirm important details directly with the Host. We may
                    decline, edit, or remove any listing at our discretion.
                </p>

                <h3>7.3 What uSync Verified Does and Does Not Mean</h3>
                <p>
                    The uSync Verified badge means that a Host met uSync’s verification criteria at the time of our
                    review. It is not a guarantee, warranty, insurance policy, or endorsement of any particular event,
                    and it does not mean that uSync supervises the Host’s operations. Verification may be suspended or
                    revoked at any time, and a Verified Host can still cancel an event, fail to pay a prize, or
                    otherwise fall short of expectations.
                </p>

                <h3>7.4 Host Responsibilities</h3>
                <p>
                    If you list an event, sell passes through uSync, or run a bracket using our tools, you are a Host,
                    and you agree to:
                </p>
                <ul>
                    <li>
                        provide accurate, complete, and current information about your event, including dates,
                        location, format, eligibility rules, entry costs, prizes, and your refund policy;
                    </li>
                    <li>
                        advertise pass prices lawfully, including by showing the total price with all mandatory fees
                        (including uSync’s platform fee) wherever you display a price;
                    </li>
                    <li>publish clear rules and prize terms, and administer your event fairly and consistently with them;</li>
                    <li>
                        deliver the event, passes, and prizes as advertised, and handle customer support, refunds, and
                        disputes for your event;
                    </li>
                    <li>
                        comply with all applicable laws, including laws relating to contests, sweepstakes, gambling,
                        consumer protection, taxes (including tax reporting on prizes), privacy, accessibility, and the
                        protection of minors;
                    </li>
                    <li>
                        obtain any licenses, permits, insurance, and permissions your event requires, including
                        tournament licenses or community-competition approvals required by game publishers and any
                        permits required by your venue;
                    </li>
                    <li>
                        put appropriate safeguards in place when minors participate in your event, including
                        supervision and parental consent where required; and
                    </li>
                    <li>
                        collect, use, and protect participants’ personal information lawfully and only to run your
                        event.
                    </li>
                </ul>
                <p>
                    You are solely responsible for your events. uSync may remove listings, disable passes, withhold or
                    reverse payouts as described in <SectionRef to="purchases">Section 8</SectionRef>, or suspend Host accounts that
                    do not meet these requirements.
                </p>

                <h3>7.5 Bracket and Tournament Hosting Tools</h3>
                <p>
                    Where available, our bracket and tournament tools are provided to help you organize competitions.
                    You are responsible for how you configure and run your bracket, including seeding, scheduling,
                    check-in, result reporting, and dispute resolution. uSync does not referee matches or verify
                    results, does not guarantee that the tools will be uninterrupted or error-free, and is not
                    responsible for disputes about outcomes. We may pause, modify, or remove a bracket that violates
                    these Terms.
                </p>

                <h3>7.6 Prizes, Wagers, and Cash Competitions</h3>
                <ul>
                    <li>
                        uSync does not operate wagering services and does not hold prize funds, entry fees, or wagers
                        on behalf of participants unless we expressly state otherwise.
                    </li>
                    <li>
                        Wager and cash-match platforms listed on uSync are independent third-party businesses. Listing a
                        platform is not a statement that its services are legal where you live, or that the platform is
                        safe or reputable.
                    </li>
                    <li>
                        Laws governing skill-based competitions, paid entries, and prizes vary by state and country, and
                        many platforms require users to be 18 or older. You are solely responsible for determining
                        whether you are legally permitted and eligible to participate.
                    </li>
                    <li>
                        Minors must not participate in wagers, cash matches, or other paid-entry competitions where
                        prohibited by law or by the platform’s or Host’s rules.
                    </li>
                    <li>
                        Each prize is the sole responsibility of the Host offering it. Winners are responsible for any
                        taxes on prizes they receive.
                    </li>
                </ul>

                <h3>7.7 In-Person Events: Assumption of Risk</h3>
                <p>
                    In-person events such as LANs and conventions involve travel, crowds, equipment, and venues that
                    uSync does not own or control. You attend at your own risk and are responsible for your own
                    conduct, safety, and personal property. Parents and guardians are responsible for supervising
                    minors who attend. You agree to follow venue rules and the Host’s instructions, and you acknowledge
                    that Hosts may require you to sign their own waivers. To the fullest extent permitted by law, uSync
                    is not liable for any injury, illness, loss, theft, or damage arising from your attendance at any
                    event.
                </p>

                <h3>7.8 Third-Party Websites and Services</h3>
                <p>
                    The Services contain links to, and integrations with, third-party websites and services, including
                    Host websites and registration pages, wager and H2H platforms, social media, embedded videos and
                    posts, forms, and our payment processor. uSync does not control and is not responsible for
                    third-party content, products, services, privacy practices, or availability. Your use of
                    third-party services is governed by their terms, and you access them at your own risk.
                </p>

                <h3>7.9 Disputes With Hosts or Other Users</h3>
                <p>
                    Any dispute you have with a Host or another user is between you and that party. uSync may help
                    resolve such disputes but is not required to. To the fullest extent permitted by law, you release
                    uSync and its members, managers, officers, employees, and agents from claims, demands, and damages
                    of every kind, known and unknown, arising out of or in any way connected with such disputes.
                </p>
                <p>
                    If you are a California resident, you waive California Civil Code § 1542, which says: “A general
                    release does not extend to claims that the creditor or releasing party does not know or suspect to
                    exist in his or her favor at the time of executing the release and that, if known by him or her,
                    would have materially affected his or her settlement with the debtor or released party.” You also
                    waive any similar law in any other jurisdiction.
                </p>
            </>
        ),
    },
    {
        id: "purchases",
        number: 8,
        title: "Purchases, Billing & Refunds",
        content: (
            <>
                <h3>8.1 Paid Services</h3>
                <p>uSync offers the following paid products and services (each a “Paid Service”), which may change over time:</p>
                <ul>
                    <li>
                        <strong>Event passes and registrations</strong> for events run by Hosts, purchased through
                        uSync’s checkout;
                    </li>
                    <li>
                        <strong>uSync Verified</strong> and other subscriptions or memberships for Hosts or players; and
                    </li>
                    <li>
                        <strong>Promotional services</strong> for Hosts, such as featured placements or social media
                        promotion.
                    </li>
                </ul>
                <p>Additional terms for a Paid Service may be presented at the time of purchase and form part of these Terms.</p>

                <h3>8.2 Pricing and Taxes</h3>
                <ul>
                    <li>All prices are in U.S. dollars unless otherwise stated.</li>
                    <li>
                        The price, any platform fee, and any applicable taxes are shown before you complete your
                        purchase. You are responsible for any applicable sales, use, or similar taxes.
                    </li>
                    <li>
                        We may change our prices at any time, but changes will not affect orders already completed.
                        Subscription price changes are handled as described in Section 8.5.
                    </li>
                    <li>
                        If a price or other information is displayed in error, we may cancel the affected order and
                        refund any amount you paid, even after the order has been confirmed.
                    </li>
                </ul>

                <h3>8.3 Payment Processing</h3>
                <p>
                    Payments are processed by our third-party payment processor, Stripe, Inc. (“Stripe”), and are
                    subject to Stripe’s terms and privacy policy. uSync does not store your full card number. By
                    submitting payment information, you represent that you are authorized to use the payment method,
                    and you authorize us (and Stripe on our behalf) to charge it for the total amount shown at
                    checkout, including any recurring charges you agree to.
                </p>

                <h3>8.4 Event Passes and Platform Fees</h3>
                <ul>
                    <li>
                        The price of each event pass is set by the Host. uSync collects the pass price on the Host’s
                        behalf as its limited payment collection agent and passes it on to the Host, and your payment
                        to uSync satisfies your obligation to pay the Host for the pass.
                    </li>
                    <li>
                        uSync charges a mandatory platform fee, currently <strong>5% of the pass price</strong>, for
                        providing the registration, checkout, and payment services used to sell the pass. The fee is
                        included in the total price shown before you pay and is listed separately in your order summary
                        and receipt. We may change the platform fee for future purchases.
                    </li>
                    <li>
                        A pass gives you the right to attend or participate in the event as described by the Host,
                        subject to the Host’s rules. Passes may not be transferred or resold unless the Host allows it
                        or applicable law requires that transfers be permitted.
                    </li>
                    <li>Your receipt from uSync confirms your payment; it is not a guarantee that the Host will deliver the event.</li>
                </ul>

                <h3>8.5 Subscriptions and Automatic Renewal</h3>
                <p>
                    Some Paid Services, such as uSync Verified, may be offered as subscriptions. Before you subscribe, we
                    will clearly disclose the price, billing frequency, renewal terms, and how to cancel. By
                    subscribing, you agree that:
                </p>
                <ul>
                    <li>
                        <strong>your subscription automatically renews</strong> at the end of each billing period (for
                        example, monthly or annually) for the same period until you cancel;
                    </li>
                    <li>
                        we will charge your payment method on file at the start of each renewal period at the
                        then-current price;
                    </li>
                    <li>
                        if your subscription includes a free trial or introductory price, it will convert to a paid
                        subscription at the regular price when the trial or introductory period ends, unless you cancel
                        before then;
                    </li>
                    <li>
                        we will notify you at least 30 days before any price increase takes effect, and you may cancel
                        before the new price applies; and
                    </li>
                    <li>where required by law, we will send you a reminder before an annual subscription renews.</li>
                </ul>
                <p>
                    After you subscribe, we will send you a confirmation by email that includes the subscription terms,
                    the renewal price and frequency, and how to cancel.
                </p>
                <p>If a renewal payment fails, we may retry the charge, suspend paid features, or cancel the subscription.</p>

                <h3>8.6 Cancelling a Subscription</h3>
                <p>
                    You can cancel a subscription at any time through your account or billing settings (where
                    available) or by emailing <LegalEmail subject="Cancel Subscription" />. Cancellation takes effect at the
                    end of your current billing period, and we will confirm it by email. You will keep access to paid
                    features until then and will not be charged again. Except as stated in Section 8.7 or required by law, we do not provide refunds or
                    credits for partial billing periods.
                </p>

                <h3>8.7 Refund Policy</h3>
                <ul>
                    <li>
                        <strong>Event passes.</strong> Refunds of the pass price are governed by the Host’s refund
                        policy, and the Host is responsible for honoring it. Please contact the Host first. uSync may
                        help facilitate a refund at its discretion but is not obligated to issue refunds on a Host’s
                        behalf.
                    </li>
                    <li>
                        <strong>Platform fees.</strong> Platform fees are non-refundable once a purchase is complete,{" "}
                        <strong>except</strong> that if an event is cancelled and not rescheduled and the Host issues a
                        full refund of the pass price, uSync will also refund its platform fee.
                    </li>
                    <li>
                        <strong>Subscriptions.</strong> Subscription fees are non-refundable except where required by
                        law. If we terminate your subscription without cause, we will refund the unused, prepaid
                        portion.
                    </li>
                    <li>
                        <strong>Promotional services.</strong> Fees for promotional services are non-refundable once the
                        promotion has begun. If we cannot deliver a promotion you paid for, we will offer a refund or
                        credit for the undelivered portion.
                    </li>
                    <li>
                        <strong>Billing errors.</strong> If you believe you were charged in error or without
                        authorization, contact us at <LegalEmail subject="Billing Error" /> within 60 days of the charge. We
                        will investigate and refund verified errors.
                    </li>
                    <li>
                        <strong>Your legal rights.</strong> Nothing in this policy limits any refund, cancellation, or
                        withdrawal right you have under applicable consumer protection law.
                    </li>
                </ul>

                <h3>8.8 Chargebacks</h3>
                <p>
                    If you have a problem with a charge, please contact us before disputing it with your bank or card
                    issuer so we can try to resolve it quickly. We may suspend or close accounts associated with
                    chargebacks we reasonably believe are fraudulent or abusive, and we may share transaction details
                    with your card issuer and the Host to respond to a dispute.
                </p>

                <h3>8.9 Purchases by Minors</h3>
                <p>
                    Purchases by users under 18 must be made by, or with the express permission of, a parent or legal
                    guardian, who is responsible for all charges. If you believe a minor made a purchase without
                    permission, contact us at <LegalEmail subject="Unauthorized Purchase" />.
                </p>

                <h3>8.10 Host Payouts</h3>
                <p>
                    uSync pays pass proceeds, minus any amounts described below, to Hosts on the schedule and by the
                    method set out in our agreement with each Host. Hosts may be required to provide identity, tax, and
                    banking information, and, if we route payouts through our payment processor, to create an account
                    with it and agree to its terms. Payout timing also depends on processing times. uSync may
                    delay, withhold, or offset payouts where reasonably necessary to cover refunds owed to
                    participants, chargebacks, suspected fraud, event cancellations, or violations of these Terms.
                </p>
            </>
        ),
    },
    {
        id: "disclaimers",
        number: 9,
        title: "Disclaimers of Warranties",
        content: (
            <>
                <LegalCaps>
                    YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES, AND ALL CONTENT, LISTINGS, TOOLS, AND
                    FEATURES AVAILABLE THROUGH THEM, ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT
                    WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY
                    LAW, USYNC DISCLAIMS ALL WARRANTIES, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
                    A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING
                    OR USAGE OF TRADE.
                </LegalCaps>
                <p>Without limiting the above, uSync does not warrant that:</p>
                <ul>
                    <li>the Services will be available continuously, on time, securely, or without interruption or downtime;</li>
                    <li>the Services will be error-free, or that defects will be corrected;</li>
                    <li>the Services or the servers that make them available are free of viruses or other harmful components;</li>
                    <li>
                        any event listing, prize information, schedule, result, ranking, or other content is accurate,
                        complete, reliable, or current;
                    </li>
                    <li>
                        any event will take place, or that any Host, user, or third-party platform will perform as
                        promised, including paying prizes or honoring refunds; or
                    </li>
                    <li>any data you store on or submit through the Services will be preserved without loss.</li>
                </ul>
                <p>
                    Articles, guides, and other editorial content (including hardware and settings recommendations) are
                    for general informational purposes only. Some jurisdictions do not allow the exclusion of certain
                    warranties, so some of the above exclusions may not apply to you.
                </p>
            </>
        ),
    },
    {
        id: "limitation-of-liability",
        number: 10,
        title: "Limitation of Liability",
        content: (
            <>
                <h3>10.1 Excluded Damages</h3>
                <LegalCaps>
                    TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL USYNC OR ITS MEMBERS, MANAGERS, OFFICERS,
                    EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR LICENSORS (THE “USYNC PARTIES”) BE LIABLE FOR ANY
                    INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF
                    PROFITS, REVENUE, PRIZE WINNINGS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, OR FOR TRAVEL, LODGING,
                    OR OTHER EXPENSES RELATED TO ANY EVENT, ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS,
                    WHETHER BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY,
                    EVEN IF A USYNC PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </LegalCaps>

                <h3>10.2 No Liability for Third Parties</h3>
                <LegalCaps>
                    TO THE FULLEST EXTENT PERMITTED BY LAW, THE USYNC PARTIES ARE NOT LIABLE FOR THE CONDUCT, ACTS, OR
                    OMISSIONS OF ANY HOST, USER, OR OTHER THIRD PARTY, INCLUDING ANY EVENT CANCELLATION, UNPAID PRIZE,
                    OR UNREFUNDED PASS, OR FOR ANY UNAUTHORIZED ACCESS TO OR USE OF YOUR ACCOUNT OR DATA.
                </LegalCaps>

                <h3>10.3 Liability Cap</h3>
                <LegalCaps>
                    TO THE FULLEST EXTENT PERMITTED BY LAW, THE TOTAL AGGREGATE LIABILITY OF THE USYNC PARTIES FOR ALL
                    CLAIMS ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE GREATER OF
                    (A) THE TOTAL FEES YOU PAID DIRECTLY TO USYNC (SUCH AS PLATFORM FEES AND SUBSCRIPTION FEES, BUT NOT
                    PASS PRICES PAID TO OR FOR THE BENEFIT OF HOSTS) DURING THE 12 MONTHS BEFORE THE EVENT GIVING RISE
                    TO THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (US $100).
                </LegalCaps>

                <h3>10.4 Basis of the Bargain; Exceptions</h3>
                <p>
                    These limitations reflect a reasonable allocation of risk and are an essential basis of the bargain
                    between you and uSync. They apply even if a limited remedy fails of its essential purpose. Nothing
                    in these Terms limits or excludes liability that cannot be limited or excluded under applicable
                    law, such as liability for fraud, gross negligence, or willful misconduct, or for death or personal
                    injury caused by negligence where such a limitation is prohibited. Some jurisdictions do not allow
                    the exclusion or limitation of certain damages, so some of these limitations may not apply to you.
                </p>
            </>
        ),
    },
    {
        id: "indemnification",
        number: 11,
        title: "Indemnification",
        content: (
            <>
                <p>
                    To the fullest extent permitted by law, you agree to defend, indemnify, and hold harmless the uSync
                    Parties from and against all claims, demands, actions, losses, liabilities, damages, judgments,
                    settlements, costs, and expenses (including reasonable attorneys’ fees) arising out of or relating
                    to:
                </p>
                <ul>
                    <li>your misuse of the Services or your use of them in violation of these Terms;</li>
                    <li>Your Content;</li>
                    <li>your violation of these Terms or of any applicable law or regulation;</li>
                    <li>
                        your infringement or violation of any third-party right, including intellectual property,
                        privacy, or publicity rights;
                    </li>
                    <li>
                        any event, bracket, or promotion you host, including claims by participants relating to prizes,
                        refunds, safety, or event administration; and
                    </li>
                    <li>any dispute between you and a Host or another user.</li>
                </ul>
                <p>
                    We may, at your expense, assume the exclusive defense and control of any matter for which you must
                    indemnify us, and you agree to cooperate with our defense. You may not settle any such matter
                    without our prior written consent. If you are a minor, your parent or legal guardian accepts these
                    obligations on your behalf.
                </p>
            </>
        ),
    },
    {
        id: "dispute-resolution",
        number: 12,
        title: "Governing Law and Dispute Resolution",
        content: (
            <>
                <h3>12.1 Governing Law</h3>
                <p>
                    These Terms, and any dispute arising out of or relating to them or the Services, are governed by the
                    laws of the State of Ohio, without regard to its conflict-of-law rules. The Federal Arbitration Act
                    (9 U.S.C. § 1 et seq.) governs the interpretation and enforcement of the arbitration agreement in
                    this Section 12.
                </p>

                <h3>12.2 Informal Dispute Resolution First</h3>
                <p>
                    Most concerns can be resolved quickly by contacting us. Before starting an arbitration or court
                    proceeding, you and uSync each agree to send the other a written Notice of Dispute and to try in
                    good faith to resolve it informally for at least 60 days. Notices to uSync must be emailed
                    to <LegalEmail subject="Notice of Dispute" /> with the subject line “Notice of Dispute” and must include
                    your name, your username (if any), the email address associated with your account, a description
                    of the dispute, and the relief you are requesting. We will send notices to you at the email address
                    associated with your account. Any applicable limitations period is paused while we try to resolve
                    the dispute informally under this section.
                </p>

                <h3>12.3 Agreement to Arbitrate</h3>
                <p>
                    If a dispute is not resolved informally, you and uSync agree that any dispute, claim, or controversy
                    arising out of or relating to these Terms or the Services (each, a “Claim”) will be resolved by
                    final and binding <strong>individual arbitration</strong> rather than in court, except as provided
                    in Section 12.4. Except as provided
                    in Sections 12.5 and 12.6, the arbitrator has exclusive authority to resolve any dispute about the
                    interpretation, applicability, enforceability, or formation of this arbitration agreement.
                </p>
                <ul>
                    <li>
                        Arbitration will be administered by the American Arbitration Association (“AAA”) under its
                        Consumer Arbitration Rules (or, for Claims involving a business user, its Commercial Arbitration
                        Rules), as modified by these Terms. The AAA’s rules are available at{" "}
                        <a href="https://www.adr.org" target="_blank" rel="noreferrer">www.adr.org</a>.
                    </li>
                    <li>
                        A single arbitrator will decide the Claim. The AAA’s rules determine whether a Claim is decided
                        on written submissions alone or after a hearing. Unless you and uSync agree otherwise, any
                        hearing will take place by video conference or, if the arbitrator decides an in-person hearing is
                        needed, in the county where you live.
                    </li>
                    <li>
                        Filing, administration, and arbitrator fees are governed by the AAA’s rules. If you show that the
                        costs of arbitration would be prohibitive compared to the costs of litigation, uSync will pay as
                        much of your filing and hearing fees as the arbitrator finds necessary to prevent arbitration
                        from being cost-prohibitive.
                    </li>
                    <li>
                        The arbitrator may award the same individual relief a court could award, but only in favor of
                        the individual party seeking relief and only to the extent necessary to resolve that party’s
                        individual Claim. The arbitrator’s decision is final and binding, and judgment on the award may
                        be entered in any court with jurisdiction.
                    </li>
                </ul>

                <h3>12.4 Exceptions to Arbitration</h3>
                <p>
                    Either you or uSync may (a) bring an individual Claim in small claims court if it qualifies and
                    remains there on an individual basis; and (b) seek injunctive or other equitable relief in court to
                    stop the actual or threatened infringement, misappropriation, or violation of intellectual property
                    rights, or unauthorized access to or abuse of the Services (such as hacking or scraping).
                </p>

                <h3>12.5 Class Action and Jury Trial Waiver</h3>
                <LegalCaps>
                    YOU AND USYNC AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL
                    CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR
                    REPRESENTATIVE PROCEEDING. YOU AND USYNC EACH WAIVE THE RIGHT TO A TRIAL BY JURY.
                </LegalCaps>
                <p>
                    Unless both you and uSync agree otherwise, the arbitrator may not consolidate more than one
                    person’s Claims and may not preside over any form of class or representative proceeding. If a
                    court decides that this Section 12.5 is unenforceable as to any Claim or request for relief, then
                    that Claim or request for relief (and only that one) will be severed and decided by a court under
                    Section 12.8 after any individual Claims have been arbitrated.
                </p>

                <h3>12.6 Mass Arbitration</h3>
                <p>
                    If 25 or more similar Claims are filed against uSync by the same or coordinated counsel, or are
                    otherwise coordinated, the AAA’s Mass Arbitration Supplementary Rules will apply and, to the extent
                    those rules permit, the Claims may be administered in batches, with each batch decided by a single
                    arbitrator, to promote efficient and fair resolution. A court may enforce this section and decide disputes about whether it applies.
                </p>

                <h3>12.7 30-Day Right to Opt Out</h3>
                <p>
                    You may opt out of this agreement to arbitrate by emailing <LegalEmail subject="Arbitration Opt-Out" /> with
                    the subject line “Arbitration Opt-Out” <strong>within 30 days after you first accept these
                    Terms</strong>. Your email must include your name, your username (if any), the email address
                    associated with your account, and a clear statement that you want to opt out of arbitration.
                    Opting out will not affect any other part of these Terms.
                </p>

                <h3>12.8 Courts and Venue</h3>
                <p>
                    Any Claim that is not subject to arbitration, including because you opted out or because an
                    exception above applies, must be brought exclusively in the state or federal courts located in the
                    State of Ohio. You and uSync consent to the personal jurisdiction and venue of those courts and
                    waive any objection based on inconvenient forum.
                </p>

                <h3>12.9 Time Limit to Bring Claims</h3>
                <p>
                    To the extent permitted by law, any Claim must be brought within one (1) year after it arises, or
                    it is permanently barred.
                </p>

                <h3>12.10 Changes to This Section</h3>
                <p>
                    If we make a material change to this Section 12 after you have accepted it, you may reject that
                    change by emailing <LegalEmail subject="Arbitration Change Rejection" /> within 30 days after the change
                    takes effect. In that case, the most recent version of this Section 12 that you accepted will
                    continue to govern disputes between you and uSync.
                </p>

                <h3>12.11 Severability of This Section</h3>
                <p>
                    Except as provided in Section 12.5, if any part of this Section 12 is found to be unenforceable,
                    that part will be severed and the rest of this Section 12 will continue to apply.
                </p>
            </>
        ),
    },
    {
        id: "termination",
        number: 13,
        title: "Termination",
        content: (
            <>
                <h3>13.1 Termination by You</h3>
                <p>
                    You may stop using the Services at any time and may close your account through account settings
                    (where available) or by emailing <LegalEmail subject="Close My Account" />. Closing your account does not
                    cancel amounts you already owe. Active subscriptions should be cancelled as described in Section
                    8.6.
                </p>

                <h3>13.2 Suspension or Termination by uSync</h3>
                <p>
                    We may suspend, restrict, or terminate your access to all or part of the Services, including your
                    account, listings, passes, brackets, Verified status, or payouts, at any time, with or without
                    notice, if:
                </p>
                <ul>
                    <li>you violate these Terms or any other policy that applies to you;</li>
                    <li>
                        we believe your conduct creates risk or possible legal exposure for uSync, other users, Hosts,
                        or third parties;
                    </li>
                    <li>we suspect fraud, abuse, or unauthorized use of your account or payment method;</li>
                    <li>we are required to do so by law or by a government or court order; or</li>
                    <li>
                        we discontinue the Services or the relevant feature, or your account has been inactive for an
                        extended period.
                    </li>
                </ul>
                <p>Where appropriate and permitted by law, we will try to notify you and explain why.</p>

                <h3>13.3 Effect of Termination</h3>
                <ul>
                    <li>Your license to use the Services ends immediately.</li>
                    <li>
                        We may delete or disable access to your account and Your Content, subject to our legal retention
                        obligations and Section 6.5.
                    </li>
                    <li>Any amounts you owe remain due.</li>
                    <li>
                        If we terminate a paid subscription because you violated these Terms, you will not receive a
                        refund. If we terminate it without cause or discontinue the Paid Service, we will refund the
                        unused, prepaid portion.
                    </li>
                    <li>You may not create a new account to get around a suspension or termination without our permission.</li>
                </ul>

                <h3>13.4 Appeals</h3>
                <p>
                    If you believe your account was suspended or terminated in error, you may request a review by
                    emailing <LegalEmail subject="Account Appeal" /> within 30 days.
                </p>

                <h3>13.5 Survival</h3>
                <p>
                    Any provision of these Terms that by its nature should survive termination will survive, including
                    Sections 6 (Intellectual Property Rights), 7.9 (Disputes With Hosts or Other Users), 8 (as to
                    amounts owed and refunds), 9 (Disclaimers of Warranties), 10 (Limitation of Liability),
                    11 (Indemnification), 12 (Governing Law and Dispute Resolution), 13 (Termination), and 14 (General
                    Provisions).
                </p>
            </>
        ),
    },
    {
        id: "general",
        number: 14,
        title: "General Provisions",
        content: (
            <>
                <ul>
                    <li>
                        <strong>Electronic communications.</strong> You consent to receive agreements, notices,
                        disclosures, and other communications from us electronically, including by email and through
                        the Services, and agree that they satisfy any legal requirement that such communications be in
                        writing. Your electronic acceptance of these Terms has the same effect as a handwritten
                        signature.
                    </li>
                    <li>
                        <strong>Notices to you.</strong> We may send notices to the email address associated with your
                        account or post them on the Services. Please keep your email address current.
                    </li>
                    <li>
                        <strong>Entire agreement.</strong> These Terms, together with the policies and additional terms
                        referenced in them, are the entire agreement between you and uSync about the Services and
                        supersede any prior agreements on that subject.
                    </li>
                    <li>
                        <strong>Severability.</strong> If any provision is found unenforceable, it will be enforced to
                        the maximum extent permissible, and the rest of these Terms will remain in effect.
                    </li>
                    <li>
                        <strong>No waiver.</strong> Our failure to enforce any provision is not a waiver of our right to
                        do so later.
                    </li>
                    <li>
                        <strong>Assignment.</strong> You may not assign or transfer these Terms without our prior
                        written consent. We may assign these Terms without restriction, including in connection with a
                        merger, acquisition, or sale of assets.
                    </li>
                    <li>
                        <strong>Force majeure.</strong> We are not liable for delays or failures caused by events beyond
                        our reasonable control, including outages of third-party providers, internet or power failures,
                        natural disasters, pandemics, labor disputes, or government action.
                    </li>
                    <li>
                        <strong>Relationship of the parties.</strong> Nothing in these Terms creates a partnership,
                        joint venture, employment, or agency relationship between you and uSync. Hosts are not agents or
                        employees of uSync.
                    </li>
                    <li>
                        <strong>No third-party beneficiaries.</strong> Except for the uSync Parties under Sections 10
                        and 11, these Terms do not give any rights to third parties.
                    </li>
                    <li>
                        <strong>Interpretation.</strong> Headings are for convenience only. “Including” means “including
                        without limitation.” If these Terms are translated, the English version controls.
                    </li>
                    <li>
                        <strong>California users.</strong> Under California Civil Code § 1789.3, California users are
                        entitled to the following consumer rights notice: the Complaint Assistance Unit of the Division
                        of Consumer Services of the California Department of Consumer Affairs may be contacted in
                        writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at
                        (800) 952-5210.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "contact",
        number: 15,
        title: "Contact Information",
        content: (
            <>
                <p>If you have questions about these Terms or need to send us a legal notice, please contact us:</p>
                <LegalContactCard>
                    <p><strong>uSync LLC</strong></p>
                    <p>Email: <LegalEmail subject="Legal Notice" /></p>
                    <p>Website: <Link to="/more/contactus">www.usync.gg</Link></p>
                </LegalContactCard>
                <p>
                    To help us route your message, please use one of these subject lines where it applies: “Legal
                    Notice,” “Notice of Dispute,” “Arbitration Opt-Out,” “DMCA Notice,” “Cancel Subscription,” or
                    “Account Appeal.” Legal notices are effective when received.
                </p>
            </>
        ),
    },
];

export const TermsOfService = () => (
    <LegalDocument
        title="Terms of Service"
        seoDescription="The Terms of Service for uSync, the esports hub for LANs, leagues, tournaments, event passes, and bracket hosting. Read the rules for using usync.gg."
        canonicalPath="/more/terms-of-service"
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        intro={
            <>
                <p>
                    These Terms of Service (the “Terms”) are a legally binding agreement between you and uSync LLC
                    (“uSync,” “we,” “us,” or “our”). They govern your access to and use of the website
                    at <Link to="/">www.usync.gg</Link>, its subdomains, and any related features, tools, content,
                    checkout flows, and services we offer (together, the “Services”).
                </p>

                <LegalNotice>
                    <p>
                        <strong>Please read these Terms carefully.</strong>{" "}
                        <SectionRef to="dispute-resolution">Section 12</SectionRef> contains a <strong>binding arbitration
                        agreement and a class action and jury trial waiver</strong> that affect how disputes between you
                        and uSync are resolved. Unless you opt out within 30 days as described in Section 12.7, you and
                        uSync agree to resolve most disputes through individual arbitration rather than in court.
                    </p>
                </LegalNotice>
            </>
        }
    />
);
