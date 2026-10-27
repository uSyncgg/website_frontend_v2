import { LegalDocument, LegalEmail, SectionRef, LegalNotice, LegalContactCard, LegalTable } from "components";
import { Link } from "react-router";

// Update this date whenever the policy changes (see Section 13).
const LAST_UPDATED = "October 8, 2026";

const ExternalLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

// CCPA "notice at collection" disclosure: category, examples, business-purpose recipients, sold/shared to.
const CCPA_CATEGORIES = [
    [
        "Identifiers",
        "Name, username, email address, phone number, IP address, account ID, and online and device identifiers",
        "Service providers; Hosts (at your direction); sign-in providers",
        "Not sold or shared",
    ],
    [
        "Customer records (Cal. Civ. Code § 1798.80(e))",
        "Name, email address, phone number, and venue addresses",
        "Service providers; our payment processor; Hosts (at your direction)",
        "Not sold or shared",
    ],
    [
        "Protected classification characteristics",
        "Gender and date of birth (age)",
        "Service providers",
        "Not sold or shared",
    ],
    [
        "Commercial information",
        "Passes and services purchased, subscriptions, and transaction history",
        "Service providers; our payment processor; Hosts (at your direction)",
        "Not sold or shared",
    ],
    [
        "Internet or other electronic network activity",
        "Pages viewed, links and buttons clicked, referring websites, and device and browser information",
        "Service providers, including our analytics provider",
        "Not sold or shared",
    ],
    [
        "Geolocation data",
        "Approximate location (city, region, or country) derived from your IP address, and the country you provide",
        "Service providers",
        "Not sold or shared",
    ],
    [
        "Audio, electronic, visual, or similar information",
        "Profile pictures and other images you upload",
        "Service providers; the public, through your profile",
        "Not sold or shared",
    ],
    [
        "Professional information",
        "Host organization name, role, regions served, and event types",
        "Service providers; the public, through your profile",
        "Not sold or shared",
    ],
    [
        "Inferences",
        "Your interests in particular games, events, and types of competition",
        "Service providers",
        "Not sold or shared",
    ],
    [
        "Sensitive personal information",
        "Account login credentials (email address and password)",
        "Our authentication service provider",
        "Not sold or shared",
    ],
];

// Section 7 retention schedule: category, retention period.
const RETENTION_PERIODS = [
    [
        "Account and profile information",
        "For as long as your account remains open, without a fixed end date, so your profile, history, and settings are available whenever you return. If you close your account, we delete or de-identify this information within 30 days, and copies in our backup systems are overwritten on a rolling basis within 90 days after deletion. Brackets, standings, and results that other participants rely on remain part of the event’s record, but your entries in them are de-identified, for example by replacing your username with a generic label.",
    ],
    [
        "Transaction and payment records",
        "Seven years after the transaction, to meet tax, accounting, and financial reporting requirements. These records are limited to what those requirements need, such as the item purchased, the pass price, platform fee, and total, the date, the payment reference, refunds and Host payouts, and the contact email used for the purchase.",
    ],
    [
        "Other event registration details",
        "Three years after the event takes place, so we can handle refunds, chargebacks, disputes, and questions from participants and Hosts, and then deleted or de-identified. This includes gamertags, team and teammate details, social media handles, and answers to a Host’s questions. Hosts keep their own copies under their own retention practices.",
    ],
    [
        "Emails and support requests",
        "Three years after we resolve them.",
    ],
    [
        "Analytics information",
        "User-level and event-level data in Google Analytics is kept for up to 14 months and then deleted automatically. Aggregated reports that do not identify you may be kept longer.",
    ],
    [
        "De-identified and aggregated information",
        "May be kept indefinitely, because it can no longer reasonably identify you. Examples include historical statistics about events and participation.",
    ],
];

