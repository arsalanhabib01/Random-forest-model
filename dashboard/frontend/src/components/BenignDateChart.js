import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BenignDateChart({ predictions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Count the number of Benign for each day
    const benignCounts = {};
    predictions.forEach(prediction => {
      if (prediction.prediction === "BENIGN") {
        const date = new Date(prediction.date).toLocaleDateString('en-US', {
        });
        if (benignCounts[date]) {
          benignCounts[date] += 1;
        } else {
          benignCounts[date] = 1;
        }
      }
    });

    const chartData = {
      labels: Object.keys(benignCounts),
      datasets: [
        {
          label: 'Number of benign',
          data: Object.values(benignCounts),
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
            text: 'Total number of Benign by day'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('BenignDateChart').getContext('2d');
   
    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]);

  return <canvas id="BenignDateChart"></canvas>;
}

export default BenignDateChart;

