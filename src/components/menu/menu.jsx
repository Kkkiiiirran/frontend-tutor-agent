import React, { useState } from 'react';
import './menu.css';

const sections = ['Dashboard', 'Chat History', 'Settings', 'Help'];

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Dashboard');

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '➡️' : '⬅️'}
      </div>
      <ul className="menu">
        {sections.map(section => (
          <li
            key={section}
            className={active === section ? 'active' : ''}
            onClick={() => setActive(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
