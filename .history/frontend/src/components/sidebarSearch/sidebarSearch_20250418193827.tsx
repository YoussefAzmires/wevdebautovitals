import { useState, useEffect } from "react";
import "./sidebarSearch.css";

interface MaintenanceRecord {
  carPart: string;
  lastChanged: string;
  nextChange?: string;
  mileage: number;
}

export default function SidebarSearch() {
  const [search, setSearch] = useState("");
  const [allRecords, setAllRecords] = useState<MaintenanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    async function fetchAllRecords() {
      try {
        const response = await fetch("http://localhost:3000/api/maintenance");
        const data = await response.json();
        setAllRecords(data);
        setFilteredRecords(data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    }
    fetchAllRecords();
  }, []);

  function handleSearchChangeAndFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = e.target.value;
    setSearch(newSearch);

    const filtered = allRecords.filter(record =>
      record.carPart.toLowerCase().includes(newSearch.toLowerCase())
    );

    setFilteredRecords(filtered);
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
          onChange={handleSearchChangeAndFilter}
        />
        <button className="search-button">Search</button>
      </div>

      <nav className="sidebar-links">
        <a href="/add">➕ Add Record</a>
        <a href="#">📋 View All</a>
        <a href="#">⚙️ Settings</a>
      </nav>

      <ul className="record-list">
        {filteredRecords.map((record, index) => (
          <li key={index} className="record-item">
            <strong>{record.carPart}</strong><br />
            Changed: {record.lastChanged.slice(0, 10)}<br />
            Mileage: {record.mileage} km
          </li>
        ))}
      </ul>
    </aside>
  );
}
