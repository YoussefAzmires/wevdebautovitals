import { JSX } from 'react';

export default function AddMaintenanceRecordsForm() : JSX.Element {
    return (
      <form>
        <h2>Add Maintenance Record</h2>
        <input type="text" placeholder="Car part" />
        <input type="date" />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
  