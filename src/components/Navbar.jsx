import { NavLink } from "react-router-dom";
import { navItems } from "../data/siteContent";

function Navbar() {
  const linkClassName = ({ isActive }) =>
    `nav-link ${isActive ? "is-active" : ""}`;

  return (
    <>
      <header className="top-nav">
        <div className="brand-lockup">
          <span className="brand-title">Il nostro piccolo mondo</span>
        </div>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          {navItems.map((item) => (
            <NavLink key={item.path} className={linkClassName} end={item.path === "/"} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <nav className="mobile-tabbar" aria-label="Navigazione mobile">
        {navItems.map((item) => (
          <NavLink
            key={`mobile-${item.path}`}
            className={linkClassName}
            end={item.path === "/"}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
