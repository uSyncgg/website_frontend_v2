import { Link } from "react-router";

export const NotFound = () => {
    return (
        <div className="standardContainer" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "60vh",
            padding: "6rem 1.5rem",
        }}>
            <title>uSync | Page Not Found</title>
            <h1 style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-1px",
                textTransform: "uppercase",
                lineHeight: 1.1,
                margin: 0,
                marginBottom: "1.5rem",
            }}>
                <span style={{ color: "white" }}>404 </span>
                <span style={{
                    background: "linear-gradient(90deg, #8e6ace 0%, #a97fe0 45%, #6a8fe0 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                }}>
                    Not Found
                </span>
            </h1>
            <p style={{ color: "rgb(170, 166, 178)", maxWidth: "28rem", fontSize: "1.1rem" }}>
                The page you are looking for does not exist.{" "}
                <Link to="/" style={{ color: "rgb(142, 106, 206)", fontWeight: 700, textDecoration: "underline" }}>
                    Click here
                </Link>
                {" "}to return to the home page.
            </p>
        </div>
    );
}
