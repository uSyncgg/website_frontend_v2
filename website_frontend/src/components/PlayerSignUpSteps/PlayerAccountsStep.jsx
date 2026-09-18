import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import styles from "./PlayerAccountsStep.module.css";

// Twitter/X and Instagram use the same icons as the site footer
// (components/Footer/Footer.jsx); the rest were supplied directly for this
// step. YouTube still has no matching asset and falls back to initials.
import twitterIcon from "assets/images/social_icons/social-icon-x-purple_9.6.26.webp";
import instagramIcon from "assets/images/social_icons/social-icon-instagram-purple_9.6.26.webp";
import twitchIcon from "assets/images/linked_platforms/twitch_09-17-26_transparent.webp";
import kickIcon from "assets/images/linked_platforms/kick_logo_09-17-26.webp";
import discordIcon from "assets/images/linked_platforms/discord_logo_09-17-26.webp";
import battlenetIcon from "assets/images/linked_platforms/Battlenet_logo_09-17-26.webp";
import activisionIcon from "assets/images/linked_platforms/Activision_logo_09-17-26.webp";
import steamIcon from "assets/images/linked_platforms/Steam_logo_09-17-26_transparent.webp";
import riotIcon from "assets/images/linked_platforms/Riot_09-17-26_transparent.webp";
import cmgIcon from "assets/images/linked_platforms/cmg_logo_09-17-26.webp";
import ganksterIcon from "assets/images/linked_platforms/gankster_logo_09-17-26.webp";
import faceitIcon from "assets/images/linked_platforms/faceit_logo_09-17-26.webp";
import battlefyIcon from "assets/images/linked_platforms/battefly_logo_09-17-26.webp";
import eseaIcon from "assets/images/linked_platforms/esea_logo_09-17-26.webp";

const OPTIONS = {
    "socials": [
        {
            "name": "twitch",
            "label": "Twitch",
            "image": twitchIcon,
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
            "image": kickIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "discord",
            "label": "Discord",
            "image": discordIcon,
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
            "image": battlenetIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "activision",
            "label": "Activision",
            "image": activisionIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "steam",
            "label": "Steam",
            "image": steamIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "riot",
            "label": "Riot",
            "image": riotIcon,
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
            "image": cmgIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "gankster",
            "label": "Gankster",
            "image": ganksterIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "faceit",
            "label": "Faceit",
            "image": faceitIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "battlefy",
            "label": "Battlefy",
            "image": battlefyIcon,
            "labelClassName": "",
            "errorClassName": "",
            "inputClassName": "",
            "imageClassName": ""
        },
        {
            "name": "esea",
            "label": "ESEA",
            "image": eseaIcon,
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