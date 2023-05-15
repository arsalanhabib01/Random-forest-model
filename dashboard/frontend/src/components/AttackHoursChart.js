import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AttackHoursChart({ predictions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Count the number of XSS and DDoS attacks for each hour of the day
    const attackCounts = new Array(24).fill(0);
    predictions.forEach(prediction => {
      if (prediction.prediction === "XSS" || prediction.prediction === "DDoS") {
        const date = new Date(prediction.date);
        const hour = date.getHours();
        attackCounts[hour] += 1;
      }
    });

    const chartData = {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Number of attacks',
          data: attackCounts,
          backgroundColor: 'red',
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
            text: 'Number of XSS and DDoS attacks by hour of the day'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('AttackHoursChart').getContext('2d');
   
    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]);

  return <canvas id="AttackHoursChart"></canvas>;
}

export default AttackHoursChart;
