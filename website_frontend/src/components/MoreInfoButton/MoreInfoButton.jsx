import styles from './MoreInfoButton.module.css';
import React from 'react';
import { Link } from 'react-router';

import { useNavigate } from 'react-router';

function MoreInfoButton({title, path, external=false}) {
    const navigator = useNavigate();

    const handleSubmitNative = () => {
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
            <Link to={path} target='_blank'>
                <button className={styles.button}>{title}</button>
            </Link>
        }
        </React.Fragment>
    );
}

export default MoreInfoButton;
