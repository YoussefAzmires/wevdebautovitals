import { JSX } from 'react';
import './AddMaintenanceRecordsForm.css'



export default function AddMaintenanceRecordsForm(): JSX.Element {
  return (
    <form>
      <h2>Add a Maintenance Record</h2>

      <div className="form-row">
        <label htmlFor="carPart">Car Part</label>
        <input id="carPart" type="text" placeholder="E.g., Tires, Oil, Battery" />
      </div>

      <div className="form-row">
        <label htmlFor="lastChanged">Date Changed</label>
        <input id="lastChanged" type="date" />
      </div>

      <div className="form-row">
        <label htmlFor="nextChange">Next Change (optional)</label>
        <input id="nextChange" type="date" />
      </div>

      <div className="form-row">
        <label htmlFor="mileage">Current Mileage</label>
        <input id="mileage" type="number" placeholder="Enter mileage in KM" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
