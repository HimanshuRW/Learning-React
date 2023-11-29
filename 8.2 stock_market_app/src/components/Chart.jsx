import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import 'chart.js/auto' to use the new syntax for scales

function get_time(time){
    let str = `${time.getMinutes()}:${time.getSeconds()}`;
    return str;
}

const MyChart = ({db,start_date}) => {
  console.log("chart rendering");
  const db_copy1 = [...db];
  const db_copy2 = [...db];
  const chartData = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: db_copy1.map((currentRate, index) => {
        let my_time = start_date.getTime();
        my_time+= (index*500);
        my_time = new Date(my_time);
        let display = get_time(my_time);
        return display; 
    }),
    datasets: [
      {
        label: "My First Dataset",
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: db_copy2,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MyChart;
