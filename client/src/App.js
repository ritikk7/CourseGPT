import React, { useState } from 'react';
import './styles/App.css';
import SidePanel from './components/sidepanel/SidePanel';
import RightSection from './components/right-section/RightSection';
import { ChakraProvider } from '@chakra-ui/react';
import CourseObject from './models/CourseObject';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(
    new CourseObject('cpsc455')
  );
  const [currentPrompt, setCurrentPrompt] = useState('');
  // TODO: redux states
  const [mainPanel, setMainPanel] = useState('INFO');

  return (
    <ChakraProvider>
      <div className="App">
        <SidePanel
          setSelectedCourse={setSelectedCourse}
          currentPrompt={currentPrompt}
          setMainPanel={setMainPanel}
        />
        <RightSection
          selectedCourse={selectedCourse}
          setCurrentPrompt={setCurrentPrompt}
          mainPanel={mainPanel}
          setMainPanel={setMainPanel}
        />
      </div>
    </ChakraProvider>
  );
}

export default App;
