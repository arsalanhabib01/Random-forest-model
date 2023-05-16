// import requried libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './components/BarChart';
import BenignDateChart from './components/BenignDateChart';
import AttackDateChart from './components/AttackDateChart';
import BenignHoursChart from './components/BenignHoursChart';
import AttackHoursChart from './components/AttackHoursChart';
import AvgTimeChart from './components/AvgTimeChart';
import ExportToExcelButton from './components/ExportToExcelButton';


const baseURL = 'http://localhost:5000/api';

function App() {
  const [predictions, setPredictions] = useState([]);

  // This useEffect hook runs once, when the component is mounted.
  useEffect(() => {
    // Fetch the data from the API and update the state with it.
    axios.get(`${baseURL}/get`).then((res) => {
      setPredictions(res.data);
    });
  }, []);

  
  return (
    <div className='container'> 
      <h1>Dashboard</h1>   


      <div className='grid-container'>

        {/* Render the different Chart Components and pass the predictions state as a prop. */}
        <div className='grid-item'>
          <BarChart predictions={predictions} />
        </div>
        <div className='grid-item'>
          <AttackDateChart predictions={predictions} />
        </div>
        <div className='grid-item'>
          <BenignDateChart predictions={predictions} />
        </div> 
        <div className='grid-item'>
          <AvgTimeChart predictions={predictions} />
        </div> 
        <div className='grid-item'>
          <AttackHoursChart predictions={predictions} />
        </div>
        <div className='grid-item'>
          <BenignHoursChart predictions={predictions} />
        </div> 
      </div>

      <ExportToExcelButton predictions={predictions} />

    </div>
  );
}

export default App;

// Note: Command to run the frontend "npm start"