import { useState } from 'react';
import { JSX } from 'react';
import './AddMaintenanceRecordsForm.css';

export default function AddMaintenanceRecordsForm(): JSX.Element {
  const [carPart, setCarPart] = useState('');
  const [lastChanged, setLastChanged] = useState('');
  const [nextChange, setNextChange] = useState('');
  const [mileage, setMileage] = useState('');

  /**
   * Handles the change event of the car part input field.
   * Updates the local state with the new value of the input field.
   * @param e The change event of the input field.
   */
  function handleCarPartChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCarPart(e.target.value);
  }


  /**
   * Handles the change event of the last changed input field.
   * Updates the local state with the new value of the input field.
   * @param e The change event of the input field.
   */
/*******  323748f2-0142-4e34-9e31-524b550620e7  *******/
  function handleLastChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setLastChanged(e.target.value);
  }


  /**
   * Handles the change event of the next change input field.
   * Updates the local state with the new value of the input field.
   * @param e The change event of the input field.
   */
  function handleNextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNextChange(e.target.value);
  }



  /**
   * Handles the change event of the mileage input field.
   * Updates the local state with the new value of the input field.
   * @param e The change event of the input field.
   */
  
  /**
   * Handles the change event of the mileage input field.
   * Updates the local state with the new value of the input field.
   * @param e The change event of the input field.
   */
  function handleMileageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMileage(e.target.value);
  }



  /**
   * Handles the submission of the form by sending a POST request to the backend.
   * Expects the form to contain the following fields: carPart, lastChanged, nextChange, and mileage.
   * If any of the fields are empty, prevents the form from being submitted and displays an alert.
   * If the request is successful, resets the form and redirects to the search page.
   * If the request fails, displays an alert with an error message.
   * @param e The form event.
   */
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
  
    console.log("🧾 Record being sent:", record);
  
    try {
      const response = await fetch('http://localhost:3000/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
  
      console.log("📡 Sent request to backend");
  
      const data = await response.json();
      console.log("✅ Backend response:", data);
      alert('Maintenance record saved successfully!');
  
      // Reset form
      setCarPart('');
      setLastChanged('');
      setNextChange('');
      setMileage('');
      window.location.href = '/search';
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
