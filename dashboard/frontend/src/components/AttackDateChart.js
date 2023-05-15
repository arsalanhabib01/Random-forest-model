import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AttackDateChart({ predictions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Count the number of XSS and DDoS attacks for each day
    const attackCounts = {};
    predictions.forEach(prediction => {
      if (prediction.prediction === "XSS" || prediction.prediction === "DDoS") {
        const date = new Date(prediction.date).toLocaleDateString('en-US', {
        });
        if (attackCounts[date]) {
          attackCounts[date] += 1;
        } else {
          attackCounts[date] = 1;
        }
      }
    });

    const chartData = {
      labels: Object.keys(attackCounts),
      datasets: [
        {
          label: 'Number of attacks',
          data: Object.values(attackCounts),
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
            text: 'Total number of XSS and DDoS attacks by day'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('AttackDateChart').getContext('2d');
   
    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]);

  return <canvas id="AttackDateChart"></canvas>;
}

export default AttackDateChart;

