import { NavLink } from "react-router-dom";

/**
 * Renders a button component wrapped in a `NavLink` for navigation.
 * @returns {JSX.Element} The rendered `NavLink` containing a button with a label.
 */
export function NavButton(props: any) {
    const pStyle: React.CSSProperties = {
        margin: 0
    };

    return (
      <NavLink to={props.to}>
        <button>
          <p style={pStyle}>{props.label}</p>
        </button>
      </NavLink>
    );
  }