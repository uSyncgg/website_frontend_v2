import styles from "./AdminAnalytics.module.css";

// Finance tab of /admin/analytics. Placeholder until payments data is wired up.
// Planned:
//   - Payments in process
//   - Potential cash flow risks
export const AdminFinanceTab = () => (
    <section className={styles.card}>
        <h2 className={styles.cardTitle}>Finance</h2>
        <p className={styles.cardSubtitle}>Coming soon. This tab will show:</p>
        <ul className={styles.plannedList}>
            <li>Payments in process</li>
            <li>Potential cash flow risks</li>
        </ul>
    </section>
);
