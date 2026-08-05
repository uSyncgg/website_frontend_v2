import { FormTextInput } from "components/FormTextInput/FormTextInput";

const options = [
    {
        "name": "host_twitch",
        "label": "Twitch",
        "image": "twitch img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_twitter",
        "label": "Twitter/X",
        "image": "twitter img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_youtube",
        "label": "YouTube",
        "image": "youtube img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_kick",
        "label": "Kick",
        "image": "kick img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_discord",
        "label": "Discord",
        "image": "discord img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    },
    {
        "name": "host_instagram",
        "label": "Instagram",
        "image": "instagram img url",
        "labelClassName": "",
        "errorClassName": "",
        "inputClassName": "",
        "imageClassName": ""
    }
]

export const HostAccountsStep = () => {
    const placeholder = "username";

    return (
        <div>

            {
                options.map(opt => (
                    <FormTextInput
                        key={opt.name}
                        name={opt.name}
                        id={opt.name}
                        label={opt.label}
                        placeholder={placeholder}
                        image={opt.image}
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