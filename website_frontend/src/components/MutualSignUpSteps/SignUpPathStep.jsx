import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { useFormContext } from "react-hook-form";

export const SignUpPathStep = () => {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const selected = watch('signup_path') ?? [];

    const toggle = (value) => {
        setValue('signup_path', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    return (
        <div>
            <div role="group" aria-label="Select how you plan to use uSync">
                <SelectableFormBlock
                    title="Player"
                    selected={selected.includes('player')}
                    onToggle={() => toggle('player')}
                    blockClassName={""}
                    selectedClassName={""}
                />
                <SelectableFormBlock
                    title="Host"
                    selected={selected.includes('host')}
                    onToggle={() => toggle('host')}
                    blockClassName={""}
                    selectedClassName={""}
                />
            </div>

            {errors.signup_path && <span>{errors.signup_path.message}</span>}
        </div>
    )
}
