import { useState } from 'react';
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

  function handleSubmit(e: React.FormEvent) {
    console.log({ carPart, lastChanged, nextChange, mileage });

    // Later you'll send this to the backend
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
