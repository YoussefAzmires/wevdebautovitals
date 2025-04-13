import { JSX } from 'react';
import 'frontend/src/components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm.css'

export default function AddMaintenanceRecordsForm() : JSX.Element {
    return (
      <form>
        <h2>Add Maintenance Record</h2>
        <input type="text" placeholder="Car part" />
        <br />
        <input type="date" />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
  