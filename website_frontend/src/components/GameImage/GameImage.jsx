import styles from './GameImage.module.css';
import { Link } from 'react-router';
import React from 'react';

export const GameImage = ({ games, title }) => {
    console.log(title)

    return (
        <React.Fragment>
            {title !== undefined &&
                <React.Fragment>
                    <h2 className={styles.white}>{title}</h2>
                    <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                </React.Fragment>
            }
            
            <div className={styles.imageContainer}>
                {Object.keys(games).includes("Call of Duty") && 
                    <Link to={games["Call of Duty"]}>
                        <img src="https://i.imgur.com/gNvoNEo.png" alt="Call of Duty" />
                    </Link>
                }

                {Object.keys(games).includes("Warzone") && 
                    <Link to={games["Warzone"]}>
                        <img src="https://i.imgur.com/IBGIbY2.png" alt="Warzone" />
                    </Link>
                }

                {Object.keys(games).includes("Halo") && 
                    <Link to={games["Halo"]}>
                        <img src="https://i.imgur.com/wqKJfEu.png" alt="Halo" /> 
                    </Link>
                }

                {Object.keys(games).includes("League of Legends") && 
                    <Link to={games["League of Legends"]}>
                        <img src="https://i.imgur.com/5riYNow.png" alt="League of Legends" />
                    </Link>
                }

                {Object.keys(games).includes("Rocket League") && 
                    <Link to={games["Rocket League"]}>
                        <img src="https://i.imgur.com/GJO8JIZ.png" alt="Rocket League" />
                    </Link>
                }

                {Object.keys(games).includes("Valorant") && 
                    <Link to={games["Valorant"]}>
                        <img src="https://i.imgur.com/Gsl3oIp.png" alt="Valorant" />
                    </Link>
                }

                {Object.keys(games).includes("CS2") && 
                    <Link to={games["CS2"]}>
                        <img src="https://i.imgur.com/60FwDKN.png" alt="Counter-Strike 2" />
                    </Link>
                }

                {Object.keys(games).includes("Fortnite") && 
                    <Link to={games["Fortnite"]}>
                        <img src="https://i.imgur.com/ybSqQK4.png" alt="Fortnite Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Apex Legends") && 
                    <Link to={games["Apex Legends"]}>
                        <img src="https://i.imgur.com/MUcaqmt.png" alt="Apex Legends Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Super Smash Bros") && 
                    <Link to={games["Super Smash Bros"]}>
                        <img src="https://i.imgur.com/qpQDtRJ.png" alt="Super Smash Bros. Ultimate Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Overwatch 2") && 
                    <Link to={games["Overwatch 2"]}>
                        <img src="https://i.imgur.com/XxOYZiE.png" alt="Overwatch 2 Coming Soon" />
                    </Link>
                }
            </div>
        </React.Fragment>
    );    
}
