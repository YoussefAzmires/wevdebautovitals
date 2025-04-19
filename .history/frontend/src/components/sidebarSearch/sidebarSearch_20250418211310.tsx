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
    async function fetchRecords() {
      try {
        const response = await fetch("http://localhost:3000/api/maintenance");
        const data = await response.json();
        setRecords(data); // Set state with fetched records
      } catch (err) {
        console.error("Failed to fetch records", err);
      }
    }
  
    fetchRecords();
  }, []);
  
  async function handleSearchChangeAndFetch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newSearch = e.target.value;
    setSearch(newSearch);
    try {
      if (newSearch === "") {
        const response = await fetch(
          "http://localhost:3000/api/maintenance"
        );

        console.log("sent request to backend for get all maintenance records");
        const data = await response.json();
        console.log(data);
      }
      else{
      const response = await fetch(
        `http://localhost:3000/api/maintenance/carpart/${newSearch}`
      );

      console.log("sent request to backend");
      const data = await response.json();
      console.log(data);
    }
    } catch (error) {
      console.error(error);
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
        {records.map((record, index) => (
          <li key={index} className="record-item">
            <strong>{record.carPart}</strong> — {record.lastChanged.slice(0, 10)}
          </li>
        ))}
      </ul>
    </aside>
  );
}
