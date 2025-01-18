import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function CountChart(props: any) {
  const dates = props.chartData.map(
    (item: any) => item.date.split("-")[item.date.split("-").length - 1]
  );
  const counts = props.chartData.map((item: any) => item.count);

  return (
    <LineChart
      xAxis={[{ data: dates.reverse(), label: "Date" }]}
      series={[
        {
          data: counts.reverse(),
          label: props.name,
          area: true,
          color: "#3a3a54",
        },
      ]}
      height={300}
    />
  );
}