const SECTIONS = [
    {
        id: "who-we-are",
        number: 1,
        title: "Who We Are",
        content: (
            <>
                <h3>1.1 uSync and Our Privacy Officer</h3>
                <p>
                    uSync LLC is a company based in the State of Ohio, United States, that operates an esports
                    discovery, promotion, and competition platform. For the purposes of the EU and UK General Data
                    Protection Regulation (the “GDPR”) and similar laws, uSync is the “controller” of the personal
                    information described in this policy, which means we decide how and why it is processed. Under
                    Canada’s Personal Information Protection and Electronic Documents Act (“PIPEDA”), uSync is
                    accountable for the personal information under its control and has designated a Privacy Officer
                    who is responsible for our compliance with this policy. You can reach our Privacy Officer
                    at <LegalEmail subject="Privacy Request" />.
                </p>

                <h3>1.2 What This Policy Covers</h3>
                <p>
                    This policy applies to personal information we collect through the Services and through our
                    related communications, including email and social media. It does not apply to
                    information collected by third parties, even if their events, platforms, or websites are listed on
                    or linked from uSync. In particular, when you register for an event, the Host running that event
                    receives your registration information and handles it under its own privacy practices, as
                    described in <SectionRef to="how-we-share">Section 4</SectionRef>. Wager platforms, head-to-head
                    platforms, game publishers, and social networks that you reach through uSync also have their own
                    privacy policies, which we encourage you to read.
                </p>
            </>
        ),
    },
    {
        id: "information-we-collect",
        number: 2,
        title: "Information We Collect",
        content: (
            <>
                <h3>2.1 Information You Provide to Us</h3>
                <p>
                    When you create an account, we collect your email address and a password or, if you choose to
                    sign in with Google, Discord, or X, the basic profile information that provider shares with us,
                    such as your name, email address, and profile picture. We never receive the password for your
                    Google, Discord, or X account. As you set up your profile, we collect your username, the role or
                    roles that describe you (such as player, Host, or another role you specify), the games you play,
                    and, if you choose to add them, a profile picture and a short bio.
                </p>
                <p>
                    Players provide their first and last name and may also provide their phone number, gender, date of
                    birth, and country, along with their usernames on gaming and social platforms such as Twitch, X,
                    YouTube, Kick, Discord, Instagram, Battle.net, Activision, Steam, and Riot. You type these usernames
                    in yourself; we do not access those accounts or receive your login credentials for them. Hosts
                    provide information about their organization, including its name, country, the games and types of
                    events it runs, its social media accounts, and the names and addresses of its venues.
                </p>
                <p>
                    When you register for or purchase a pass to an event, we collect the details the registration form
                    asks for. This typically includes a contact email address, your gamertag, your team name and
                    captain, the gamertags and social media handles of your teammates, an optional organization social
                    media handle, and your answers to any additional questions the Host adds to its registration form.
                    If you provide information about teammates or other people, you are responsible for making sure
                    you have their permission to do so.
                </p>
                <p>
                    When you make a purchase, you enter your payment details directly into a secure form provided by
                    our payment processor, Stripe, using a card or another method Stripe offers, such as Link or Cash
                    App Pay, and those details go straight to Stripe without passing through or being stored on
                    uSync’s servers. We keep a record of the transaction, such as the pass or service purchased, the
                    pass price, the platform fee, the total, the payment status, the date, and the Stripe payment
                    reference, and we share your contact email with Stripe to identify the payment. For subscriptions purchased through a Stripe-hosted checkout page, Stripe also collects
                    your name, email address, and billing details and shares them with us so we can manage your
                    subscription.
                </p>
                <p>
                    When you email us, submit an event through our event submission form, or report a problem, we
                    collect the information you include, such as your name, email address, organization, event
                    details, and the content of your message. Our event submission and problem-report forms are
                    provided through Google Forms, so the information you enter in them is also processed by Google.
                    If you enter a contest, sweepstakes, or giveaway, we collect the information requested in its
                    official rules, such as your name, email address, and, if you win, the details needed to deliver
                    your prize.
                </p>
                <p>
                    Some of this information is required. You must provide an email address and a password (or use a
                    sign-in provider) and choose a username to create an account; players must provide their name; and
                    you must complete the required fields of a registration or checkout form to register for an event
                    or make a purchase. If you do not provide required information, we cannot provide that part of the
                    Services. Forms mark which fields are required; other information, such as your phone number,
                    gender, profile picture, and bio, is optional.
                </p>

                <h3>2.2 Information We Collect Automatically</h3>
                <p>
                    When you use the Services, we and our service providers automatically collect certain technical
                    information. This includes your IP address, browser type and version, device type, operating
                    system, the website that referred you, the pages you view, the links and buttons you click (such
                    as “Join Now” buttons and event cards, including the destination you click through to), the date
                    and time of your visit, and general information about your location, such as your city, region, or
                    country, which is derived from your IP address. We do not collect the precise GPS location of your
                    device. Our hosting providers also keep server logs that record IP addresses and the requests made
                    to our website and application servers, and our authentication provider logs sign-in activity,
                    such as the time and IP address of each sign-in, which help us operate and secure the Services.
                </p>
                <p>
                    We collect much of this information using cookies, browser storage, and similar technologies,
                    including Google Analytics.{" "}
                    <SectionRef to="cookies">Section 5</SectionRef> explains these technologies and how you can
                    control them.
                </p>

                <h3>2.3 Information We Receive From Other Sources</h3>
                <p>
                    We receive information about you from third parties in several situations. Sign-in providers
                    (Google, Discord, and X) share basic profile information when you use them to log in. Stripe shares
                    payment and transaction status information. Hosts may share information about your participation
                    in their events, such as check-in status, results, and placements. We also collect publicly
                    available information about esports events and organizers, such as event names, dates, locations,
                    and organizer contact details published on their websites and social media, to build our event
                    listings.
                </p>

                <h3>2.4 Sensitive Information</h3>
                <p>
                    We do not ask for sensitive personal information such as government identification numbers,
                    health information, biometric data, or information about your racial or ethnic origin, religious
                    beliefs, or sexual orientation, and we ask that you not include it in your profile or messages.
                    Some privacy laws treat your account login credentials as sensitive information; we use them only
                    to authenticate you and secure your account. Your gender and date of birth are not displayed on
                    your public profile unless you choose to show them. We use your date of birth to confirm that you
                    meet age requirements and to apply the protections for minors described
                    in <SectionRef to="minors">Section 11</SectionRef>. If you provide your gender or country, we use
                    them only to understand the makeup of our community in aggregate and to improve and personalize the
                    Services.
                </p>
            </>
        ),
    },
    {
        id: "how-we-use",
        number: 3,
        title: "How We Use Your Information",
        content: (
            <>
                <p>
                    We use personal information for the purposes described below. For people in the European Economic
                    Area, the United Kingdom, and Switzerland, we also identify the legal basis we rely on for each
                    purpose, as the GDPR requires.
                </p>

                <h3>3.1 To Provide and Operate the Services</h3>
                <p>
                    We use your information to create and manage your account, display your public profile, show you
                    relevant events, process event registrations and send them to the Host, run brackets and record
                    results, provide uSync Verified and promotional services to Hosts, and respond to your questions
                    and requests. This processing is necessary to perform our contract with you, which is set out in
                    our <Link to="/more/terms-of-service">Terms of Service</Link>.
                </p>

                <h3>3.2 To Process Payments and Keep Records</h3>
                <p>
                    We use transaction information to process payments, issue receipts, calculate platform fees,
                    handle refunds and chargebacks, pay out Hosts, and maintain the financial records that tax and
                    accounting laws require. We rely on contractual necessity and, for record-keeping, on our legal
                    obligations.
                </p>

                <h3>3.3 To Communicate With You</h3>
                <p>
                    We send service communications, such as account confirmations, password resets, receipts,
                    registration confirmations, changes to events you have registered for, and updates to our Terms of
                    Service or this policy. These messages are necessary to provide the Services, and you cannot opt
                    out of them while you have an account. We do not send marketing emails, newsletters, or text
                    messages. If we start, we will update this policy first and give you a way to opt out.
                </p>

                <h3>3.4 To Promote uSync</h3>
                <p>
                    We promote uSync and the events listed on it on our website and our own social media accounts. We
                    do not use your personal information for targeted advertising, and we do not run ads that track
                    you across other websites or apps.
                </p>

                <h3>3.5 To Keep uSync Safe and Fair</h3>
                <p>
                    We use information to verify Hosts who apply for uSync Verified; to screen usernames and profile
                    pictures for prohibited content using automated moderation tools, which can block a submission
                    that appears to violate our rules (you can contact us if you believe a submission was blocked in
                    error); to detect and prevent fraud, payment abuse, cheating, and spam; to enforce our Terms of
                    Service; to protect the security of
                    accounts and systems; to investigate reports of misconduct; and to protect the safety of our users,
                    especially minors. This includes reporting apparent child sexual exploitation to the National
                    Center for Missing &amp; Exploited Children (“NCMEC”) as required by law. We rely on our
                    legitimate interest in keeping the platform safe and, where applicable, on our legal obligations.
                </p>

                <h3>3.6 To Analyze and Improve the Services</h3>
                <p>
                    We use analytics information to understand how people find and use uSync, which events and
                    features are popular, and where the site can be improved, and to develop new features. Where
                    possible, we use aggregated or de-identified information for these purposes. We rely on our
                    legitimate interest in improving the Services and, where the law requires consent for the cookies
                    involved, on your consent.
                </p>

                <h3>3.7 To Comply With the Law</h3>
                <p>
                    We use information as necessary to comply with applicable laws, regulations, legal processes, and
                    lawful requests from public authorities, and to establish, exercise, or defend legal claims.
                </p>

                <h3>3.8 De-identified Information and Automated Decisions</h3>
                <p>
                    We may create de-identified or aggregated information, such as statistics about event attendance
                    or game popularity, that can no longer reasonably be linked to you. We maintain and use this
                    information only in de-identified form, we do not attempt to re-identify it except as permitted by
                    law, and we may use it for any lawful purpose. We do not make decisions that produce legal or
                    similarly significant effects about you based solely on automated processing, including profiling.
                </p>
            </>
        ),
    },
    {
        id: "how-we-share",
        number: 4,
        title: "How We Share Your Information",
        content: (
            <>
                <p>
                    We share personal information only in the ways described in this section.
                </p>

                <h3>4.1 Public Profiles and Competition Information</h3>
                <p>
                    Your public profile can be viewed by anyone, including people who are not signed in. By default,
                    it shows your username and name, along with any profile picture, bio, games, and roles you add,
                    and, for Hosts, organization details and the names and addresses of the venues you list. Venue
                    addresses are public, so please do not list a private home address as a venue unless you are
                    comfortable with it being visible to anyone. Your username, team name, and results also appear
                    publicly in the brackets, standings, and event listings you take part in. Your email address,
                    phone number, date of birth, and gender are not shown on your public profile unless you choose to
                    display them. Please think carefully before making information public, because others may copy or
                    share it.
                </p>

                <h3>4.2 Hosts and Event Organizers</h3>
                <p>
                    When you register for or purchase a pass to an event, we share your registration details, such as
                    your contact email, gamertag, team information, teammates’ details, and answers to the Host’s
                    questions, with the Host running that event so it can administer the event, contact you, and check
                    your eligibility. Hosts are independent controllers of this information, and their use of it is
                    governed by their own privacy policies and practices, not by this policy. We require Hosts to use
                    participant information lawfully and only to run their events, but we are not responsible for how
                    they handle it.
                </p>

                <h3>4.3 Service Providers</h3>
                <p>
                    We use trusted service providers to operate the Services on our behalf. These providers may use
                    personal information only as needed to perform services for us and are contractually required to
                    protect it. Our current providers include Supabase, which hosts our database, user
                    authentication, and file storage (including profile pictures); Render, which hosts our
                    application servers; Netlify, which hosts and delivers our website; Stripe, which processes
                    payments; Resend, which delivers our emails, such as receipts and registration confirmations;
                    OpenAI, which provides the automated moderation that screens usernames and profile pictures for
                    prohibited content; Google, which provides analytics (Google Analytics), our event submission and
                    problem-report forms (Google Forms), and sign-in; and Discord and X, which provide sign-in. Some of these companies also process your information as
                    independent controllers under their own privacy policies: for example, sign-in providers handle
                    your account with them, and Stripe uses payment information for its own fraud prevention and
                    legal compliance and to operate Link if you choose to use it. Content that loads from other
                    companies when you view our pages is described in Section 5.4. This list may change as our
                    Services evolve.
                </p>

                <h3>4.4 No Sale or Sharing of Personal Information</h3>
                <p>
                    We do not sell personal information, and we do not share it for cross-context behavioral
                    advertising (also called targeted advertising). We have not done either in the past 12 months. We
                    do not work with advertising networks, and we do not let advertising partners collect information
                    through cookies or similar technologies on our site. If this changes, we will update this policy
                    and give you a way to opt out before it takes effect.
                </p>

                <h3>4.5 Legal Requirements, Safety, and Rights</h3>
                <p>
                    We may disclose information if we believe in good faith that doing so is necessary to comply with
                    a law, regulation, court order, subpoena, or other legal process; to respond to lawful requests
                    from public authorities, including to meet national security or law enforcement requirements; to
                    enforce our Terms of Service; to detect, prevent, or address fraud, security, or technical issues;
                    to report suspected child exploitation to NCMEC and law enforcement; or to protect the rights,
                    property, or safety of uSync, our users, or the public.
                </p>

                <h3>4.6 Business Transfers and Consent</h3>
                <p>
                    If uSync is involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of
                    all or part of its assets, personal information may be transferred as part of that transaction,
                    subject to standard confidentiality protections, and we will notify you before your information
                    becomes subject to a materially different privacy policy. We may also share information for other
                    purposes with your consent or at your direction.
                </p>
            </>
        ),
    },
    {
        id: "cookies",
        number: 5,
        title: "Cookies & Tracking Technologies",
        content: (
            <>
                <p>
                    Cookies are small text files that websites place on your device, and browser storage (such as
                    local storage and session storage) works in a similar way. We and our service providers use these
                    technologies for the purposes described below.
                </p>

                <h3>5.1 Essential Technologies</h3>
                <p>
                    Some technologies are necessary for the Services to work. For example, when you sign in, our
                    authentication provider stores a secure session token in your browser’s local storage so you stay
                    signed in, and during checkout we temporarily keep the information you have entered in your
                    browser’s session storage so it is not lost as you move between steps. Session storage is cleared
                    when you close the browser tab. Because these technologies are required to provide the Services you
                    request, they cannot be switched off through the Services, although you can block or clear them in
                    your browser settings, which may cause parts of the site to stop working.
                </p>

                <h3>5.2 Analytics</h3>
                <p>
                    We use Google Analytics to understand how visitors use uSync. Google Analytics uses cookies (such
                    as cookies whose names begin with “_ga”) to distinguish visitors, and it collects information such
                    as the pages you view, the links you click, your device and browser type, and your approximate
                    location. Google Analytics does not log or store IP addresses. You can learn how Google uses this
                    information at{" "}
                    <ExternalLink href="https://policies.google.com/technologies/partner-sites">
                        policies.google.com/technologies/partner-sites
                    </ExternalLink>, and you can prevent Google Analytics from collecting your information by installing
                    the Google Analytics Opt-out Browser Add-on, available at{" "}
                    <ExternalLink href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</ExternalLink>.
                </p>

                <h3>5.3 Advertising Technologies</h3>
                <p>
                    We do not use advertising cookies, pixels, or similar technologies on uSync, and we do not allow
                    advertising partners to place them on our site.
                </p>

                <h3>5.4 Third-Party Content</h3>
                <p>
                    Some pages display content from other companies, which may collect information about your visit,
                    including your IP address, under their own privacy policies. Our event map loads map images from
                    CARTO using OpenStreetMap data, some images are loaded from Imgur, some pages embed posts from X
                    (formerly Twitter), and our event submission and problem-report pages embed forms from Google. X
                    may set its own cookies when its embedded posts load.
                </p>

                <h3>5.5 Your Choices, Global Privacy Control, and Do Not Track</h3>
                <p>
                    Most browsers let you block or delete cookies and clear site storage through their settings. If you
                    block all cookies, some features of the Services may not work properly. Because we do not sell or
                    share personal information, there is nothing for a Global Privacy Control (“GPC”) signal to opt
                    you out of; if that changes, we will treat a GPC signal as a valid opt-out request for that
                    browser. Because there is no common industry standard for “Do Not Track” signals, we do not
                    respond to them.
                </p>
            </>
        ),
    },
    {
        id: "security",
        number: 6,
        title: "Data Security & Encryption",
        content: (
            <>
                <p>
                    We use administrative, technical, and physical safeguards designed to protect personal information
                    against loss, theft, and unauthorized access, use, disclosure, alteration, and destruction. This
                    section explains the main measures we use and how they protect you.
                </p>

                <h3>6.1 Encryption in Transit</h3>
                <p>
                    Information traveling between your device and the uSync website, our application servers, and our
                    authentication, database, and file storage services is encrypted using HTTPS with Transport Layer
                    Security (“TLS”). This means that information you send to us, such as your password, profile
                    details, and registration information, cannot be read by others on the network while it is in
                    transit. Our application servers also connect to our database over encrypted connections.
                </p>

                <h3>6.2 Encryption at Rest</h3>
                <p>
                    Our database and file storage are hosted on infrastructure that encrypts stored data at rest using
                    AES-256, an industry-standard encryption algorithm. This protects the information stored on disk,
                    including backups, if the underlying storage were ever accessed without authorization.
                </p>

                <h3>6.3 Passwords and Account Access</h3>
                <p>
                    Passwords are never stored in plain text. Our authentication provider stores only a one-way
                    cryptographic hash of your password created with bcrypt, a password-hashing algorithm designed to
                    resist cracking attempts, so neither uSync staff nor anyone else can see your password. When you
                    sign in, you receive a short-lived, digitally signed access token that our servers check before
                    allowing access to account features. If you sign in with Google, Discord, or X, your password for
                    that service is handled entirely by that provider and is never shared with us.
                </p>

                <h3>6.4 Payment Security</h3>
                <p>
                    Payment card information is collected through a secure form provided by Stripe, which is certified
                    to PCI DSS Level 1, the highest level of certification in the payment card industry. Card numbers
                    go directly from your browser to Stripe and never pass through or are stored on uSync’s servers.
                </p>

                <h3>6.5 Access Controls and Provider Security</h3>
                <p>
                    We limit access to personal information to team members and service providers who need it to
                    operate, support, or secure the Services, and we require them to keep it confidential. Access to
                    our production systems is restricted to authorized accounts. Our hosting and infrastructure
                    providers maintain their own physical, network, and operational security controls and undergo
                    independent security audits, such as SOC 2 examinations.
                </p>

                <h3>6.6 Security Incidents and Your Role</h3>
                <p>
                    Although we work hard to protect your information, no method of transmission over the internet or
                    of electronic storage is completely secure, and we cannot guarantee absolute security. If we become
                    aware of a security breach that affects your personal information, we will notify you and the
                    relevant authorities when and as required by applicable law. You can help protect your account by
                    using a strong, unique password, keeping your login details private, signing out of shared
                    devices, and contacting us immediately at <LegalEmail subject="Account Security" /> if you suspect
                    unauthorized access.
                </p>
            </>
        ),
    },
    {
        id: "retention",
        number: 7,
        title: "Data Retention",
        content: (
            <>
                <p>
                    We keep personal information only for as long as we need it for the purposes described in this
                    policy, including to provide the Services, comply with our legal obligations, resolve disputes, and
                    enforce our agreements. How long we keep a particular piece of information depends on what it is
                    and why we have it. When we no longer need personal information, we delete it or de-identify it so
                    that it can no longer be associated with you. The table below sets out our standard retention
                    periods.
                </p>
                <LegalTable twoColumn columns={["Information", "How long we keep it"]} rows={RETENTION_PERIODS} />
                <p>
                    We may keep specific information longer than described above when we are legally required to do
                    so; when it is reasonably necessary to resolve a dispute, enforce our Terms of Service, or complete
                    an investigation; or when it is needed to prevent fraud or abuse, stop a banned user from returning,
                    or fulfill a child-safety reporting obligation. In those cases, we keep only the information needed
                    for that purpose and only for as long as the purpose lasts.
                </p>
            </>
        ),
    },
    {
        id: "your-rights",
        number: 8,
        title: "Your Privacy Rights",
        content: (
            <>
                <p>
                    Depending on where you live, you may have some or all of the rights described below. We extend the
                    core rights of access, correction, deletion, and portability to all users, wherever they live, and
                    we honor requests to the extent required or permitted by law.{" "}
                    <SectionRef to="regional">Section 9</SectionRef> describes additional rights and details for
                    specific regions.
                </p>

                <h3>8.1 Your Rights</h3>
                <p>
                    You have the right to access the personal information we hold about you and to receive a copy of
                    it. You have the right to correct information that is inaccurate or incomplete, and you can update
                    much of your profile yourself in your account settings. You have the right to ask us to delete your
                    personal information, subject to the exceptions described
                    in <SectionRef to="retention">Section 7</SectionRef>, such as records we must keep by law. You have
                    the right to data portability, which means receiving the information you provided to us in a
                    structured, commonly used, machine-readable format (such as JSON or CSV) and, where technically
                    feasible, having it sent to another company. Where we rely on your consent, you may withdraw it at
                    any time, which will not affect processing that took place before you withdrew it. Finally, you
                    have the right not to be discriminated against for exercising your privacy rights: we will not deny
                    you the Services, charge you a different price, or provide a different level of quality because you
                    exercised them.
                </p>

                <h3>8.2 Marketing Communications</h3>
                <p>
                    We do not send marketing emails, newsletters, or text messages. We send only the service messages
                    described in <SectionRef to="how-we-use">Section 3.3</SectionRef>, about your account, purchases,
                    and registrations.
                </p>

                <h3>8.3 Sale and Sharing of Your Information</h3>
                <p>
                    As described in <SectionRef to="how-we-share">Section 4.4</SectionRef>, we do not sell your
                    personal information, share it for targeted advertising, or use it for profiling that produces
                    legal or similarly significant effects, so there is nothing for you to opt out of. If our
                    practices change, we will update this policy and give you a way to opt out before any sale or
                    sharing begins.
                </p>

                <h3>8.4 How to Submit a Privacy Request</h3>
                <p>
                    To exercise your rights, email us at <LegalEmail subject="Privacy Request" /> with the subject line
                    “Privacy Request,” describe the right you want to exercise, and include the email address
                    associated with your account. To protect your information, we must verify your identity before we
                    fulfill a request to access, correct, delete, or port your data. We usually do this by confirming
                    the request through the email address on your account, and we may ask for additional information if
                    needed. We use information provided for verification only to verify your identity. You may also
                    designate an authorized agent to make a request on your behalf; we will require proof that the agent
                    has your written permission and may ask you to verify your identity directly with us. Parents and
                    legal guardians may make requests on behalf of their minor children.
                </p>
                <p>
                    We will confirm that we received your request within 10 business days, and we will respond within
                    the time required by applicable law, which is generally 30 days under
                    PIPEDA, one month under the GDPR, and 45 days under U.S. state privacy laws. If we need more time,
                    we will tell you why and how much longer we need, as the law allows. We do not charge a fee to
                    process requests unless they are manifestly unfounded, excessive, or repetitive, in which case we
                    may charge a reasonable fee or decline the request and explain why.
                </p>

                <h3>8.5 Appeals and Complaints</h3>
                <p>
                    If we decline to take action on your request, we will explain why. If you live in a U.S. state that
                    provides a right to appeal, you may appeal our decision by emailing{" "}
                    <LegalEmail subject="Privacy Appeal" /> with the subject line “Privacy Appeal” within 60 days of
                    our response. We will respond to your appeal within the time required by law, and if we deny it,
                    you may contact your state attorney general. You may also have the right to lodge a complaint with
                    a data protection authority, as described in Section 9.
                </p>
            </>
        ),
    },
    {
        id: "regional",
        number: 9,
        title: "Regional Privacy Rights",
        content: (
            <>
                <h3>9.1 European Economic Area, United Kingdom, and Switzerland</h3>
                <p>
                    If you are located in the European Economic Area (“EEA”), the United Kingdom, or Switzerland, the
                    GDPR, the UK GDPR, or the Swiss Federal Act on Data Protection applies to our processing of your
                    personal information. <SectionRef to="how-we-use">Section 3</SectionRef> explains the legal bases
                    we rely on: performance of our contract with you, our legitimate interests (which we balance
                    against your rights and interests), your consent, and compliance with our legal obligations. Where
                    we rely on legitimate interests, you can ask us for more information about how we balanced those
                    interests.
                </p>
                <p>
                    In addition to the rights in Section 8, you have the right to restrict our processing of your
                    information in certain circumstances, such as while we check a correction you requested, and the
                    right to object to processing based on our legitimate interests. You have an absolute right to
                    object to the use of your information for direct marketing, including any profiling related to
                    direct marketing. You can exercise these rights as described in Section 8.4. If you believe we have
                    not handled your information lawfully, you have the right to lodge a complaint with the data
                    protection authority in the country where you live or work or where the issue occurred; in the
                    United Kingdom this is the Information Commissioner’s Office, and in Switzerland it is the Federal
                    Data Protection and Information Commissioner. We would appreciate the chance to address your
                    concerns first, so please consider contacting us before you file a complaint.
                </p>

                <h3>9.2 California</h3>
                <p>
                    If you are a California resident, the California Consumer Privacy Act, as amended by the California
                    Privacy Rights Act (together, the “CCPA”), gives you the right to know what personal information we
                    collect, use, disclose, sell, and share; to access and receive a copy of your personal information;
                    to correct inaccurate personal information; to delete your personal information; to opt out of the
                    sale or sharing of your personal information; to limit the use of sensitive personal information in
                    certain cases; and not to be discriminated against for exercising these rights. We do not use or
                    disclose sensitive personal information for purposes that would give you a right to limit its use
                    under the CCPA. We do not sell or share personal information, including that of consumers under
                    16, as described in Section 4.4.
                </p>
                <p>
                    The table below describes the categories of personal information we have collected in the past 12
                    months and the categories of recipients to whom we disclose them. We collect this information from
                    the sources described in <SectionRef to="information-we-collect">Section 2</SectionRef> and use it
                    for the business and commercial purposes described in Section 3. Retention periods for each
                    category are described in Section 7.
                </p>
                <LegalTable
                    columns={["Category", "Examples", "Disclosed for a business purpose to", "Sold or shared with"]}
                    rows={CCPA_CATEGORIES}
                />
                <p>
                    To exercise your rights, follow the steps in Section 8.4. California’s “Shine the Light” law (Civil
                    Code § 1798.83) allows California residents to request information about the personal information
                    a business disclosed to third parties for their direct marketing purposes in the preceding
                    calendar year. We do not make those disclosures. If you have questions, email{" "}
                    <LegalEmail subject="Shine the Light Request" /> with the subject line “Shine the Light Request.”
                </p>

                <h3>9.3 Other U.S. States</h3>
                <p>
                    Residents of other U.S. states with comprehensive privacy laws, such as Colorado, Connecticut,
                    Texas, Virginia, and a growing number of others, may have the right to confirm whether we process
                    their personal information; to access, correct, and delete it; to obtain a portable copy of it; and
                    to opt out of targeted advertising, the sale of personal information, and profiling used to make
                    decisions that produce legal or similarly significant effects. As described in Section 8.3, we do
                    not engage in targeted advertising, sell personal information, or use profiling of that kind. In
                    some states, such as Oregon and
                    Minnesota, you may also request a list of the specific third parties to which we have disclosed
                    your personal information. You can exercise these rights as
                    described in Section 8, including appealing our decision under Section 8.5. We do not sell covered
                    information as defined by Nevada law.
                </p>

                <h3>9.4 Canada</h3>
                <p>
                    If you are located in Canada, we handle your personal information in accordance with PIPEDA and
                    applicable provincial privacy laws, including Quebec’s Act respecting the protection of personal
                    information in the private sector. We collect, use, and disclose your personal information with
                    your consent, which may be express or implied depending on the sensitivity of the information and
                    your reasonable expectations, except where the law permits otherwise. You may withdraw your consent
                    at any time, subject to legal or contractual restrictions and reasonable notice, although doing so
                    may mean we can no longer provide certain Services to you. You have the right to access the
                    personal information we hold about you and to challenge its accuracy and completeness and have it
                    amended as appropriate. Our Privacy Officer is responsible for our compliance with this policy and
                    can be reached at <LegalEmail subject="Privacy Request" />. If you are not satisfied with our
                    response to a privacy concern, you may contact the Office of the Privacy Commissioner of Canada or,
                    if you are in Quebec, the Commission d’accès à l’information du Québec. Information about the
                    transfer of Canadians’ personal information outside Canada appears
                    in <SectionRef to="international-transfers">Section 10</SectionRef>.
                </p>
            </>
        ),
    },
    {
        id: "international-transfers",
        number: 10,
        title: "International Data Transfers",
        content: (
            <>
                <p>
                    uSync is based in the United States, and our servers and most of our service providers are located
                    in the United States. If you use the Services from outside the United States, your personal
                    information will be transferred to, stored in, and processed in the United States, and some service
                    providers may process it in other countries where they or their subcontractors operate. Data
                    protection laws in the United States may differ from, and may not be as protective as, the laws
                    where you live. When you provide information directly to us from outside the United States, we
                    process it in the United States to provide the Services you request, and we protect it as described
                    in this policy.
                </p>
                <p>
                    When personal information from the EEA, the United Kingdom, or Switzerland is transferred to a
                    country that has not been recognized as providing an adequate level of data protection, we rely on
                    appropriate safeguards. These include the Standard Contractual Clauses approved by the European
                    Commission, together with the United Kingdom’s International Data Transfer Addendum and equivalent
                    Swiss safeguards where applicable, which are incorporated into the data processing terms we have
                    with our service providers. We also rely on the certification of service providers that participate
                    in the EU–U.S. Data Privacy Framework, the UK Extension to it, and the Swiss–U.S. Data Privacy
                    Framework. You may request more information about these safeguards, or a copy of the relevant
                    transfer mechanism, by contacting us.
                </p>
                <p>
                    The personal information of Canadian residents is transferred to and stored in the United States,
                    where it is protected by the contractual and security measures described in this policy. While
                    outside Canada, it may be accessible to the courts, law enforcement, and national security
                    authorities of the United States under its laws.
                </p>
            </>
        ),
    },
    {
        id: "minors",
        number: 11,
        title: "Children & Minors",
        content: (
            <>
                <p>
                    uSync is open to the general public, including teens, but it is not directed to young children.
                    Children under 13 may browse the public pages of our website, but they may not create an account,
                    register for events, make purchases, or otherwise provide personal information to us. We do not
                    knowingly collect personal information from children under 13 without verifiable parental consent,
                    as required by the U.S. Children’s Online Privacy Protection Act (“COPPA”). If we learn that we have
                    collected personal information from a child under 13 without that consent, we will delete it as
                    quickly as possible. If you are a parent or guardian and believe your child under 13 has provided
                    us with personal information, please contact us at <LegalEmail subject="Child Privacy" />. In the
                    EEA and the United Kingdom, where we rely on consent and a user is below the age of digital consent
                    in their country (which ranges from 13 to 16), we rely on consent given or authorized by a parent
                    or guardian.
                </p>
                <p>
                    Teens between 13 and 17 may use the Services only with the permission and supervision of a parent
                    or legal guardian, as described in our <Link to="/more/terms-of-service">Terms of Service</Link>.
                    We apply additional protections to the personal information of users we know are under 18: we do
                    not sell or share it, we do not use it for targeted advertising, and we encourage teens not to
                    include their full name, school, home address, phone number, or other identifying details in their
                    public profile or content. Parents and guardians may contact us to review, correct, or delete their
                    teen’s personal information or to close their teen’s account. Hosts who run events for minors are
                    responsible for obtaining any parental consent their events require and for protecting
                    participants’ information.
                </p>
                <p>
                    If you are a California resident under 18 and a registered user, you may ask us to remove content
                    or information you have posted publicly on the Services by emailing{" "}
                    <LegalEmail subject="Minor Content Removal" /> with the subject line “Minor Content Removal” and
                    identifying the content. We will remove or anonymize it, although we may not be able to remove it
                    completely if, for example, it has been copied or reposted by others or we are required by law to
                    keep it.
                </p>
            </>
        ),
    },
    {
        id: "third-parties",
        number: 12,
        title: "Third-Party Links & Services",
        content: (
            <>
                <p>
                    The Services contain links to, and embedded content from, websites and services operated by
                    others, including Host registration pages, wager and head-to-head platforms, game publishers,
                    streaming services, and social networks. When you click a link or interact with third-party
                    content, those companies may collect information about you under their own privacy policies, and
                    this policy does not apply. We are not responsible for the privacy practices of third parties, and
                    we encourage you to review their policies before giving them your information. Adding a gaming or
                    social media username to your profile does not give uSync access to that account.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        number: 13,
        title: "Changes to This Policy",
        content: (
            <>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, our
                    Services, or the law. When we do, we will update the “Last Updated” date at the top of this page.
                    If we make material changes, we will notify you in advance by posting a notice on the Services,
                    emailing the address associated with your account, or both. Where the law requires your consent to
                    a change, such as using information you already gave us for a materially different purpose, we will
                    ask for it. We encourage you to review this policy periodically.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        number: 14,
        title: "Contact Us",
        content: (
            <>
                <p>
                    If you have questions or concerns about this Privacy Policy or our privacy practices, or you want to
                    exercise your privacy rights, please contact our Privacy Officer:
                </p>
                <LegalContactCard>
                    <p><strong>uSync LLC</strong>, Attn: Privacy Officer</p>
                    <p>Email: <LegalEmail subject="Privacy Request" /></p>
                    <p>Website: <Link to="/more/contactus">www.usync.gg</Link></p>
                </LegalContactCard>
                <p>
                    To help us respond quickly, please use the subject line that matches your request: “Privacy
                    Request,” “Privacy Appeal,” “Shine the Light Request,” or “Minor Content Removal.” We aim to acknowledge privacy inquiries promptly and to
                    resolve them within the timeframes described in Section 8.4.
                </p>
            </>
        ),
    },
];

export const PrivacyPolicy = () => (
    <LegalDocument
        title="Privacy Policy"
        seoDescription="How uSync collects, uses, shares, and protects your personal information, and how to exercise your privacy rights under GDPR, CCPA, PIPEDA, and other laws."
        canonicalPath="/more/privacy-policy"
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        intro={
            <>
                <p>
                    This Privacy Policy explains how uSync LLC (“uSync,” “we,” “us,” or “our”) collects, uses, shares,
                    and protects personal information when you visit <Link to="/">www.usync.gg</Link>, create an
                    account, register for events, host brackets, or otherwise use our website and services (together,
                    the “Services”). It also explains the rights and choices you have over your information and how to
                    exercise them. This Privacy Policy forms part of
                    our <Link to="/more/terms-of-service">Terms of Service</Link>, and terms such as “Host” and
                    “Services” have the meanings given there.
                </p>

                <LegalNotice>
                    <p>
                        <strong>The short version.</strong> We collect the information you give us when you create an
                        account, build a profile, or register for an event, along with technical information about how
                        you use the site. We use it to run uSync, process payments, keep the community safe, and improve
                        our Services. We share registration details with the Hosts whose events you join and rely on
                        trusted service providers to operate the platform. We do not sell your personal information or
                        use it for targeted advertising, and children under 13 may not create accounts. You can access,
                        correct, download, or delete your information as described
                        in <SectionRef to="your-rights">Section 8</SectionRef>.
                    </p>
                </LegalNotice>
            </>
        }
    />
);
