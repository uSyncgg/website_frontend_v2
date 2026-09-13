import styles from './GameImage.module.css';
import { Link } from 'react-router';
import React from 'react';
import underline from 'assets/images/misc/underline-decorative-graphic_9.6.26.webp';
import codIcon from 'assets/images/game_icons/game-icon-call-of-duty_9.6.26.webp';
import warzoneIcon from 'assets/images/game_icons/game-icon-warzone_9.6.26.webp';
import haloIcon from 'assets/images/game_icons/game-icon-halo_9.6.26.webp';
import lolIcon from 'assets/images/game_icons/game-icon-league-of-legends_9.6.26.webp';
import rlIcon from 'assets/images/game_icons/game-icon-rocket-league_9.6.26.webp';
import valorantIcon from 'assets/images/game_icons/game-icon-valorant_9.6.26.webp';
import cs2Icon from 'assets/images/game_icons/game-icon-counter-strike-2_9.6.26.webp';
import fortniteIcon from 'assets/images/coming_soon/Fortnite Coming Soon Icon (9.13.26).webp';
import apexIcon from 'assets/images/coming_soon/Apex Legends Coming Soon Icon (9.13.26).webp';
import ssbIcon from 'assets/images/coming_soon/Super Smash Bros Ultimate Coming Soon Icon (9.13.26).webp';
import overwatchIcon from 'assets/images/coming_soon/Overwatch 2 Coming Soon Icon (9.13.26).webp';

export const GameImage = ({ games, title }) => {

    return (
        <React.Fragment>
            {title !== undefined &&
                <React.Fragment>
                    <h2 className={styles.white}>{title}</h2>
                    <img className="underlineImg" src={underline} alt="underline" />
                </React.Fragment>
            }
            
            <div className={styles.imageContainer}>
                {Object.keys(games).includes("Call of Duty") && 
                    <Link to={games["Call of Duty"]}>
                        <img src={codIcon} alt="Call of Duty" />
                    </Link>
                }

                {Object.keys(games).includes("Warzone") && 
                    <Link to={games["Warzone"]}>
                        <img src={warzoneIcon} alt="Warzone" />
                    </Link>
                }

                {Object.keys(games).includes("Halo") && 
                    <Link to={games["Halo"]}>
                        <img src={haloIcon} alt="Halo" />
                    </Link>
                }

                {Object.keys(games).includes("League of Legends") && 
                    <Link to={games["League of Legends"]}>
                        <img src={lolIcon} alt="League of Legends" />
                    </Link>
                }

                {Object.keys(games).includes("Rocket League") && 
                    <Link to={games["Rocket League"]}>
                        <img src={rlIcon} alt="Rocket League" />
                    </Link>
                }

                {Object.keys(games).includes("Valorant") && 
                    <Link to={games["Valorant"]}>
                        <img src={valorantIcon} alt="Valorant" />
                    </Link>
                }

                {Object.keys(games).includes("CS2") && 
                    <Link to={games["CS2"]}>
                        <img src={cs2Icon} alt="Counter-Strike 2" />
                    </Link>
                }

                {Object.keys(games).includes("Fortnite") && 
                    <Link to={games["Fortnite"]}>
                        <img src={fortniteIcon} alt="Fortnite Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Apex Legends") && 
                    <Link to={games["Apex Legends"]}>
                        <img src={apexIcon} alt="Apex Legends Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Super Smash Bros") && 
                    <Link to={games["Super Smash Bros"]}>
                        <img src={ssbIcon} alt="Super Smash Bros. Ultimate Coming Soon" />
                    </Link>
                }

                {Object.keys(games).includes("Overwatch 2") && 
                    <Link to={games["Overwatch 2"]}>
                        <img src={overwatchIcon} alt="Overwatch 2 Coming Soon" />
                    </Link>
                }
            </div>
        </React.Fragment>
    );    
}
