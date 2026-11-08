import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import styles from "./SearchSelect.module.css";

// A dropdown you can type into to filter. options: [{ value, label, hint? }].
// Arrow keys move, Enter picks, Escape closes.
export const SearchSelect = ({ id, value, options, onChange, placeholder = 'Choose…', searchPlaceholder = 'Search', disabled = false }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const wrap = useRef(null);
    const search = useRef(null);
    const listId = useId();

    const selected = options.find(o => o.value === value);
    const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? options.filter(o => `${o.label} ${o.hint ?? ''}`.toLowerCase().includes(q)) : options;
    }, [options, query]);

    useEffect(() => {
        if (!open) return undefined;
        search.current?.focus();
        const outside = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', outside);
        return () => document.removeEventListener('mousedown', outside);
    }, [open]);

    useEffect(() => { setActive(0); }, [query]);

    const openList = () => {
        setQuery('');
        setActive(Math.max(0, options.findIndex(o => o.value === value)));
        setOpen(true);
    };

    const pick = (option) => {
        onChange(option.value);
        setOpen(false);
    };

    const onKey = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(shown.length - 1, i + 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => Math.max(0, i - 1)); }
        if (e.key === 'Enter') { e.preventDefault(); if (shown[active]) pick(shown[active]); }
        if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    };

    return (
        <div className={styles.wrap} ref={wrap}>
            <button id={id} type="button" className={styles.trigger} disabled={disabled}
                aria-haspopup="listbox" aria-expanded={open} onClick={() => (open ? setOpen(false) : openList())}>
                <span className={selected ? '' : styles.placeholder}>{selected?.label ?? placeholder}</span>
                {selected?.hint && <span className={styles.hint}>{selected.hint}</span>}
                <FaChevronDown className={styles.chevron} aria-hidden="true" />
            </button>
            {open &&
                <div className={styles.panel}>
                    <div className={styles.searchRow}>
                        <FaSearch aria-hidden="true" />
                        <input ref={search} className={styles.search} value={query} onChange={e => setQuery(e.target.value)}
                            onKeyDown={onKey} placeholder={searchPlaceholder} aria-label={searchPlaceholder}
                            role="combobox" aria-expanded="true" aria-controls={listId} aria-activedescendant={shown[active] ? `${listId}-${active}` : undefined} />
                    </div>
                    <ul id={listId} role="listbox" className={styles.list}>
                        {shown.length === 0 && <li className={styles.empty}>No matches</li>}
                        {shown.map((o, i) => (
                            <li key={o.value} id={`${listId}-${i}`} role="option" aria-selected={o.value === value}
                                className={`${styles.option} ${i === active ? styles.optionActive : ''} ${o.value === value ? styles.optionSelected : ''}`}
                                onMouseEnter={() => setActive(i)} onMouseDown={e => { e.preventDefault(); pick(o); }}>
                                <span>{o.label}</span>
                                {o.hint && <span className={styles.hint}>{o.hint}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};
