import './App.css'
import AddMaintenanceRecordsForm from "./components/AddMaintenanceRecordsForm/AddMaintenanceRecordsForm";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/add">
        <AddMaintenanceRecordsForm />
      </Route>
    </Routes>
  );
}


export default App

