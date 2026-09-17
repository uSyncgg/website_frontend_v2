import { FormTextInput } from "components/FormTextInput/FormTextInput";
import styles from "./HostAccountsStep.module.css";

// Same icons used in the site footer (components/Footer/Footer.jsx). Only
// Twitter/X and Instagram have a footer icon today — Twitch, YouTube, Kick,
// and Discord have no matching asset anywhere in the codebase yet.
import twitterIcon from "assets/images/social_icons/social-icon-x-purple_9.6.26.webp";
import instagramIcon from "assets/images/social_icons/social-icon-instagram-purple_9.6.26.webp";

const options = [
    {
        "name": "host_twitch",
        "label": "Twitch",
        "initials": "TW",
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
        "initials": "KK",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_discord",
        "label": "Discord",
        "initials": "DC",
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