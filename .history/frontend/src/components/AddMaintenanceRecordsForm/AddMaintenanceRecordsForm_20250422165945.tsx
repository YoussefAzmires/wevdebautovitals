import { useState } from 'react';
import { JSX } from 'react';
import './AddMaintenanceRecordsForm.css';

export default function AddMaintenanceRecordsForm(): JSX.Element {
  const [carPart, setCarPart] = useState('');
  const [lastChanged, setLastChanged] = useState('');
  const [nextChange, setNextChange] = useState('');
  const [mileage, setMileage] = useState('');

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
      alert('Please fill out all fields');
      return;
    }
  
    const record = {
      carPart,
      lastChanged,
      nextChange: nextChange || null,
      mileage: Number(mileage)
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
    
      console.log("📡 Sent request to backend");
    
      if (!response.ok) {
        throw new Error("Response not OK");
      }
    
      // If you're unsure what the server sends, use text() instead of json()
      const responseText = await response.text();
      console.log("✅ Backend response:", responseText);
    
      alert('Maintenance record saved successfully!');
    
      // Reset form
      setCarPart('');
      setLastChanged('');
      setNextChange('');
      setMileage('');
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert('Failed to save maintenance record.');
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
