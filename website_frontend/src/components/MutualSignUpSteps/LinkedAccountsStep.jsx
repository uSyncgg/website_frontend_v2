import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LinkFields } from "components/LinkFields/LinkFields";
import { PROFILE_LABELS, linksField } from "utils/profiles";
import styles from "./LinkedAccountsStep.module.css";

// Sign-up and add-a-profile: the accounts each new profile will be able to link (socials, game
// accounts, brand links - whatever its type can have). Linking isn't built yet, so every
// platform shows as "Coming soon" and nothing is saved. With more than one profile, tabs
// switch between them.
export const LinkedAccountsStep = ({ types }) => {
    const { watch, setValue } = useFormContext();
    const [active, setActive] = useState(types[0]);
    const type = types.includes(active) ? active : types[0];
    const values = watch(linksField(type)) ?? {};

    return (
        <div>
            {types.length > 1 &&
                <div className={styles.tabs} role="tablist">
                    {types.map(t => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={t === type}
                            className={`${styles.tab} ${t === type ? styles.tabActive : ''}`}
                            onClick={() => setActive(t)}
                        >
                            {PROFILE_LABELS[t]}
                        </button>
                    ))}
                </div>
            }

            <LinkFields
                key={type}
                type={type}
                values={values}
                comingSoon
                onChange={(key, value) => setValue(`${linksField(type)}.${key}`, value, { shouldDirty: true })}
            />
        </div>
    );
};
