import { JSX } from "react";
import { NavButton } from "../navbutton/navbutton";

/**
 * Header component that displays the site's title and navigation links.
 * 
 * @returns {JSX.Element} The rendered JSX for the header section with navigation buttons.
 */
export function Header(): JSX.Element {
    const headerStyle: React.CSSProperties = {
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    };

    const navStyle: React.CSSProperties = {
        display: "flex",
        gap: "15px",
    };

    return (
        <header style={headerStyle}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>AutoVitals</div>
            <nav style={navStyle}>
                <NavButton to="/" label="Home"/>
                <NavButton to="/add" label="Create Maintenance"/>
                <NavButton to="search" label="Maintenance Records"/>
            </nav>
        </header>
    )
}