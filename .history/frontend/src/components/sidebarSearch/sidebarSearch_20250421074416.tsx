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

  useEffect(() => {
    fetchAllRecords();
  }, []);

  async function fetchAllRecords() {
    try {
      const response = await fetch("http://localhost:3000/api/maintenance");
      const data = await response.json();
      console.log("Fetched all on load:", data);

      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error("Failed to fetch records on load", err);
    }
  }

  async function handleSearchChangeAndFetch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newSearch = e.target.value;
    setSearch(newSearch);

    try {
      if (newSearch === "") {
        fetchAllRecords();
      } else {
        const response = await fetch(
          `http://localhost:3000/api/maintenance/carpart/${newSearch}`
        );
        const data = await response.json();
        console.log("Fetched single record:", data);

        if (data && typeof data === "object" && !Array.isArray(data)) {
          setRecords([data]);
        } else {
          setRecords([]);
        }
      }
    } catch (error) {
      console.error("Search fetch error:", error);
      setRecords([]);
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
        {records.length > 0 &&
          records.slice(0, 10).map((record, index) => (
            <li key={index} className="record-item">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <strong>{record.carPart}</strong> —{" "}
                  {record.lastChanged ? record.lastChanged.slice(0, 10) : "N/A"}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(record.carPart)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
  
        {records.length === 0 && (
          <li className="record-item">No records found.</li>
        )}
      </ul>
    </aside>
  );
  
}
