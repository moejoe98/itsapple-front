import { Box, Stack } from "@mui/material";
import OverviewCards from "../components/overviewPage/overviewCards";
import CountChart from "../components/overviewPage/countChart";
import TickPlacementBars from "../components/overviewPage/countChart2";

export const OverviewPage = (props: any) => {
  return (
    <>
      <OverviewCards
        refresh={props.refresh}
        overview={props.overview}
        usersOverview={props.usersOverview}
      />
      <Stack maxWidth={"100%"} mt={10} direction={{ xs: "column", sm: "row" }}>
        <CountChart chartData={props.usersChartData} name="New Users" />
        <CountChart chartData={props.swapsChartData} name="New Swaps" />
        {/* <TickPlacementBars chartData={props.swapsChartData} /> */}
      </Stack>
    </>
  );
};
