import styles from './MoreInfoButton.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { trackEventCardClick } from 'utils/analytics';

function MoreInfoButton({title, path, external=false}) {
    const navigator = useNavigate();

    const handleSubmitNative = () => {
        trackEventCardClick(path, title);
        return(
            navigator(path)
        );
    }

    return (
        <React.Fragment>
        {external === false &&
            <button onClick={handleSubmitNative} className={styles.button} type='submit'>{title}</button>

        }

        {external === true &&
            <Link to={path} target='_blank' onClick={() => trackEventCardClick(path, title)}>
                <button className={styles.button}>{title}</button>
            </Link>
        }
        </React.Fragment>
    );
}

export default MoreInfoButton;
