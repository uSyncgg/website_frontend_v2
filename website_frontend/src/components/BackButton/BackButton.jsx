import styles from './BackButton.module.css';

import { useNavigate } from 'react-router';

export const BackButton = ({ path }) => {
    const navigator = useNavigate();

    const handleSubmit = () => {
        return(
            navigator(path)
        );
    }

    return (
        <button onClick={handleSubmit} className={styles.button} type='submit'>Back</button>
    );
}

