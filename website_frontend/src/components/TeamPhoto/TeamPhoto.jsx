import styles from './TeamPhoto.module.css';
import { Link } from 'react-router';
import React from 'react';

export const TeamPhoto = ({member}) => {
    const teamMembers = {
        "Jake": {
            "socials": "https://www.linkedin.com/in/jake-bruscino/",
            "name": "Jake Bruscino",
            "role": "CEO / Co-Founder",
            "picture": "https://i.imgur.com/ZbCuZKi.png"
        },
        "Mace": {
            "socials": "https://www.linkedin.com/in/mason-wiley-b539bb304/",
            "name": "Mason Wiley",
            "role": "CSO / Co-Founder",
            "picture": "https://i.imgur.com/t0vqLB4.png"
        },
        "Tone": {
            "socials": "https://www.linkedin.com/in/tonegmz/",
            "name": "Tony Gomez",
            "role": "CMO",
            "picture": "https://i.imgur.com/AX1uMWJ.png"
        },
        "Matt": {
            "socials": "https://www.linkedin.com/in/matthew-o-connor-a9b444228/",
            "name": "Matthew O'Connor",
            "role": "CTO / Co-Founder",
            "picture": "https://i.imgur.com/gGXFOdn.png"
        }
    }

    return (
        <div className={styles.photoContainer}>
            <Link to={teamMembers[member]["socials"]}>
                <img className={styles.photo} src={teamMembers[member]["picture"]} alt={`${teamMembers[member]["name"]}`} />
            </Link>
            <h1 className={styles.title}>{teamMembers[member]["name"]}</h1>
            <h1 className={styles.subtitle}>{teamMembers[member]["role"]}</h1>
        </div>
    )
}
