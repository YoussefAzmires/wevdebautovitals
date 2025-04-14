import './App.css'
import AddMaintenanceRecordsForm from './components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddMaintenanceRecordsForm />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
