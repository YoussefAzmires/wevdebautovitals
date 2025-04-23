import { JSX } from "react";

/**
 * Footer component that displays the copyright information.
 * @returns {JSX.Element} The rendered JSX for the footer section.
 */
export function Footer(): JSX.Element {
    const footerStyle: React.CSSProperties = {
        padding: "20px 0",
        textAlign: "center",
        fontSize: "14px",
        marginTop: "40px"
    };
    
    return (
        <footer style={footerStyle}>
            <p>Copyrights © AutoVitals</p>
        </footer>
    )
}