import { FormTextInput } from "components/FormTextInput/FormTextInput";
import styles from "./HostAccountsStep.module.css";

// Twitter/X and Instagram use the same icons as the site footer
// (components/Footer/Footer.jsx); the rest were supplied directly for this
// step. YouTube still has no matching asset and falls back to initials.
import twitterIcon from "assets/images/social_icons/social-icon-x-purple_9.6.26.webp";
import instagramIcon from "assets/images/social_icons/social-icon-instagram-purple_9.6.26.webp";
import twitchIcon from "assets/images/linked_platforms/twitch_09-17-26_transparent.webp";
import kickIcon from "assets/images/linked_platforms/kick_logo_09-17-26.webp";
import discordIcon from "assets/images/linked_platforms/discord_logo_09-17-26.webp";

const options = [
    {
        "name": "host_twitch",
        "label": "Twitch",
        "image": twitchIcon,
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_twitter",
        "label": "Twitter/X",
        "image": twitterIcon,
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_youtube",
        "label": "YouTube",
        "initials": "YT",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_kick",
        "label": "Kick",
        "image": kickIcon,
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_discord",
        "label": "Discord",
        "image": discordIcon,
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_instagram",
        "label": "Instagram",
        "image": instagramIcon,
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    }
]

export const HostAccountsStep = () => {
    const placeholder = "username";

    return (
        <div className={styles.linkRows}>
            {
                options.map(opt => (
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
    )
}