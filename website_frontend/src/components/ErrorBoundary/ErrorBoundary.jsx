import React from "react";
import styles from './ErrorBoundary.module.css';

// Catches JavaScript errors thrown while rendering the tree below it and shows a
// fallback UI instead of letting the whole app unmount (which leaves a blank
// white screen). Error boundaries must be class components.
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log so the error still surfaces in the console / analytics for debugging.
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Allow callers to supply their own fallback (e.g. a small one around a map).
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className={styles.container}>
                    <h1 className={styles.heading}>Something went wrong</h1>
                    <p className={styles.text}>
                        This page ran into a problem while loading. Try reloading — if it
                        keeps happening, please let us know.
                    </p>
                    <button className={styles.button} onClick={this.handleReload}>
                        Reload page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
