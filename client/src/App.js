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
  return (
    <ChakraProvider>
      <div className="App">
        <SidePanel setSelectedCourse={setSelectedCourse} />
        <RightSection selectedCourse={selectedCourse} />
      </div>
    </ChakraProvider>
  );
}

export default App;
