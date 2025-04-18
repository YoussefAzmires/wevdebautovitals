import { useState } from "react";
import "./sidebarSearch.css";

export default function SidebarSearch() {
  async function handleSearchChangeAndFetch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    try {
      const response = await fetch(
        `http://localhost:3000/api/maintenance?carPart=${search}`
      );
      console.log("sent request to backend");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const [search, setSearch] = useState("");
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🔧 Maintenance Records</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search a car part..."
          className="search-input"
          onChange={handleSearchChangeAndFetch}
        />
        <button className="search-button">Search</button>
      </div>

      <nav className="sidebar-links">
        <a href="/add">➕ Add Record</a>
        <a href="#">📋 View All</a>
        <a href="#">⚙️ Settings</a>
      </nav>
    </aside>
  );
}