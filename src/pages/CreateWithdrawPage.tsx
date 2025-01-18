import React from "react";
import { Box } from "@mui/material";
import CreateWithdrawForm from "../components/createWithdrawPage/CreateWithdrawForm";

export const CreateWithdrawPage = ({
  create,
  loading,
  balance,
  chains,
}: any) => {
  return (
    <Box sx={{ width: "100%", padding: "40px" }}>
      <CreateWithdrawForm
        create={create}
        loading={loading}
        balance={balance}
        chains={chains}
      />
    </Box>
  );
};
