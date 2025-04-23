import { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";

/**
 * Main layout component that includes the header, main content, and footer.
 * 
 * @returns {JSX.Element} The rendered layout of the page, including header, content, and footer.
 */
export function MainLayout(): JSX.Element {
  const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
  }; 
  
  return (
    <div style={layoutStyle}>
      <Header />
      <main style={contentStyle}>
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}   
