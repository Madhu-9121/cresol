import React, { useRef, useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import styles from './menu.module.css';

const ChartComponent = ({ data, width, height }) => {
  const chartRef = useRef(null);
  let chartInstance = null;
  const [chartDataList, setChartDataList] = useState([]);

  useEffect(() => {
    if (chartRef.current && data) {
      // Destroy previous chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create new chart instance
      chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Total Amount",
              data: Object.values(data),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          // Set explicit width and height
          width: width,
          height: height
        }
      });
      
      // Prepare chart data list for rendering
      const dataList = Object.keys(data).map((key, index) => {
        let color = "green"; // Default color for values below 1000
        if (data[key] > 5000) {
          color = "red"; // Red for values above 5000
        } else if (data[key] >= 1000 && data[key] <= 3000) {
          color = "blue"; // blue for values between 1000 and 3000
        }

        return (
          <li key={index} style={{ color: color }}>{key}: {data[key]}</li>
        );
      });
      setChartDataList(dataList);
    }

    return () => {
      // Clean up function to ensure chart instance is destroyed when component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, width, height]);

  return (
    <div>
      <canvas ref={chartRef} className={styles.chart} style={{ width, height }} />
      <div className={styles.parent} >
      <ul className={styles.ul}  style={{ listStyleType: "none" }}>
        {chartDataList}
      </ul>
      <div className={styles.desc}>
        <p style={{ color: "red" }}>Red: Spent is High</p>
        <p style={{ color: "Blue" }}>Yellow: Spent is in the limit</p>
        <p style={{ color: "green" }}>Green: Spent is in range</p>
      </div>

      </div>
      
    </div>
  );
};

export default ChartComponent;
