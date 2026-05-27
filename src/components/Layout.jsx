import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="floating-hearts" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        Fatto con il cuore, speranza e la voglia di vederti sorridere
      </footer>
    </div>
  );
}

export default Layout;
