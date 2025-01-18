import { Box } from "@mui/material";
import WithdrawsTable from "../components/withdrawsPage/WithdrawsTable";

export const WithdrawsPage = (props: any) => {
  return (
    <>
      <Box sx={{ width: "100%", padding: "40px" }}>
        <WithdrawsTable withdraws={props.withdraws} refresh={props.refresh} />
      </Box>
    </>
  );
};
