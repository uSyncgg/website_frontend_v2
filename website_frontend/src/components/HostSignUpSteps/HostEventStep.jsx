import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { useFormContext } from "react-hook-form";

export const HostEventStep = () => {
    const { watch, setValue } = useFormContext();
    const selected = watch('event_types') ?? [];
    const options = [
        {"value": "Tournaments", "title": "Tournaments"},
        {"value": "Leagues", "title": "Leagues"},
        {"value": "LANs", "title": "LANs"},
        {"value": "Wagers", "title": "Wagers"},
        {"value": "Head-to-Head", "title": "Head-to-Head"}
    ]

    const toggle = (value) => {
        setValue('event_types', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    return (
        <div role="group" aria-label="Select the event types you plan to host">
            {options.map(opt => (
                <SelectableFormBlock
                    key={opt.value}
                    title={opt.title}
                    selected={selected.includes(opt.value)}
                    onToggle={() => toggle(opt.value)}
                    blockClassName={""}
                    selectedClassName={""}
                />
            ))}
        </div>
    )
}