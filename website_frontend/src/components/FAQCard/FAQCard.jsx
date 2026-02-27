import styles from './FAQCard.module.css';
import { Link } from 'react-router';

export const FAQCard = ({ question }) => {
    const questionDict = {
        'Contact': {
            "Q": "How do I sign up for competitions?",
            "A": "You can sign up directly from the \"Join Now\" button on your desired event. From there, you will be redirected to that event's registeration page. If you have any trouble, feel free to"
        },
        "Competitions": {
            "Q": "What are the different types of competitions",
            "A": "There are 5 types of competitions for each game: Tournaments, Wagers, LANs, Head-to-head, and Leagues. To learn more about each type, check out our video explaining them"
        },
        "Navigate": {
            "Q": "What's the easiest way to navigate the site?",
            "A": "The best way to navigate the site is either going page-to-page or watching this"
        },
        "Rules": {
            "Q": "What are the rules?",
            "A": "Each game title has a different ruleset based on the gamemode. The best way to find the rules is to check through the provider you are playing for as each has their own variation. Here is an"
        },
        "Event": {
            "Q": "How do I post my own event?",
            "A": "You can post your own event by submitting an"
        },
        "Verified": {
            "Q": "What is uSync Verified?",
            "A": "uSync verified is our way of ensuring the legitimacy of our event hosts. All events with the uSync Verified checkmark have been independently verified by our team to be a safe, and quality competition for all entrants."
        }
    }

    return (
        <div className={styles.faqContainer}>
            <p className={styles.question}>Q: {questionDict[question]["Q"]}</p>
            {/* <Link to */}
        </div>
    )
}
