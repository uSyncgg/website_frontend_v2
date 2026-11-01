import { RadioFormBlock } from "components/RadioFormBlock/RadioFormBlock";
import { useFormContext, useWatch } from "react-hook-form";
import { PROFILE_LABELS, bracketField } from "utils/profiles";
import styles from "./BracketHostingStep.module.css";

// Yes / not right now for one form field ('yes' | 'no'; unanswered leaves the backend's default, on).
const BracketChoice = ({ field }) => {
    const { setValue } = useFormContext();
    const value = useWatch({ name: field });

    return (
        <>
            <RadioFormBlock
                title={"Yes, enable it"}
                description={"Build a \"Create\" view so you can run your own bracket"}
                blockClassName={styles.choice}
                selectedClassName={styles.choiceSelected}
                selected={value === "yes"}
                onToggle={() => setValue(field, 'yes')}
            />

            <RadioFormBlock
                title={"Not right now"}
                description={"You can turn hosting on later."}
                blockClassName={styles.choice}
                selectedClassName={styles.choiceSelected}
                selected={value === "no"}
                onToggle={() => setValue(field, 'no')}
            />
        </>
    );
};

// Bracket hosting is set per profile. Sign-up and add-a-profile pass `types` and get a choice
// for each profile being created (bracket_hosting_<type>); profile settings edits one profile,
// so it passes nothing and uses the plain `bracket_hosting` field.
export const BracketHostingStep = ({ types }) => {
    if (!types) return <BracketChoice field="bracket_hosting" />;

    return <>{types.map(type => (
        <section key={type} className={styles.profileSection}>
            {types.length > 1 && <h3 className={styles.profileHeading}>{PROFILE_LABELS[type]} profile</h3>}
            <BracketChoice field={bracketField(type)} />
        </section>
    ))}</>;
};
