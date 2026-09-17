import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import styles from "./PlayerAccountsStep.module.css";

// Same icons used in the site footer (components/Footer/Footer.jsx). Only
// Twitter/X and Instagram have a footer icon today — everything else here
// (Twitch, YouTube, Kick, Discord, and every game/competitive platform) has
// no matching asset anywhere in the codebase yet.
import twitterIcon from "assets/images/social_icons/social-icon-x-purple_9.6.26.webp";
import instagramIcon from "assets/images/social_icons/social-icon-instagram-purple_9.6.26.webp";

const OPTIONS = {
    "socials": [
        {
            "name": "twitch",
            "label": "Twitch",
            "initials": "TW",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "twitter",
            "label": "Twitter/X",
            "image": twitterIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "youtube",
            "label": "YouTube",
            "initials": "YT",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "kick",
            "label": "Kick",
            "initials": "KK",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "discord",
            "label": "Discord",
            "initials": "DC",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "instagram",
            "label": "Instagram",
            "image": instagramIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        
    ],
    "game_platforms": [
        {
            "name": "battlenet",
            "label": "Battle.net",
            "initials": "BN",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "activision",
            "label": "Activision",
            "initials": "AV",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "steam",
            "label": "Steam",
            "initials": "ST",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "riot",
            "label": "Riot",
            "initials": "RT",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
    ],
    "competitive": [
        {
            "name": "cmg",
            "label": "CMG",
            "initials": "CMG",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "gankster",
            "label": "Gankster",
            "initials": "GK",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "faceit",
            "label": "Faceit",
            "initials": "FC",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "battlefy",
            "label": "Battlefy",
            "initials": "BF",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "esea",
            "label": "ESEA",
            "initials": "ES",
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
    ]
}

export const PlayerAccountsStep = () => {
    const { setValue, watch } = useFormContext();
    const selected = watch('linked_toggle');
    const placeholder = "username";

    useEffect(() => {
        setValue('linked_toggle', "socials");
    }, [setValue]);

    const activeOptions = OPTIONS[selected] ?? [];

    return (
        <div>
            <div className={styles.linkTabs} role="tablist">
                <button
                    className={`${styles.linkTabButton} ${selected === 'socials' ? styles.linkTabActive : ''}`}
                    onClick={() => setValue('linked_toggle', 'socials')}
                    type="button"
                    role="tab"
                    aria-selected={selected === 'socials'}
                >Socials</button>
                <button
                    className={`${styles.linkTabButton} ${selected === 'game_platforms' ? styles.linkTabActive : ''}`}
                    onClick={() => setValue('linked_toggle', 'game_platforms')}
                    type="button"
                    role="tab"
                    aria-selected={selected === 'game_platforms'}
                >Game Platforms</button>
                <button
                    className={`${styles.linkTabButton} ${selected === 'competitive' ? styles.linkTabActive : ''}`}
                    onClick={() => setValue('linked_toggle', 'competitive')}
                    type="button"
                    role="tab"
                    aria-selected={selected === 'competitive'}
                >Competitive</button>
            </div>

            <div className={styles.linkRows}>
                {
                    activeOptions.map(opt => (
                        <FormTextInput
                            key={opt.name}
                            name={opt.name}
                            id={opt.name}
                            label={opt.label}
                            placeholder={placeholder}
                            image={opt.image}
                            initials={opt.initials}
                            labelClassName={opt.labelClassName}
                            errorClassName={opt.errorClassName}
                            inputClassName={opt.inputClassName}
                            imageClassName={opt.imageClassName}
                        />
                    ))
                }
            </div>
        </div>
    )
}