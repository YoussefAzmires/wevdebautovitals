import { useState } from "react";
import { JSX } from "react";
import "./AddMaintenanceRecordsForm.css";

export default function AddMaintenanceRecordsForm(): JSX.Element {
  const [carPart, setCarPart] = useState("");
  const [lastChanged, setLastChanged] = useState("");
  const [nextChange, setNextChange] = useState("");
  const [mileage, setMileage] = useState("");

  function handleCarPartChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCarPart(e.target.value);
  }

  function handleLastChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setLastChanged(e.target.value);
  }

  function handleNextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNextChange(e.target.value);
  }

  function handleMileageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMileage(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("🚀 Form is being submitted");

    if (!carPart || !lastChanged || !mileage) {
      alert("Please fill out all fields");
      return;
    }

    const record = {
      carPart,
      lastChanged,
      nextChange: nextChange || null,
      mileage: Number(mileage),
    };

    console.log("🧾 Record being sent:", record);

    try {
      const response = await fetch("http://localhost:3000/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      console.log("📡 Request sent");

      const contentType = response.headers.get("content-type");
      console.log("📦 Response Content-Type:", contentType);

      const rawText = await response.text();
      console.log("📄 Raw response text:", rawText);

      if (!response.ok) {
        console.error("❌ Response not OK:", response.status);
        alert("Something went wrong.");
        return;
      }

      alert("✅ Maintenance record saved successfully!");

      setCarPart("");
      setLastChanged("");
      setNextChange("");
      setMileage("");

      console.log("🧼 Fields reset");
    } catch (err) {
      console.error("❌ Fetch error caught:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Maintenance Record</h2>

      <div className="form-row">
        <label htmlFor="carPart">Car Part</label>
        <input
          id="carPart"
          type="text"
          placeholder="E.g., Tires, Oil, Battery"
          value={carPart}
          onChange={handleCarPartChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="lastChanged">Date Changed</label>
        <input
          id="lastChanged"
          type="date"
          value={lastChanged}
          onChange={handleLastChanged}
        />
      </div>

      <div className="form-row">
        <label htmlFor="nextChange">Next Change (optional)</label>
        <input
          id="nextChange"
          type="date"
          value={nextChange}
          onChange={handleNextChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="mileage">Current Mileage</label>
        <input
          id="mileage"
          type="number"
          placeholder="Enter mileage in KM"
          value={mileage}
          onChange={handleMileageChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
