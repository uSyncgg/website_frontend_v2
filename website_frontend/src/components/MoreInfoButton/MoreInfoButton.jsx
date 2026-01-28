import styles from './MoreInfoButton.module.css';

import { useNavigate } from 'react-router';

function MoreInfoButton({title, path}) {
    const navigator = useNavigate();

    const handleSubmit = () => {
        return(
            navigator(path)
        );
    }

    return (
        <button onClick={handleSubmit} className={styles.button} type='submit'>{title}</button>
    );
}

export default MoreInfoButton;
