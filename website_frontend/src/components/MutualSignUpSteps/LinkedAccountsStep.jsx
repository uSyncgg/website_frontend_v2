import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LinkFields } from "components/LinkFields/LinkFields";
import { PROFILE_LABELS, linksField } from "utils/profiles";
import styles from "./LinkedAccountsStep.module.css";

// Sign-up and add-a-profile: the accounts each new profile links (socials, game IDs, brand
// links - whatever its type can have). Each profile has its own set, stored in the form as
// links_<type>: { platform: typed value }. With more than one profile, tabs switch between them.
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
                onChange={(key, value) => setValue(`${linksField(type)}.${key}`, value, { shouldDirty: true })}
            />
        </div>
    );
};
