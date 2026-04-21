import { NavLink, useMatch } from "react-router";
import styles from './Navbar.module.css'

export const GamesNavItem = ({ closeMenu }) => {
  const gamesMatch = useMatch("/games");
  const specificGameMatch = useMatch("/games/:game/*");
  const lansMatch = useMatch("/games/:game/lans/*");
  const leaguesMatch = useMatch("/games/:game/leagues/*");

  const isActive = (gamesMatch || specificGameMatch) && !lansMatch && !leaguesMatch;

  const handleClick = (e) => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  }

  return (
    <div className={styles.navItem}>
      <NavLink to="/games" className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`} onClick={handleClick}>
        Games
      </NavLink>
    </div>
  );
}

export const TournamentNavItem = ({ closeMenu }) => {
  const tourneyMatch = useMatch("/tournaments");
  const generalMatch = useMatch("/tournaments/*");

  const isActive = tourneyMatch || generalMatch;

  const handleClick = (e) => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  }

  return (
    <div className={styles.navItem}>
      <NavLink to="/tournaments" className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`} onClick={handleClick}>
        Tournaments
      </NavLink>
    </div>
  );
}

