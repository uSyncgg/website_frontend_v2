import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";
import { GAME_ICONS } from "catalog/gameIcons";
import styles from "./UserGamesStep.module.css";

// Same icons as the Games page (catalog/gameIcons.js). `value` is what gets saved,
// so it must stay the same even where the display name differs elsewhere.
const GAME_OPTIONS = [
    { value: "Call of Duty", title: "Call of Duty", image: GAME_ICONS['call-of-duty'] },
    { value: "CS 2", title: "CS 2", image: GAME_ICONS['cs2'] },
    { value: "Halo", title: "Halo", image: GAME_ICONS['halo'] },
    { value: "League of Legends", title: "League of Legends", image: GAME_ICONS['league-of-legends'] },
    { value: "Rocket League", title: "Rocket League", image: GAME_ICONS['rocket-league'] },
    { value: "Valorant", title: "Valorant", image: GAME_ICONS['valorant'] },
    { value: "Warzone", title: "Warzone", image: GAME_ICONS['warzone'] },
    { value: "Other", title: "Other", image: "" },
];

const GameTileGroup = ({ heading, fieldName, otherFieldName }) => {
    const { watch, setValue } = useFormContext();
    const selected = watch(fieldName) ?? [];
    const otherSelected = selected.includes("Other");

    const toggle = (value) => {
        setValue(fieldName, selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    return (
        <div className={styles.section}>
            {heading && <h3 className={styles.sectionHeading}>{heading}</h3>}

            <div className={styles.tiles}>
                {GAME_OPTIONS.map(opt => (
                    <SelectableFormBlock
                        key={opt.value}
                        image={opt.image}
                        title={opt.title}
                        selected={selected.includes(opt.value)}
                        onToggle={() => toggle(opt.value)}
                        blockClassName={styles.tile}
                        selectedClassName={styles.tileSelected}
                    />
                ))}
            </div>

            {otherSelected &&
                <div className={styles.otherInput}>
                    <FormTextInput
                        id={otherFieldName}
                        name={otherFieldName}
                        label={"Other: Which game?"}
                        placeholder={"e.g. Apex Legends"}
                        required={false}
                        disabled={false}
                        inputClassName={""}
                        errorClassName={""}
                        labelClassName={""}
                    />
                </div>
            }
        </div>
    );
};

// mode: 'player' (games played, field `interests`), 'host' (games hosted,
// field `hosted_games`), or 'combined' (both, shown as two labeled sections).
export const UserGamesStep = ({ mode = 'player' }) => {
    const isPlayer = mode === 'player' || mode === 'combined';
    const isHost = mode === 'host' || mode === 'combined';
    const showHeadings = isPlayer && isHost;

    return (
        <div>
            {isPlayer && (
                <GameTileGroup
                    heading={showHeadings ? "Games You Play" : null}
                    fieldName="interests"
                    otherFieldName="other_games"
                />
            )}
            {isHost && (
                <GameTileGroup
                    heading={showHeadings ? "Games You Host" : null}
                    fieldName="hosted_games"
                    otherFieldName="other_hosted_games"
                />
            )}
        </div>
    )
}
