import styles from './TeamPhoto.module.css';
import { Link } from 'react-router';
import React from 'react';
import jakePhoto from 'assets/images/contact_us/team-photo-jake-bruscino_9.6.26.webp';
import masonPhoto from 'assets/images/contact_us/team-photo-mason-wiley_9.6.26.webp';
import tonyPhoto from 'assets/images/contact_us/team-photo-tony-gomez_9.6.26.webp';
import matthewPhoto from 'assets/images/contact_us/team-photo-matthew-oconnor_9.6.26.webp';

export const TeamPhoto = ({member}) => {
    const teamMembers = {
        "Jake": {
            "socials": "https://www.linkedin.com/in/jake-bruscino/",
            "name": "Jake Bruscino",
            "role": "CEO / Co-Founder",
            "picture": jakePhoto
        },
        "Mace": {
            "socials": "https://www.linkedin.com/in/mason-wiley-b539bb304/",
            "name": "Mason Wiley",
            "role": "CSO / Co-Founder",
            "picture": masonPhoto
        },
        "Tone": {
            "socials": "https://www.linkedin.com/in/tonegmz/",
            "name": "Tony Gomez",
            "role": "CMO",
            "picture": tonyPhoto
        },
        "Matt": {
            "socials": "https://www.linkedin.com/in/matthew-o-connor-a9b444228/",
            "name": "Matthew O'Connor",
            "role": "CTO / Co-Founder",
            "picture": matthewPhoto
        }
    }

    return (
        <div className={styles.photoContainer}>
            <Link to={teamMembers[member]["socials"]} target='_blank' rel='nofollow'>
                <img className={styles.photo} src={teamMembers[member]["picture"]} alt={`${teamMembers[member]["name"]}`} />
            </Link>
            <h1 className={styles.title}>{teamMembers[member]["name"]}</h1>
            <h1 className={styles.subtitle}>{teamMembers[member]["role"]}</h1>
        </div>
    )
}
