import React from 'react';
import './styles/App.css';
import SidePanel from './components/sidepanel/SidePanel';
import RightSection from './components/right-section/RightSection';

function App() {
 

  return (
    <div className="App">
      <SidePanel/>
      <RightSection/>
    </div>
  );
}

export default App;
