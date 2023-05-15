import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BenignHoursChart({ predictions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Count the number of Benign for each hour of the day
    const benignCounts = new Array(24).fill(0);
    predictions.forEach(prediction => {
      if (prediction.prediction === "BENIGN") {
        const date = new Date(prediction.date);
        const hour = date.getHours();
        benignCounts[hour] += 1;
      }
    });

    const chartData = {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Number of benign',
          data: benignCounts,
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
            text: 'Numbers of Benign by hour of the day'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('BenignHoursChart').getContext('2d');

    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]);

  return <canvas id="BenignHoursChart"></canvas>;
}

export default BenignHoursChart;

