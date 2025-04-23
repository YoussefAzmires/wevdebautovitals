import { useState, useEffect } from "react";
import "./sidebarSearch.css";

interface MaintenanceRecord {
  carPart: string;
  lastChanged: string;
  nextChange?: string | null;
  mileage: number;
}
/**
 * A React component that renders a sidebar with a search bar and a list of
 * maintenance records. When a record is selected, it displays the record's
 * details and allows the user to edit or delete it. The component also
 * refreshes the record list when the user searches for a record or clicks
 * the "Add Record" button.
 *
 * @remarks
 * This component assumes that the server is running at
 * http://localhost:3000/api/maintenance and that it exposes the following
 * endpoints:
 *
 * - GET /maintenance: Returns a list of all maintenance records.
 * - GET /maintenance/carpart/:carPart: Returns a single maintenance record
 *   with the given car part.
 * - PUT /maintenance/carpart/:carPart: Updates the maintenance record with
 *   the given car part.
 * - DELETE /maintenance/carpart/:carPart: Deletes the maintenance record with
 *   the given car part.
 */
export default function SidebarSearch() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    //on load, displays all records in the search bar
    fetchAllRecords();
  }, []);

  /**
   * Fetches all records from the server and updates the state with the received records. If the response is not an array, it sets the state to an empty array.
   */
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
  /**
   * Deletes a maintenance record with the given car part and updates the state with the new list of records.
   * @param {string} carPart - The car part of the record to delete.
   */
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
/**
 * Handles changes in the search input field and fetches the corresponding maintenance records from the server.
 * If the search input is empty, it fetches all records. Otherwise, it fetches a specific record by the car part.
 * Updates the state with the received records. If an error occurs during the fetch, logs the error and clears the records.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the search input field.
 */

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
  /**
   * Updates the selected record with a new value for the given field.
   * If `selectedRecord` is null, this function does nothing.
   * @param field The name of the field to update, e.g. "carPart" or "mileage"
   * @param value The new value for the given field
   */
  const handleFieldChange = (field: keyof MaintenanceRecord, value: string | number) => {
    setSelectedRecord(prev =>
      prev ? { ...prev, [field]: value } : null
    );
  };
 
  /**
   * Saves the current `selectedRecord` to the server by PUTting a JSON
   * representation of it to the server. If the request is successful, it
   * refreshes the sidebar list and resets the selected record. If the
   * request fails, it displays an error message.
   */
  async function handleSave() {
    try {
      const response = await fetch(`http://localhost:3000/api/maintenance/carpart/${selectedRecord?.carPart}`, {
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
