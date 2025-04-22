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
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllRecords();
  }, []);

  async function fetchAllRecords() {
    try {
      const response = await fetch("http://localhost:3000/api/maintenance");
      const data = await response.json();
      if (Array.isArray(data)) {
        setRecords(data);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
  }

  async function handleDelete(carPart: string) {
    const res = await fetch(`http://localhost:3000/api/maintenance/carpart/${carPart}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchAllRecords();
    } else {
      console.error("Delete failed");
    }
  }

  async function handleSearchChangeAndFetch(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = e.target.value;
    setSearch(newSearch);

    try {
      if (newSearch === "") {
        fetchAllRecords();
      } else {
        const response = await fetch(`http://localhost:3000/api/maintenance/carpart/${newSearch}`);
        const data = await response.json();
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

  let modal = null;

if (selectedRecord) {
  const handleFieldChange = (field: keyof MaintenanceRecord, value: string | number) => {
    setSelectedRecord(prev =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  async function handleSave() {
    try {
      const response = await fetch(`http://localhost:3000/api/maintenance/carpart/${selectedRecord.carPart}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRecord),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("✅ Record updated!");
      setIsEditing(false);
      setSelectedRecord(null);
      fetchAllRecords(); // refresh sidebar list
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Update failed.");
    }
  }

  modal = (
    <div className="modal-overlay" onClick={() => {
      setIsEditing(false);
      setSelectedRecord(null);
    }}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <>
            <input
              value={selectedRecord.carPart}
              onChange={(e) => handleFieldChange("carPart", e.target.value)}
            />
            <input
              type="date"
              value={selectedRecord.lastChanged.slice(0, 10)}
              onChange={(e) => handleFieldChange("lastChanged", e.target.value)}
            />
            <input
              type="date"
              value={selectedRecord.nextChange?.slice(0, 10) || ""}
              onChange={(e) => handleFieldChange("nextChange", e.target.value)}
            />
            <input
              type="number"
              value={selectedRecord.mileage}
              onChange={(e) => handleFieldChange("mileage", parseInt(e.target.value))}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{selectedRecord.carPart}</h2>
            <p>Last Changed: {selectedRecord.lastChanged.slice(0, 10)}</p>
            <p>Next Change: {selectedRecord.nextChange?.slice(0, 10) || "N/A"}</p>
            <p>Mileage: {selectedRecord.mileage} km</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setSelectedRecord(null)}>Close</button>
          </>
        )}
      </div>
    </div>
  );
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
      </nav>

      <ul className="records-list">
        {records.length > 0 ? (
          records.slice(0, 10).map((record, index) => (
            <li key={index} className="record-item">
              <div
                onClick={() => setSelectedRecord(record)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>
                  <strong>{record.carPart}</strong> —{" "}
                  {record.lastChanged ? record.lastChanged.slice(0, 10) : "N/A"}
                </span>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(record.carPart);
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="record-item">No records found.</li>
        )}
      </ul>

      {modal}
    </aside>
  );
}
