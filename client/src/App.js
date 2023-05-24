import React from 'react';
import './styles/App.css';
import api from './api/axiosInstance';
import SidePanel from './components/sidepanel/SidePanel';
import RightSection from './components/right-section/RightSection';

function App() {
  const callApi = () => {
    api
      .post('/users')
      .then(response => {
        const data = response.data;
        alert(JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <SidePanel/>
      <RightSection/>
{/*    <button onClick={callApi}>Call API</button> */}
    </div>
  );
}

export default App;
