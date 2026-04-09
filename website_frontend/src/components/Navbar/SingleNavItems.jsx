import { NavLink, useMatch } from "react-router";
import styles from './Navbar.module.css'

export const GamesNavItem = () => {
  const gamesMatch = useMatch("/games");
  const specificGameMatch = useMatch("/games/:game/*");
  const lansMatch = useMatch("/games/:game/lans/*");
  const leaguesMatch = useMatch("/games/:game/leagues/*");

  const isActive = (gamesMatch || specificGameMatch) && !lansMatch && !leaguesMatch;

  return (
    <div className={styles.navItem}>
      <NavLink to="/games" className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`}>
        Games
      </NavLink>
    </div>
  );
}

export const TournamentNavItem = () => {
  const tourneyMatch = useMatch("/tournaments");
  const generalMatch = useMatch("/tournaments/*");

  const isActive = tourneyMatch || generalMatch;

  return (
    <div className={styles.navItem}>
      <NavLink to="/tournaments" className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`}>
        Tournaments
      </NavLink>
    </div>
  );
}

