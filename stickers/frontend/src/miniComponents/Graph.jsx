// import React from "react";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto"; // Import 'chart.js/auto' to use the new syntax for scales

// const MyChart = ({ graphData }) => {
//   console.log("chart rendering");
//   const chartData = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "My First Dataset",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//         lineTension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default MyChart;

// ----------------------------------------------------------------------

import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import 'chart.js/auto' to use the new syntax for scales

const MyChart = ({ graphData }) => {
  const chartRef = useRef(null);
  let chartInst = null;

  useEffect(() => {
    chartInst = chartRef.current;
    chartInst.canvas.addEventListener("mousemove", (e) =>
      crosshairLine(chartInst, e)
    );
  }, []);

  console.log("chart rendering");
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 30, 81, 56, 55, 40],
        borderWidth: 1,
        lineTension: 0.3,
        fill: {
          target: {
            value: graphData.avg,
          },
          below: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) return null;
            return belowGradient(ctx, chartArea, data, scales, graphData.avg);
          },
          above: (context) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) return null;
            return aboveGradient(ctx, chartArea, data, scales, graphData.avg);
          },
        },

        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea, data, scales, graphData.avg);
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
      ctx.moveTo(left, y.getPixelForValue(graphData.avg));
      ctx.lineTo(right, y.getPixelForValue(graphData.avg));
      ctx.stroke();
      ctx.closePath();

      // ctx.beginPath();
      // ctx.fillStyle = "rgba(191, 191, 208,1)";
      // ctx.fillRect(0,y.getPixelForValue(graphData.avg),left,20);
      // ctx.closePath();

      ctx.font = "11px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Your Average",
        right - 53,
        y.getPixelForValue(graphData.avg)
      );
    },
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
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
    scales : {x,y}
  } = chart;
  ctx.save();
  console.log(e);

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
    ctx.moveTo(left+4, Y);
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
    ctx.fillText(y.getValueForPixel(Y).toFixed(1), left-4, Y);
    
  } else canvas.style.cursor = "default";
}
