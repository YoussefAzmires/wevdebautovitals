import './App.css'
import AddMaintenanceRecordsForm from "./components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm";
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/add" element={<AddMaintenanceRecordsForm />} />
    </Routes>
  );
}


export default App
