import './App.css'
import AddMaintenanceRecordsForm from "./components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/add" element={<AddMaintenanceRecordsForm />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}


export default App

