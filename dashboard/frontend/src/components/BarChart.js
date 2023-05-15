import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ predictions }) {
  const chartRef = useRef(null);

  // This useEffect hook runs whenever the "predictions" prop changes.
  useEffect(() => {
    // Destroy the previous chart instance, if any.
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Transform the "predictions" data into a format that can be used by the chart.
    const data = predictions.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString('en-US', {
        weekday: 'long',
      });
    
      const countByDate = acc[date] || {
        XSS: 0,
        DDoS: 0,
        BENIGN: 0,
        date,
      };
    
      countByDate[item.prediction] += 1;
      acc[date] = countByDate;
      return acc;
    }, {});

  
    // Define the chart data and options.
    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'XSS' ,
          data: Object.values(data).map((prediction) => prediction.XSS || 0),
          backgroundColor: 'blue',
        },
        {
          label: 'DDoS',
          data: Object.values(data).map((prediction) => prediction.DDoS || 0),
          backgroundColor: 'red',
        },
        {
          label: 'BENIGN',
          data: Object.values(data).map((prediction) => prediction.BENIGN || 0),
          backgroundColor: 'green',
        },
      ],
    };

    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Number of XSS and DDoS attacks by weekday'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Get the canvas context and create a new chart instance.
    const ctx = document.getElementById('BarChart').getContext('2d');
  
    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]); // The "predictions" prop is the dependency of this useEffect hook.

  return <canvas id="BarChart"></canvas>;
}

export default BarChart;
