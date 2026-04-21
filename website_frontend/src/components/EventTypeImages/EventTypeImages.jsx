import styles from './EventTypeImages.module.css';
import { Link } from 'react-router';
import React from 'react';

export const EventTypeImages = ({ page, articleName='' }) => {

    return (
        <div>
            {page === "Call of Duty" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/games/call-of-duty/lans">
                        <img src="https://i.imgur.com/NXTgpHd.png" alt='CoD LANs'/>
                    </Link>

                    <Link to="/tournaments/call-of-duty-tournaments">
                        <img src="https://i.imgur.com/nVx3C4M.png" alt="CoD Tournaments"/>
                    </Link>

                    <Link to="/games/call-of-duty/leagues">
                        <img src="https://i.imgur.com/Zj3dVpv.png" alt="CoD Leagues"/>
                    </Link>

                    <Link to="/games/call-of-duty/wagers">
                        <img src="https://i.imgur.com/EgBRBVS.png" alt="CoD Wagers"/>
                    </Link>

                    <Link to="/games/call-of-duty/head-to-head">
                        <img src="https://i.imgur.com/CiO5ViA.png" alt="CoD Head to Head"/>
                    </Link>
                </div>
            }

            {page === "CS2" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/ciqy3Bd.png" alt='CS2 LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/ugKIhLq.png" alt="CS2 Tournaments"/>
                    </Link>

                    <Link to="/games/CS2/leagues">
                        <img src="https://i.imgur.com/gE6ZfqX.png" alt="CS2 Leagues"/>
                    </Link>

                    <Link to="/games/CS2/wagers">
                        <img src="https://i.imgur.com/SzMtvPy.png" alt="CS2 Wagers"/>
                    </Link>

                    <Link to="/games/CS2/head-to-head">
                        <img src="https://i.imgur.com/b9B93ig.png" alt="CS2 Head to Head"/>
                    </Link>
                </div>
            }

            {page === "Halo" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/games/halo/lans">
                        <img src="https://i.imgur.com/5JagjfE.png" alt='Halo LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/XcbF4hG.png" alt="Halo Tournaments"/>
                    </Link>

                    <Link to="/games/halo/leagues">
                        <img src="https://i.imgur.com/oq9dG7T.png" alt="Halo Leagues"/>
                    </Link>

                    <Link to="/games/halo/wagers">
                        <img src="https://i.imgur.com/aXgvEAv.png" alt="Halo Wagers"/>
                    </Link>

                    <Link to="/games/halo/head-to-head">
                        <img src="https://i.imgur.com/UC6wGwa.png" alt="Halo Head to Head"/>
                    </Link>
                </div>
            }

            {page === "League of Legends" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/games/LoL/lans">
                        <img src="https://i.imgur.com/sXCt646.png" alt='LoL LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/K6PQmyu.png" alt="LoL Tournaments"/>
                    </Link>

                    <Link to="/games/LoL/leagues">
                        <img src="https://i.imgur.com/p77z4SF.png" alt="LoL Leagues"/>
                    </Link>

                    <Link to="/games/LoL/wagers">
                        <img src="https://i.imgur.com/OhtUL4E.png" alt="LoL Wagers"/>
                    </Link>

                    <Link to="/games/LoL/head-to-head">
                        <img src="https://i.imgur.com/y5W9NXc.png" alt="LoL Head to Head"/>
                    </Link>
                </div>
            }

            {page === "Rocket League" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/5ETdmF8.png" alt='RL LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/8ZFHAM6.png" alt="RL Tournaments"/>
                    </Link>

                    <Link to="/games/RocketLeague/leagues">
                        <img src="https://i.imgur.com/C2VoFOV.png" alt="RL Leagues"/>
                    </Link>

                    <Link to="/games/RocketLeague/wagers">
                        <img src="https://i.imgur.com/ylkoL6L.png" alt="RL Wagers"/>
                    </Link>

                    <Link to="/games/RocketLeague/head-to-head">
                        <img src="https://i.imgur.com/vC5N7DW.png" alt="RL Head to Head"/>
                    </Link>
                </div>
            }

            {page === "Valorant" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/pRnsLUn.png" alt='Valorant LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/S6xUnmR.png" alt="Valorant Tournaments"/>
                    </Link>

                    <Link to="/games/Valorant/leagues">
                        <img src="https://i.imgur.com/D9hSzYi.png" alt="Valorant Leagues"/>
                    </Link>

                    <Link to="/games/Valorant/wagers">
                        <img src="https://i.imgur.com/q3EujhS.png" alt="Valorant Wagers"/>
                    </Link>

                    <Link to="/games/Valorant/head-to-head">
                        <img src="https://i.imgur.com/Eb0q3VJ.png" alt="Valorant Head to Head"/>
                    </Link>
                </div>
            }

            {page === "Warzone" &&
                <div className={styles.imageEventContainer}>
                    <Link to="/games/warzone/lans">
                        <img src="https://i.imgur.com/8mmKkCg.png" alt='Warzone LANs'/>
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/a7K4MUH.png" alt="Warzone Tournaments"/>
                    </Link>

                    <Link to="/games/warzone/leagues">
                        <img src="https://i.imgur.com/XejELXr.png" alt="Warzone Leagues"/>
                    </Link>

                    <Link to="/games/warzone/wagers">
                        <img src="https://i.imgur.com/HrpTxPD.png" alt="Warzone Wagers"/>
                    </Link>

                    <Link to="/games/warzone/head-to-head">
                        <img src="https://i.imgur.com/pVeF9I1.png" alt="Warzone Head to Head"/>
                    </Link>
                </div>
            }

            {page === "All LANs" &&
                <div className={`${styles.imageEventContainer} ${styles.soloImage}`}>
                    <Link to="/LanMap">
                        <img src="https://i.imgur.com/OPhy6nX.png" alt='All LANs'/>
                    </Link>
                </div>
            }

            {page === "Articles" &&
                <div className={styles.imageEventContainer}>
                    <Link to={"/more/FAQ/The-Problem-With-Esports"}>
                        <img src='https://i.imgur.com/vBqSUhI.png' alt='The Problem With Esports' />
                    </Link>

                    <Link to={"/more/FAQ/How-We-Fix-It"}>
                        <img src='https://i.imgur.com/Q6NQGsD.png' alt='How We Fix It' />
                    </Link>

                    <Link to={"/more/FAQ/What-We-Provide"}>
                        <img src='https://i.imgur.com/Fr7yPnN.png' alt='What We Provide' />
                    </Link>

                    <Link to={"/more/FAQ/How-to-Join-an-Esports-League"}>
                        <img src='https://i.imgur.com/zS2wj8d.png' alt='How to Join an Esports League' />
                    </Link>

                    <Link to={"/more/FAQ/How-Esports-Can-Be-Better"}>
                        <img src='https://i.imgur.com/DEB6G8p.png' alt='How Esports Can Be Better' />
                    </Link>
                </div>
            }

            {page === "Article" &&
                <div className={styles.imageArticleContainer}>
                    {articleName !== "The Problem With Esports" && 
                        <Link to={"/more/FAQ/The-Problem-With-Esports"}>
                            <img src='https://i.imgur.com/vBqSUhI.png' alt='The Problem With Esports' className={styles.articlePageImg} />
                        </Link>
                    }
                    
                    {articleName !== "How We Fix It" && 
                        <Link to={"/more/FAQ/How-We-Fix-It"}>
                            <img src='https://i.imgur.com/Q6NQGsD.png' alt='How We Fix It' className={styles.articlePageImg} />
                        </Link>
                    }
                    
                    {articleName !== "What We Provide" && 
                        <Link to={"/more/FAQ/What-We-Provide"}>
                            <img src='https://i.imgur.com/Fr7yPnN.png' alt='What We Provide' className={styles.articlePageImg} />
                        </Link>
                    }
                    
                    {articleName !== "How to Join an Esports League" &&
                        <Link to={"/more/FAQ/How-to-Join-an-Esports-League"}>
                            <img src='https://i.imgur.com/zS2wj8d.png' alt='How to Join an Esports League' className={styles.articlePageImg} />
                        </Link>
                    }

                    {articleName !== "How Esports Can Be Better" && 
                        <Link to={"/more/FAQ/How-Esports-Can-Be-Better"}>
                            <img src='https://i.imgur.com/DEB6G8p.png' alt='How Esports Can Be Better' className={styles.articlePageImg} />
                        </Link>
                    }
                </div>
            }

            {page === "Coming Soon" && 
                <div className={styles.imageEventContainer}>
                    <Link to={"#"}>
                        <img src='https://i.imgur.com/8ZFHAM6.png' alt='Online Tournaments' />
                    </Link>
                </div>
            }
        </div>
    )
}
