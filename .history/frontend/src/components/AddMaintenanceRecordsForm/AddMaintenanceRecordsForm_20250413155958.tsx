import { JSX } from 'react';
import './AddMaintenanceRecordsForm.css'



export default function AddMaintenanceRecordsForm(): JSX.Element {
  return (
    <form>
      <h2>Add a Maintenance Record</h2>

      <label htmlFor="carPart">Car Part</label>
      <input id="carPart" type="text" placeholder="E.g., Tires, Oil, Battery" />
      <br />

      <label htmlFor="lastChanged">Date Changed</label>
      <input id="lastChanged" type="date" />
      <br />

      <label htmlFor="nextChange">Next Change (optional)</label>
      <input id="nextChange" type="date" />
      <br />

      <label htmlFor="mileage">Current Mileage</label>
      <input id="mileage" type="number" placeholder="Enter mileage in KM" />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
