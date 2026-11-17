import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { useFormContext } from "react-hook-form";
import styles from "./HostEventStep.module.css";

// The kinds of events a host can run. Also edited from the host's profile (About the host).
export const HOST_EVENT_OPTIONS = [
    {"value": "Tournaments", "title": "Tournaments"},
    {"value": "Leagues", "title": "Leagues"},
    {"value": "LANs", "title": "LANs"},
    {"value": "Wagers", "title": "Wagers"},
    {"value": "Head-to-Head", "title": "Head-to-Head"}
];

export const HostEventStep = () => {
    const { watch, setValue } = useFormContext();
    const selected = watch('event_types') ?? [];

    const toggle = (value) => {
        setValue('event_types', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    return (
        <div className={styles.tiles} role="group" aria-label="Select the event types you plan to host">
            {HOST_EVENT_OPTIONS.map(opt => (
                <SelectableFormBlock
                    key={opt.value}
                    title={opt.title}
                    selected={selected.includes(opt.value)}
                    onToggle={() => toggle(opt.value)}
                    blockClassName={styles.tile}
                    selectedClassName={styles.tileSelected}
                />
            ))}
        </div>
    )
}