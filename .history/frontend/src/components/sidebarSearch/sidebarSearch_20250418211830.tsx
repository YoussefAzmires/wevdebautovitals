import { useState, useEffect } from "react";
import "./sidebarSearch.css";

interface MaintenanceRecord {
  carPart: string;
  lastChanged: string;
  nextChange?: string | null;
  mileage: number;
}

export default function SidebarSearch() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  // Fetch all records on load
  useEffect(() => {
    fetchAllRecords();
  }, []);

  async function fetchAllRecords() {
    try {
      const response = await fetch("http://localhost:3000/api/maintenance");
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.error("❌ Failed to fetch all records", err);
    }
  }

  async function handleSearchChangeAndFetch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newSearch = e.target.value;
    setSearch(newSearch);

    try {
      if (newSearch === "") {
        await fetchAllRecords(); // ← reuse the clean function
      } else {
        const response = await fetch(
          `http://localhost:3000/api/maintenance/carpart/${newSearch}`
        );
        const data = await response.json();
        setRecords(data ? [data] : []); // ← single match or empty
      }
    } catch (error) {
      console.error("❌ Search fetch failed", error);
    }
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🔧 Maintenance Records</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search a car part..."
          className="search-input"
          value={search}
          onChange={handleSearchChangeAndFetch}
        />
        <button className="search-button">Search</button>
      </div>

      <nav className="sidebar-links">
        <a href="/add">➕ Add Record</a>
        <a href="#">📋 View All</a>
        <a href="#">⚙️ Settings</a>
      </nav>

      <ul className="records-list">
        {records.length > 0 ? (
          records.map((record, index) => (
            <li key={index} className="record-item">
              <strong>{record.carPart}</strong> — {record.lastChanged.slice(0, 10)}
            </li>
          ))
        ) : (
          <li className="record-item">No records found.</li>
        )}
      </ul>
    </aside>
  );
}
