import { FaDiscord, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { signInWithProvider } from "services/authServices";
import styles from "./SocialLoginButtons.module.css";

const PROVIDERS = [
    { id: 'google', label: 'Continue with Google', Icon: FaGoogle },
    { id: 'discord', label: 'Continue with Discord', Icon: FaDiscord },
    { id: 'x', label: 'Continue with X', Icon: FaXTwitter },
];

export function SocialLoginButtons() {
    return(
        <div className={styles.providers}>
            {PROVIDERS.map(({ id, label, Icon }) => (
                <button key={id} type="button" className={styles.provider} onClick={() => signInWithProvider(id)}>
                    <Icon aria-hidden="true" />
                    {label}
                </button>
            ))}
        </div>
    )
}
