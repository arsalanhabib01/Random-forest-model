import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AvgTimeChart({ predictions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = predictions.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString('en-US');

      const countByDate = acc[date] || {
        timeCount: 0,
        count: 0,
      };
      countByDate.timeCount += parseFloat(item.time);
      countByDate.count += 1;
      acc[date] = countByDate;
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Average prediction time',
          data: Object.values(data).map((prediction) => {
            const averageTimeCount = prediction.count !== 0 ? prediction.timeCount / prediction.count : 0;
            return averageTimeCount.toFixed(3);
          }),
          backgroundColor: 'orange',
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
            text: 'Average prediction time by day',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average Time Count',
            },
          },
        },
      },
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('AvgTimeChart');
    chartRef.current = new Chart(ctx, chartConfig);
  }, [predictions]);

  return <canvas id="AvgTimeChart" />;
}

export default AvgTimeChart;