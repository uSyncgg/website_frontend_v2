import { Link } from "react-router";
import { useCurrentUser } from "hooks";
import { useWallet, formatMoney } from "services/bank";
import styles from "./BalanceChip.module.css";

// Your uSync balance, under the account view dropdown at the far right of the navbar. Click it to open the Bank.
export const BalanceChip = ({ onNavigate }) => {
    const { defaultProfile } = useCurrentUser();
    const wallet = useWallet(!!defaultProfile);

    if (!defaultProfile) return null;

    const text = wallet ? formatMoney(wallet.balanceCents) : '$–';
    return (
        <Link to="/bank" className={styles.chip} aria-label={wallet ? `uSync balance ${text}. Open the Bank` : 'Open the Bank'} onClick={onNavigate}>
            {text}
        </Link>
    );
};
