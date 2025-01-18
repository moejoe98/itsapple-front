import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function WithdrawsTable(props: any) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value ?? "-",
    },
    {
      field: "clientPhone",
      headerName: "Client Phone",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value ?? "-",
    },
    {
      field: "direction",
      headerName: "Direction",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value ?? "-",
    },

    {
      field: "clientWallet",
      headerName: "Client Wallet",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value ?? "-",
    },
    {
      field: "usdtAmount",
      headerName: "USDT Amount",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value ?? "-",
    },
    {
      field: "profit",
      headerName: "Profit",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "chain",
      headerName: "Chain",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.value ? params.value : "-"),
    },
    {
      field: "chainFee",
      headerName: "Chain Fee",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.value ? params.value : "-"),
    },

    {
      field: "receivedAmount",
      headerName: "Received Amount",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.value ? params.value : "-"),
    },

    {
      field: "givenAmount",
      headerName: "Given Amount",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (params.value ? params.value : "-"),
    },

    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value
          ? formatDistanceToNow(new Date(params.value), { addSuffix: true })
          : "-",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const rows = props.withdraws.map((withdraw: any, index: number) => ({
    id: withdraw.id,
    clientPhone: withdraw.clientPhone,
    direction: withdraw.direction,
    clientWallet: withdraw.clientWallet,
    usdtAmount: withdraw.usdtAmount,
    profit: withdraw.profit,
    chainFee: withdraw.chainFee,
    receivedAmount: withdraw.receivedAmount,
    givenAmount: withdraw.givenAmount,
    chain: withdraw.chain,
    createdAt: withdraw.createdAt,
  }));

  const [filteredRows, setFilteredRows] = useState(rows);

  const handleRefresh = async () => {
    setLoading(true);
    await props.refresh();
    setLoading(false);
  };

  const handleSearch = (event: any) => {
    const value = event.target.value;
    setSearchText(value);
    setFilteredRows(
      rows.filter((row: any) => {
        return Object.values(row).some(
          (field) =>
            String(field).toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      })
    );
  };

  return (
    <>
      <Stack mb={2} spacing={1} direction="row" alignItems="center">
        <Typography variant="h4">Refresh</Typography>
        <RefreshIcon
          style={{
            cursor: "pointer",
          }}
          onClick={handleRefresh}
        />
      </Stack>

      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "250px" }}
      />
      <DataGrid
        loading={loading}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important",
          },
        }}
        autoHeight
        disableRowSelectionOnClick
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 25, page: 0 } },
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
        }}
        getRowClassName={(params) =>
          params.row.percentageDifference > 0 ? "highlight-row" : ""
        }
      />
    </>
  );
}
