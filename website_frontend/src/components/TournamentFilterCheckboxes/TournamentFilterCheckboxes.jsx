import { CFormCheck } from "@coreui/react";
import { useState, useEffect, useRef } from "react";
import styles from './TournamentFilterCheckboxes.module.css';

function TournamentFilterCheckboxes ({ title, options, onChange, selectedOptions: externalSelectedOptions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(externalSelectedOptions || []);
    const dropdownRef = useRef(null);

    const [dropdownHeight, setDropdownHeight] = useState(0);
    const dropdownContentRef = useRef(null);

    // Sync with external state if provided
    useEffect(() => {
        if (externalSelectedOptions) {
        setSelectedOptions(externalSelectedOptions);
        }
    }, [externalSelectedOptions]);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Handle individual checkbox change
    const handleCheckboxChange = (option) => {
        let newSelectedOptions;
        
        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter(item => item !== option);
        } else {
            newSelectedOptions = [...selectedOptions, option];
        }
        
        setSelectedOptions(newSelectedOptions);
        
        // Call external onChange handler
        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    // Toggle all checkboxes
    const toggleAll = () => { 
        let newSelectedOptions;
        
        if (selectedOptions.length === options.length) {
        newSelectedOptions = [];
        } else {
        newSelectedOptions = [...options];
        }
        
        setSelectedOptions(newSelectedOptions);
        
        // Call external onChange handler
        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    useEffect(() => {
        if (isOpen && dropdownContentRef.current) {
            setTimeout(() => {
                if (dropdownContentRef.current) {
                const height = dropdownContentRef.current.scrollHeight;
                
                setDropdownHeight(prev => prev === 0 && height > 0 ? height : prev);
                }
            });
        } else {
            setDropdownHeight(0); 
        }
    }, [isOpen, options]);
    
    // Determine if main checkbox should be checked or indeterminate
    const isChecked = selectedOptions.length > 0;
    const isIndeterminate = selectedOptions.length > 0 && selectedOptions.length < options.length;
    // const dropdownHeightWithMargin = isOpen ? `${dropdownHeight}px` : '0';

    return (
        <div className={styles.checkboxContainer} ref={dropdownRef}>
            <div className={styles.mainContainer} onClick={toggleDropdown}>
                <CFormCheck
                    id={`mainCheckbox-${title}`}
                    checked={isChecked}
                    onChange={toggleAll}
                    indeterminate={isIndeterminate ? true : undefined}
                    onClick={(e) => e.stopPropagation()} />
                <span>{title} ▾ </span>
            </div>

            <div 
                className={styles.subContainer} 
                ref={dropdownContentRef} 
                style={{ 
                    '--opacity': isOpen ? 1 : 0, 
                    '--height': isOpen ? `${dropdownHeight}px` : 0
                }}
            >
                {options.map((option, index) => (
                    <div key={index} className={`${styles.dropdownItem} tourney-dropdown`}>
                        <CFormCheck
                        id={`${title}-option-${index}`}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        label={option}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default TournamentFilterCheckboxes;