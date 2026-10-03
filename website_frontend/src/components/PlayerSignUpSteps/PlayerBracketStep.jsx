import { RadioFormBlock } from "components/RadioFormBlock/RadioFormBlock";
import { useFormContext } from "react-hook-form";
import styles from "./PlayerBracketStep.module.css";

export const PlayerBracketStep = () => {
    const { watch, setValue } = useFormContext();
    const bracketHosting = watch('bracket_hosting');

    return (
        <div>
            <RadioFormBlock
                title={"Yes, enable it"}
                description={"Build a \"Create\" view so you can run your own bracket"}
                blockClassName={styles.choice}
                selectedClassName={styles.choiceSelected}
                selected={bracketHosting === "yes"}
                onToggle={() => setValue('bracket_hosting', 'yes')}
            />

            <RadioFormBlock
                title={"Not right now"}
                description={"You can turn hosting on later."}
                blockClassName={styles.choice}
                selectedClassName={styles.choiceSelected}
                selected={bracketHosting === "no"}
                onToggle={() => setValue('bracket_hosting', 'no')}
            />
        </div>
    )
}
