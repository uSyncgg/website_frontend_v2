import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";

export const UserGamesStep = () => {
    const { watch, setValue } = useFormContext();
    const selected = watch('interests') ?? [];
    const options = [
        {"value": "Call of Duty", "image": "cod img url", "title": "Call of Duty"},
        {"value": "CS 2", "image": "cs img url", "title": "CS 2"},
        {"value": "Halo", "image": "halo img url", "title": "Halo"},
        {"value": "League of Legends", "image": "lol img url", "title": "League of Legends"},
        {"value": "Rocket League", "image": "rl img url", "title": "Rocket League"},
        {"value": "Valorant", "image": "val img url", "title": "Valorant"},
        {"value": "Warzone", "image": "wz img url", "title": "Warzone"},
        {"value": "Other", "image": "other img url", "title": "Other"}
    ]
    
    const otherSelected = selected.includes("Other");

    const toggle = (value) => {
        setValue('interests', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    return (
        <div>
            {options.map(opt => (
                <SelectableFormBlock
                    key={opt.value}
                    image={opt.image}
                    title={opt.title}
                    selected={selected.includes(opt.value)}
                    onToggle={() => toggle(opt.value)}
                    blockClassName={""}
                    selectedClassName={""}
                />
            ))}

            {otherSelected && 
                <FormTextInput
                    id={"other_games"}
                    name={"other_games"}
                    label={"Other: Which game?"}
                    placeholder={"e.g. Apex Legends"}
                    required={false}
                    disabled={false}
                    inputClassName={""}
                    errorClassName={""}
                    labelClassName={""}
                />
            }
        </div>
    )
}
