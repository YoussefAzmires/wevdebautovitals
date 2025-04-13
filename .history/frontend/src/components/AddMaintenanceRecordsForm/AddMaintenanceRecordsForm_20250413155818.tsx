import { JSX } from 'react';
import './AddMaintenanceRecordsForm.css'



export default function AddMaintenanceRecordsForm() : JSX.Element {
    return (
      <form>
        <h2>Add a Maintenance Record</h2>
        <input type="text"  placeholder="Car part Eg (Tires, Oil, Battery, etc.)" />
        <br />
        <input type="date" />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
  