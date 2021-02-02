import React from "react";
import { Bar as BarChart } from "react-chartjs-2";

export const Chart = ({ dataset, theme }) => (
  <BarChart
    height={400}
    width={400}
    data={dataset}
    options={{
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 10,
              autoSkip: true,
              fontColor: theme.isDark ? "white" : "black",
            },
            gridLines: {
              display: true,
              color: "lightgrey",
            },
          },
        ],
      },
    }}
  />
);
