import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { utils as XLSXUtils, writeFile as writeExcelFile } from 'xlsx';

const ExportToExcelButton = ({ predictions }) => {
  const exportToExcel = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const dataByDate = {};

    predictions.forEach((prediction) => {
      const date = new Date(prediction.date).toISOString().slice(0, 10);
      if (!dataByDate[date]) {
        dataByDate[date] = [];
      }
      dataByDate[date].push(prediction);
    });

    const workbook = XLSXUtils.book_new();

    let iterator = 0;
    Object.keys(dataByDate).forEach((date) => {
      if (date === formattedDate) {
        const worksheet = XLSXUtils.json_to_sheet(dataByDate[date]);
        XLSXUtils.book_append_sheet(workbook, worksheet, date);
        iterator = 1;
      }
    });

    if (iterator === 0) {
      alert('No predictions data available.');
      return;
    }

    writeExcelFile(workbook, `predictions_${formattedDate}.xlsx`);
  };

  return (
    <div className='excel-file' onClick={exportToExcel}>
      <FontAwesomeIcon icon={faFileExcel} className='excel-icon' />
      <span className='excel-text'>Export to Excel</span>
    </div>
  );
};

export default ExportToExcelButton;
