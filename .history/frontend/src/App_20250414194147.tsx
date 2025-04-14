import './App.css'
import AddMaintenanceRecordsForm from './components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/add" element={<AddMaintenanceRecordsForm />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
export default App
