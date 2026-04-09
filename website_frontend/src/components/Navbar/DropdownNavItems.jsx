import { NavLink, useMatch } from "react-router";
import styles from '../Navbar/Navbar.module.css';

var temp = {
  'Leagues': 0,
  'LANs': 0
};

export const LeaguesNavItem = ({ closeMenu, isOpen, onToggle }) => {
  const leaguesMatch = useMatch("/leagues/*");
  const childMatch = useMatch("/games/:game/leagues/*");

  const isActive = leaguesMatch || childMatch;

  const handleClick = (e) => {
    if (window.innerWidth <= 768 && temp['Leagues'] === 0) {
      e.preventDefault();
      onToggle();
      temp['Leagues'] += 1;
      temp['LANs'] = 0;
    } else {
      closeMenu();
      temp['Leagues'] = 0;
      temp['LANs'] = 0;
    }
  }

  return (
    <div className={styles.navItem}>
      <NavLink 
        to="/leagues" 
        className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`}
        onClick={handleClick}
      >
        Leagues ▾
      </NavLink>

      <div className={`${styles.dropdown} ${isOpen ? styles.activeDropdown : styles.disabledDropdown}`}>
        <NavLink to="/games/call-of-duty/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Call of Duty
        </NavLink>
        <NavLink to="/games/warzone/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Warzone
        </NavLink>
        <NavLink to="/games/halo/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Halo
        </NavLink>
        <NavLink to="/games/LoL/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          League of Legends
        </NavLink>
        <NavLink to="/games/RocketLeague/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Rocket League
        </NavLink>
        <NavLink to="/games/Valorant/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Valorant
        </NavLink>
        <NavLink to="/games/CS2/leagues" className={styles.dropdownItem} onClick={closeMenu}>
          Counter-Strike 2
        </NavLink>
      </div>
    </div>
  );
}

export const LanNavItem = ({ closeMenu, isOpen, onToggle }) => {
  const lansMatch = useMatch("/lans/*");
  const childMatch = useMatch("/games/:game/lans");
  const otherMatch = useMatch("/other-lans");

  const isActive = lansMatch || childMatch || otherMatch;

  const handleClick = (e) => {
    if (window.innerWidth <= 768 && temp['LANs'] === 0) {
      e.preventDefault();
      onToggle();
      temp['LANs'] += 1;
      temp['Leagues'] = 0;
    } else {
      closeMenu();
      temp['Leagues'] = 0;
      temp['LANs'] = 0;
    }
  }

  return (
    <div className={styles.navItem}>
      <NavLink 
        to="/lans" 
        className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`}
        onClick={handleClick}
      >
        LANs ▾
      </NavLink>

      <div className={`${styles.dropdown} ${isOpen ? styles.activeDropdown : styles.disabledDropdown}`}>
        <NavLink to="/games/call-of-duty/lans" className={styles.dropdownItem} onClick={closeMenu}>
          Call of Duty
        </NavLink>
        <NavLink to="/games/warzone/lans" className={styles.dropdownItem} onClick={closeMenu}>
          Warzone
        </NavLink>
        <NavLink to="/games/halo/lans" className={styles.dropdownItem} onClick={closeMenu}>
          Halo
        </NavLink>
        <NavLink to="/games/LoL/lans" className={styles.dropdownItem} onClick={closeMenu}>
          League of Legends
        </NavLink>
        <NavLink to="/other-lans" className={styles.dropdownItem} onClick={closeMenu}>
          Other / Conventions
        </NavLink>
      </div>
    </div>
  );
}

export const MoreNavItem = ({ closeMenu, isOpen, onToggle }) => {
  const moreMatch = useMatch("/more/*");

  const isActive = moreMatch;

  const handleClick = (e) => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      e.preventDefault();
      onToggle();
    } else {
      closeMenu();
    }
  }

  return (
    <div className={styles.navItem}>
      <NavLink 
        to="#" 
        className={`${styles.navLink} ${isActive ? styles.activeParent : ''}`}
        onClick={handleClick}
      >
        More ▾
      </NavLink>

      <div className={`${styles.dropdown} ${isOpen ? styles.activeDropdown : styles.disabledDropdown}`}>
        <NavLink to="/more/verification" className={styles.dropdownItem} onClick={closeMenu}>
          Verification
        </NavLink>
        <NavLink to="/more/eventhost" className={styles.dropdownItem} onClick={closeMenu}>
          Post Your Event
        </NavLink>
        <NavLink to="/more/contactus" className={styles.dropdownItem} onClick={closeMenu}>
          Contact Us
        </NavLink>
        <NavLink to="/more/FAQ" className={styles.dropdownItem} onClick={closeMenu}>
          FAQs
        </NavLink>
        <NavLink to="/more/articles" className={styles.dropdownItem} onClick={closeMenu}>
          Articles
        </NavLink>
      </div>
    </div>
  );
}
