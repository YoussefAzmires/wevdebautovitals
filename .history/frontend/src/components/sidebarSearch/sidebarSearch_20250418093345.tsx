import { useState } from 'react';
import './sidebarSearch.css'

export default function SidebarSearch() {

    const [search, setSearch] = useState    
    return (
      <aside className="sidebar">
        <h2 className="sidebar-title">🔧 Maintenance Records</h2>
  
        <div className="search-section">
          <input
            type="text"
            placeholder="Search a car part..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
  
        <nav className="sidebar-links">
          <a href="/add">➕ Add Record</a>
          <a href="#">📋 View All</a>
          <a href="#">⚙️ Settings</a>
        </nav>
      </aside>
    );
  }