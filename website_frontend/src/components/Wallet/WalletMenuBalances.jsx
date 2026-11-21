import { Link } from "react-router";
import { useCurrentUser } from "hooks";
import { useWallet, formatMoney } from "services/wallet";
import { profileUrl } from "utils/profiles";
import styles from "./Wallet.module.css";

// The account menu's wallet line: Deposited Funds and Earnings, linking to the wallet on your
// own profile. Only for accounts with a profile (that's when a wallet exists).
export const WalletMenuBalances = ({ itemClass = '', onNavigate }) => {
    const { defaultProfile } = useCurrentUser();
    const { wallet } = useWallet(!!defaultProfile);

    if (!defaultProfile || !wallet) return null;

    return (
        <Link to={`${profileUrl(defaultProfile)}#wallet`} className={`${itemClass} ${styles.menuBalances}`} role="menuitem" onClick={onNavigate}
            aria-label={`Wallet: ${formatMoney(wallet.depositedCents)} deposited, ${formatMoney(wallet.earningsCents)} earnings`}>
            <span className={styles.menuRow}><span>Deposited</span><strong>{formatMoney(wallet.depositedCents)}</strong></span>
            <span className={styles.menuRow}><span>Earnings</span><strong>{formatMoney(wallet.earningsCents)}</strong></span>
            {wallet.frozen && <span className={styles.menuFrozen}>Wallet frozen</span>}
        </Link>
    );
};
