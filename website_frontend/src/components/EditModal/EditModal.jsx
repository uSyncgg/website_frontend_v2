import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './EditModal.module.css';

/**
 * The popup the profile page edits in (linked accounts, about, games): a title and hint, the
 * form fields as children, an error line and Cancel/Save. Escape or clicking outside closes it.
 * `onSubmit` runs on Save. `disabled` greys Save out (e.g. nothing to save yet).
 */
export const EditModal = ({ title, hint, onClose, onSubmit, saving, disabled = false, error, children }) => {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const submit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return createPortal(
        <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <form className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="edit-modal-title" onSubmit={submit}>
                <h2 id="edit-modal-title" className={styles.title}>{title}</h2>
                {hint && <p className={styles.hint}>{hint}</p>}

                {children}

                {error && <p className={styles.error} role="alert">{error}</p>}

                <div className={styles.actions}>
                    <button type="button" className={styles.cancel} onClick={onClose}>Cancel</button>
                    <button type="submit" className={styles.save} disabled={saving || disabled}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </div>,
        document.body
    );
};
