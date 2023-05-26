import React from 'react';
import './styles/App.css';
import SidePanel from './components/sidepanel/SidePanel';
import RightSection from './components/right-section/RightSection';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <SidePanel />
        <RightSection />
      </div>
    </ChakraProvider>
  );
}

export default App;
