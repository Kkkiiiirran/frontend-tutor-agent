import React, { useState } from 'react';
import Menu from './components/menu/menu';
import ChatBox from './components/ChatBox/ChatBox';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('chat');

  return (
    <div className="app-container">
    
      <aside className="sidebar">
        <Menu activeSection={activeSection} onSectionChange={setActiveSection} />
      </aside>

      <main className="main-content">
        {activeSection === 'chat' ? (
          <ChatBox />
        ) : (
          <div className="placeholder-content">
            Other content goes here...
          </div>
        )}
      </main>
    </div>
  );
};
export default App;