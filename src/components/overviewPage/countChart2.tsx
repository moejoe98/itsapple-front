import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const valueFormatter = (value: number | null) => `${value}`;

const chartSetting = {
  series: [{ dataKey: "count", label: "New Users", valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function TickPlacementBars(props: any) {
  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={props.chartData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "date",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
            colorMap: {
              type: "piecewise",
              thresholds: [0],
              colors: ["#3a3a54"],
            },
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
