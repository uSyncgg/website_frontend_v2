import styles from './MoreInfoButton.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { trackEventCardClick } from 'utils/analytics';

function MoreInfoButton({title, path, external=false}) {
    const navigator = useNavigate();

    const handleSubmitNative = (e) => {
        e.stopPropagation();
        trackEventCardClick(path, title);
        return(
            navigator(path)
        );
    }

    return (
        <React.Fragment>
        {external === false &&
            <button onClick={handleSubmitNative} className={`${styles.actionSlot} ${styles.button}`} type='submit'>{title}</button>

        }

        {external === true &&
            <Link to={path} target='_blank' onClick={(e) => { e.stopPropagation(); trackEventCardClick(path, title); }} className={styles.actionSlot}>
                <button className={styles.button}>{title}</button>
            </Link>
        }
        </React.Fragment>
    );
}

export default MoreInfoButton;
