// import requried libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './components/BarChart';
import BenignDateChart from './components/BenignDateChart';
import AttackDateChart from './components/AttackDateChart';
import BenignHoursChart from './components/BenignHoursChart';
import AttackHoursChart from './components/AttackHoursChart';
import AvgTimeChart from './components/AvgTimeChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

// Import the XLSX library for Excel file creation
import { utils as XLSXUtils, writeFile as writeExcelFile } from 'xlsx';

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

  const exportToExcel = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Get the current date in the format 'YYYY-MM-DD'
    const dataByDate = {}; // Store predictions data by date
  
    
    // Group predictions data by date
    predictions.forEach((prediction) => {
      //const date = prediction.date;
      const date = new Date(prediction.date).toISOString().slice(0, 10);
      //console.log(date1);
      if (!dataByDate[date]) {
        dataByDate[date] = [];
      }
      dataByDate[date].push(prediction);   
    });

    // Create the Excel workbook and worksheet
    const workbook = XLSXUtils.book_new();
    Object.keys(dataByDate).forEach((date) => {
      if (date === formattedDate) {
        const worksheet = XLSXUtils.json_to_sheet(dataByDate[date]);
        XLSXUtils.book_append_sheet(workbook, worksheet, date);
      } else {
        console.log('No predictions data available for the current date.');
     }
  }); 

   // Save the workbook as an Excel file with the current date
   writeExcelFile(workbook, `predictions_${formattedDate}.xlsx`);

  };
  
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

            {/* Your other JSX code here */}
      <div className='excel-file' onClick={exportToExcel}>
        <FontAwesomeIcon icon={faFileExcel} className='excel-icon'/>
        <span className='excel-text'>Export to Excel</span>
      </div>
    
    </div>
  );
}

export default App;

// Note: Command to run the frontend "npm start"