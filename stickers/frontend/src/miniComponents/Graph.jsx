import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import 'chart.js/auto' to use the new syntax for scales

const monthsArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
const weekArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// timestamp = "01-02-2024 18:34";
function getDate(timestamp){
  const [day,month,rest] = timestamp.split("-");
  let myStr = `${day} ${monthsArray[month-1]}`;
  return myStr;
}
function getDay(timestamp) {
  const [datePart,timePart] = timestamp.split(" ");
  const [date,month,year] = datePart.split("-");
  const myDate = new Date(year,month,date);
  const day = myDate.getDay();
  const weekDay = weekArray[day];
  if(weekDay==0) return "";
  else return weekDay;
}
function getHour(timestamp) {
  const [datePart,timePart] = timestamp.split(" ");
  return timePart;
}
function getMonth(timestamp) {
  const [datePart,timePart] = timestamp.split(" ");
  const [date,month,year] = datePart.split("-");
  console.log("date : "+date+", month : "+month+", year : "+year);
  const monthIndex = parseInt(month)-1;
  return monthsArray[monthIndex];
}

const MyChart = ({ graphData,avg,range }) => {
  console.log("Yay finally inside the MyChart compononet in graph.jsx file with grapghData as : ",graphData);
  const chartRef = useRef(null);
  let chartInst = null;

  // Parse timestamp to JavaScript Date object
  const xData = graphData.map(item => {
    if(range=="day") return getHour(item.timestamp);
    else if(range=="month") return getDate(item.timestamp);
    else if(range=="week") return getDay(item.timestamp);
    else return getMonth(item.timestamp);
  });
  const yData = graphData.map(item => {
    return item.price;
  });

  useEffect(() => {
    // if (chartRef.current) {
      chartInst = chartRef.current;
      console.log("ref : ", chartRef);
      chartInst.canvas.addEventListener("mousemove", (e) =>
        crosshairLine(chartInst, e)
      );
    // }
  }, []);

  console.log("chart rendering");
  const dates = ["2022-11-06", "2022-11-07", "2022-11-08"];
  console.log("xData : ",xData);
  const chartData = {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: xData,
    datasets: [
      {
        label: "My First Dataset",
        // data: [65, 59, 30, 81, 56, 55, 40],
        data: yData,
        borderWidth: 1,
        lineTension: 0.3,
        fill: {
          target: {
            value: avg,
          },
          below: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) return null;
            return belowGradient(ctx, chartArea, data, scales, avg);
          },
          above: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) return null;
            return aboveGradient(ctx, chartArea, data, scales, avg);
          },
        },

        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea, data, scales, avg);
        },
      },
    ],
  };

  //dottedLine plugin block
  const dottedLine = {
    id: "dottedLine",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        data,
        chartArea: { left, right, width },
        scales: { x, y },
      } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([1, 5]);
      ctx.strokeStyle = "rgba(191, 191, 208,0.5)";
      ctx.moveTo(left, y.getPixelForValue(avg));
      ctx.lineTo(right, y.getPixelForValue(avg));
      ctx.stroke();
      ctx.closePath();

      // ctx.beginPath();
      // ctx.fillStyle = "rgba(191, 191, 208,1)";
      // ctx.fillRect(0,y.getPixelForValue(avg),left,20);
      // ctx.closePath();

      ctx.font = "11px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Your Average",
        right - 53,
        y.getPixelForValue(avg)
      );
    },
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      // x: {
      //   type: "time",
      //   time: {
      //     unit: "day", // You can change this to 'month', 'week', etc.
      //     displayFormats: {
      //       day: "MMM D", // Format for days
      //       month: "MMM", // Format for months
      //       week: "MMM D", // Format for weeks
      //     },
      //   },
      //   title: {
      //     display: true,
      //     text: "Timeline",
      //   },
      // },
    },
  };

  return (
    <Line
      ref={chartRef}
      data={chartData}
      options={options}
      plugins={[dottedLine]}
    />
  );
};

export default MyChart;

function getGradient(ctx, chartArea, data, scales, avg) {
  const { left, right, top, bottom, widht, height } = chartArea;
  const { x, y } = scales;
  const gradientColor = ctx.createLinearGradient(0, 0, 0, bottom);
  const shift = y.getPixelForValue(avg) / bottom;
  gradientColor.addColorStop(0, "rgba(144, 238, 144,1)");
  gradientColor.addColorStop(shift, "rgba(144, 238, 144,1)");
  gradientColor.addColorStop(shift, "rgba(255, 99, 71,1)");
  gradientColor.addColorStop(1, "rgba(255, 99, 71,1)");
  return gradientColor;
}
function belowGradient(ctx, chartArea, data, scales, avg) {
  const { left, right, top, bottom, widht, height } = chartArea;
  const { x, y } = scales;
  const gradientColor = ctx.createLinearGradient(
    0,
    y.getPixelForValue(avg),
    0,
    bottom
  );
  gradientColor.addColorStop(0, "rgba(255, 99, 71,0)");
  gradientColor.addColorStop(1, "rgba(255, 99, 71,0.7)");
  return gradientColor;
}
function aboveGradient(ctx, chartArea, data, scales, avg) {
  const { left, right, top, bottom, widht, height } = chartArea;
  const { x, y } = scales;
  const gradientColor = ctx.createLinearGradient(
    0,
    y.getPixelForValue(avg),
    0,
    top
  );
  gradientColor.addColorStop(0, "rgba(144, 238, 144,0)");
  gradientColor.addColorStop(1, "rgba(144, 238, 144,0.8)");
  return gradientColor;
}
function crosshairLine(chart, e) {
  const {
    canvas,
    ctx,
    chartArea: { left, right, top, bottom },
    scales: { x, y },
  } = chart;
  ctx.save();

  chart.update("none");
  ctx.restore();

  const X = e.offsetX;
  const Y = e.offsetY;
  if (X >= left && X <= right && Y >= top && Y <= bottom) {
    canvas.style.cursor = "crosshair";

    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(191, 191, 208,0.5)";

    //horizontal line
    ctx.beginPath();
    ctx.moveTo(left + 4, Y);
    ctx.lineTo(right, Y);
    ctx.stroke();
    ctx.closePath();

    //vertical line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(191, 191, 208,0.5)";
    ctx.moveTo(X, top);
    ctx.lineTo(X, bottom);
    ctx.stroke();
    ctx.closePath();

    //label
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(79, 167, 255,1)";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(y.getValueForPixel(Y).toFixed(1), left - 4, Y);
  } else canvas.style.cursor = "default";
}