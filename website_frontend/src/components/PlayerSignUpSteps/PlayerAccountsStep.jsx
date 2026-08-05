import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const OPTIONS = {
    "socials": [
        {
            "name": "twitch", 
            "label": "Twitch", 
            "image": "twitch img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "twitter", 
            "label": "Twitter/X", 
            "image": "twitter img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "youtube", 
            "label": "YouTube", 
            "image": "youtube img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "kick", 
            "label": "Kick", 
            "image": "kick img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "discord", 
            "label": "Discord", 
            "image": "discord img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "instagram", 
            "label": "Instagram", 
            "image": "instagram img url", 
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
            "image": "battlenet img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "activision", 
            "label": "Activision", 
            "image": "acti img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "steam", 
            "label": "Steam", 
            "image": "steam img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "riot", 
            "label": "Riot", 
            "image": "riot img url", 
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
            "image": "cmg img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "gankster", 
            "label": "Gankster", 
            "image": "gankster img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "faceit", 
            "label": "Faceit", 
            "image": "faceit img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "battlefy", 
            "label": "Battlefy", 
            "image": "battlefy img url", 
            "labelClassName": "", 
            "errorClassName": "", 
            "inputClassName": "", 
            "imageClassName": ""
        },
        {
            "name": "esea", 
            "label": "ESEA", 
            "image": "esea img url", 
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
            <span>
                <button onClick={() => setValue('linked_toggle', 'socials')} type="button">Socials</button>
                <button onClick={() => setValue('linked_toggle', 'game_platforms')} type="button">Game Platforms</button>
                <button onClick={() => setValue('linked_toggle', 'competitive')} type="button">Competitive</button>
            </span>

            {
                activeOptions.map(opt => (
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