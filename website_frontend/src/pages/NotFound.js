import { Link } from "react-router";

export const NotFound = () => {
    return (
        <div className="standardContainer" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "6rem 1.5rem",
        }}>
            <title>uSync | Page Not Found</title>
            <p style={{
                color: "rgb(142, 106, 206)",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontSize: ".85rem",
                marginBottom: ".5rem",
            }}>
                404
            </p>
            <h1 style={{ color: "white", fontWeight: 800, marginBottom: ".75rem" }}>
                Page Not Found
            </h1>
            <p style={{ color: "rgb(170, 166, 178)", maxWidth: "28rem", marginBottom: "1.5rem" }}>
                The page you're looking for doesn't exist or may have moved.
            </p>
            <Link to="/" style={{
                color: "white",
                textDecoration: "none",
                border: "2px solid rgb(142, 106, 206)",
                borderRadius: "18px",
                padding: "10px 40px",
                fontSize: "18px",
                fontWeight: 700,
            }}>
                Back to Home
            </Link>
        </div>
    );
}
