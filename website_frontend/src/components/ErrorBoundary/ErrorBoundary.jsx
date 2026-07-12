import React from "react";

// Catches any runtime error in the component tree so users see a styled
// recovery screen instead of a permanent white page. Chunk-load failures
// (stale cached JS after a deploy) trigger one automatic reload before
// falling back to the manual screen.
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        const isChunkError =
            error?.name === "ChunkLoadError" ||
            /Loading( CSS)? chunk/i.test(error?.message || "");

        if (isChunkError && !sessionStorage.getItem("usync-chunk-reload")) {
            sessionStorage.setItem("usync-chunk-reload", "1");
            window.location.reload();
            return;
        }

        console.error("uSync app error:", error, info?.componentStack);
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#15131a",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "2rem",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
            >
                <h1 style={{ color: "white", fontWeight: 800, marginBottom: ".75rem" }}>
                    Something went wrong
                </h1>
                <p style={{ color: "rgb(170, 166, 178)", maxWidth: "28rem", marginBottom: "1.5rem" }}>
                    An unexpected error stopped the page from loading. Reloading usually fixes it.
                </p>
                <button
                    onClick={() => {
                        sessionStorage.removeItem("usync-chunk-reload");
                        window.location.reload();
                    }}
                    style={{
                        color: "white",
                        background: "transparent",
                        border: "2px solid rgb(142, 106, 206)",
                        borderRadius: "18px",
                        padding: "10px 40px",
                        fontSize: "18px",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    Reload Page
                </button>
            </div>
        );
    }
}
