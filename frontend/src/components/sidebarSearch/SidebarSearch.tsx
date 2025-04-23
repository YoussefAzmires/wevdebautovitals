import { useState, useEffect } from "react";
import "./sidebarSearch.css";

interface MaintenanceRecord {
  carPart: string;
  lastChanged: string;
  nextChange?: string | null;
  mileage: number;
}

/**
 * A sidebar component for searching and viewing maintenance records.
 *
 * This component displays a list of up to 10 maintenance records that match
 * the search query. It also displays a search input field and a button to
 * add a new record. When a record is selected, it displays the record's details
 * in a modal window with options to edit or delete the record.
 *
**/

/**
 * A sidebar component for searching and viewing maintenance records.
 *
 * This component displays a list of up to 10 maintenance records that match
 * the search query. It also displays a search input field and a button to
 * add a new record. When a record is selected, it displays the record's details
 * in a modal window with options to edit or delete the record.
 */

/**
 * A sidebar component for searching and viewing maintenance records.
 *
 * This component displays a list of up to 10 maintenance records that match
 * the search query. It also displays a search input field and a button to
 * add a new record. When a record is selected, it displays the record's details
 * in a modal window with options to edit or delete the record.
 */
export default function SidebarSearch() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord & { _id?: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalCarPart, setOriginalCarPart] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRecords();
  }, []);


  /**
   * Fetches all maintenance records from the server and updates the component
   * state with the received records.
   *
   * If the request fails, it logs an error message to the console.
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
 * Deletes a maintenance record for the specified car part.
 *
 * @param carPart - The car part identifier of the record to delete.
 *
 * @remarks
 * Sends a DELETE request to the server to remove the maintenance record
 * associated with the given car part. If the deletion is successful, it
 * refreshes the list of records by calling `fetchAllRecords()`. If the 
 * deletion fails, it logs an error message to the console.
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
   * Handles the change event of the search input field by updating the component
   * state with the new search query and fetching the matching records from the
   * server. If the search query is empty, it fetches all records. Otherwise, it
   * fetches the record associated with the given car part. If the request fails,
   * it logs an error message to the console.
   * @param e The change event of the input field.
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
     * Handles a change event of a field in the selected record by updating the
     * local component state with the new value.
     * @param field The field of the record to update.
     * @param value The new value of the field.
     */
    const handleFieldChange = (field: keyof MaintenanceRecord, value: string | number) => {
      setSelectedRecord(prev =>
        prev ? { ...prev, [field]: value } : null
      );
    };

    /**
     * Handles the save button click event of the edit modal.
     *
     * This function is called when the save button is clicked in the edit modal.
     * It sends a PUT request to the backend to update the selected record.
     * If the request is successful, it displays a success alert and resets the
     * state of the component.
     * If the request fails, it displays an error alert.
     * @throws {Error} If the request fails, either due to a MongoDB error or an unknown error.
     */
    async function handleSave() {
      try {
        if (!originalCarPart) {
          alert("Original car part not set!");
          return;
        }

        const { _id, ...recordToUpdate } = selectedRecord as (MaintenanceRecord & { _id: string });

        const response = await fetch(`http://localhost:3000/api/maintenance/carpart/${originalCarPart}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recordToUpdate),
        });

        if (!response.ok) throw new Error("Update failed");

        alert("✅ Record updated!");
        setIsEditing(false);
        setSelectedRecord(null);
        setOriginalCarPart(null);
        fetchAllRecords();
      } catch (err) {
        console.error("❌ Update failed:", err);
        alert("Update failed.");
      }
    }

    modal = (
      <div className="modal-overlay" onClick={() => {
        setIsEditing(false);
        setSelectedRecord(null);
        setOriginalCarPart(null);
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
              <button onClick={() => {
                setSelectedRecord(null);
                setOriginalCarPart(null);
              }}>Close</button>
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
                onClick={() => {
                  setSelectedRecord(record);
                  setOriginalCarPart(record.carPart);
                }}
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
