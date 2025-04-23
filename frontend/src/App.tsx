import './App.css'
import AddMaintenanceRecordsForm from './components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm';
import SidebarSearch from './components/sidebarSearch/SidebarSearch';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="add" element={<AddMaintenanceRecordsForm />} />
          <Route path="search" element={<SidebarSearch />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App
