import { Link } from "react-router";
import styles from './Navbar.module.css'
import { LeaguesNavItem, LanNavItem, MoreNavItem } from "./DropdownNavItems";
import { GamesNavItem, TournamentNavItem} from "./SingleNavItems";
import { useState } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
        setActiveDropdown(null);
    }

    const handleDropdownToggle = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }

    return (
        <header className={styles.header}>
            <button className={styles.hamburger} onClick={toggleMenu} />
            <div className={styles.headerLeft}>
                <Link to="/" onClick={closeMenu}>
                    <img src="https://i.imgur.com/F5lNU1H.png" alt="uSync Logo" />
                </Link>
            </div>

            

            <nav className={`${styles.headerMiddle} ${menuOpen ? styles.menuOpen : ''}`}>
                <div className={styles.menu}>
                    <Link to="/" className={styles.navLink} onClick={closeMenu}>
                        Home
                    </Link>
                    
                    <GamesNavItem closeMenu={closeMenu}/>
                    <LeaguesNavItem 
                        closeMenu={closeMenu} 
                        isOpen={activeDropdown === 'leagues'} 
                        onToggle = {() => handleDropdownToggle('leagues')} 
                    />

                    <LanNavItem 
                        closeMenu={closeMenu} 
                        isOpen={activeDropdown === 'lans'} 
                        onToggle = {() => handleDropdownToggle('lans')} 
                    />

                    <TournamentNavItem closeMenu={closeMenu}/>
                    <MoreNavItem 
                        closeMenu={closeMenu} 
                        isOpen={activeDropdown === 'more'} 
                        onToggle = {() => handleDropdownToggle('more')}
                    />
                </div>
            </nav>

            <div className={`${styles.headerRight} ${menuOpen ? styles.menuOpen : ''}`}>
                <Link to="/games" className={styles.regButton} onClick={closeMenu}>Register</Link>
                <Link to="/tournaments" className={styles.logButton} onClick={closeMenu}>Login</Link>
            </div>
        </header>
    )
}

export default Navbar;
