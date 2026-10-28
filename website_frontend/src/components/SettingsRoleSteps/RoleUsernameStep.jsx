import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RadioFormBlock } from "components/RadioFormBlock/RadioFormBlock";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { checkUsername } from "services/user";
import { isRateLimited } from "utils/apiError";
import radioStyles from "components/PlayerSignUpSteps/PlayerBracketStep.module.css";
import styles from "./SettingsRoleSteps.module.css";

const ROLE_LABELS = { host: 'host', player: 'player' };
const OTHER_PROFILE = { host: 'player', player: 'host' };

// Adding the player or host role: pick the name to use. An account has one username,
// kept unique among players and separately among hosts - so they can keep their current
// name if nobody else in the new role has it, or choose a new one (which changes everywhere).
// role: the role being added ('host' | 'player'). savedUsername: the account's current username.
export const RoleUsernameStep = ({ role, savedUsername }) => {
    const { watch, setValue } = useFormContext();
    const mode = watch('role_username_mode');
    const label = ROLE_LABELS[role];
    // 'checking' | 'free' | 'taken' | 'unknown'
    const [currentStatus, setCurrentStatus] = useState('checking');

    useEffect(() => {
        let stale = false;
        checkUsername(savedUsername, role === 'host' ? { isHost: true } : { isPlayer: true })
            .then(() => { if (!stale) setCurrentStatus('free'); })
            .catch(err => {
                if (stale) return;
                // A 409 means someone else in that role already uses this name.
                const taken = err.response?.status === 409 && !isRateLimited(err);
                setCurrentStatus(taken ? 'taken' : 'unknown');
                if (taken) setValue('role_username_mode', 'new');
            });
        return () => { stale = true; };
    }, [savedUsername, role, setValue]);

    return (
        <div>
            <RadioFormBlock
                title={`Keep @${savedUsername}`}
                description={currentStatus === 'checking' ? `Checking if ${label}s can use it...`
                    : currentStatus === 'taken' ? `Another ${label} already uses this name - pick a new one below.`
                    : currentStatus === 'free' ? `Available - your ${label} profile uses the same name as your ${OTHER_PROFILE[role]} profile.`
                    : 'Use the same name you have now.'}
                blockClassName={`${radioStyles.choice} ${currentStatus === 'taken' ? styles.locked : ''}`}
                selectedClassName={radioStyles.choiceSelected}
                selected={mode === 'current'}
                onToggle={() => currentStatus !== 'taken' && setValue('role_username_mode', 'current')}
            />

            <RadioFormBlock
                title={"Choose a new username"}
                description={"This becomes your username everywhere on uSync."}
                blockClassName={radioStyles.choice}
                selectedClassName={radioStyles.choiceSelected}
                selected={mode === 'new'}
                onToggle={() => setValue('role_username_mode', 'new')}
            />

            {mode === 'new' && (
                <div className={styles.usernameField}>
                    <FormTextInput
                        id={"role_username"}
                        name={"role_username"}
                        label={"New username"}
                        placeholder={"e.g. NightOwlsGG"}
                        required={false}
                        disabled={false}
                        inputClassName={""}
                        errorClassName={""}
                        labelClassName={""}
                    />
                </div>
            )}
        </div>
    );
};
