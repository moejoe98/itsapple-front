import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const directions = [
  { value: "BUY", label: "Buy" },
  { value: "SELL", label: "Sell" },
];

interface Chain {
  chainName: string;
  chain: string;
  withdrawalMinFee: number;
}

interface CreateWithdrawFormProps {
  create: (withdraw: any) => void;
  loading: boolean;
  balance: number;
  chains: Chain[];
  handleSendOtp: () => Promise<boolean>;
}

const CreateWithdrawForm: React.FC<CreateWithdrawFormProps> = ({
  create,
  loading,
  balance,
  chains,
  handleSendOtp,
}) => {
  const [formData, setFormData] = useState<any>({
    clientPhone: "",
    direction: "",
    clientWallet: "",
    usdtAmount: "",
    chainFee: "",
    receivedAmount: "",
    givenAmount: "",
    commission: 0,
    chain: "",
  });

  const [open, setOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "usdtAmount") {
      const amount = parseFloat(value);
      const chainFee = formData.chainFee || 0;

      if (isNaN(amount) || amount < 0) {
        setFormData((prevData: any) => ({
          ...prevData,
          [name]: 0,
          commission: 0,
        }));
      } else if (amount > balance - chainFee) {
        setFormData((prevData: any) => ({
          ...prevData,
          [name]: parseFloat((balance - chainFee).toFixed(2)),
          commission: parseFloat(((balance - chainFee) * 0.03).toFixed(2)),
        }));
      } else {
        setFormData((prevData: any) => ({
          ...prevData,
          [name]: parseFloat(amount.toFixed(2)),
          commission: parseFloat((amount * 0.03).toFixed(2)),
        }));
      }
    } else if (name === "chain") {
      const selectedChain = chains.find((chain) => chain.chain === value);

      const chainFee = selectedChain ? selectedChain.withdrawalMinFee : 0;

      if (formData.usdtAmount > balance - chainFee) {
        setFormData((prevData: any) => ({
          ...prevData,
          chain: value,
          chainFee,
          usdtAmount: parseFloat((balance - chainFee).toFixed(2)),
          commission: parseFloat(((balance - chainFee) * 0.03).toFixed(2)),
        }));
      } else {
        setFormData((prevData: any) => ({
          ...prevData,
          chain: value,
          chainFee,
        }));
      }
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOpenDialog = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmSubmit = () => {
    setOpen(false);

    const filteredData = { ...formData };

    delete filteredData.commission;

    if (formData.direction === "BUY") {
      delete filteredData.givenAmount;
      if (formData.receivedAmount !== "") {
        filteredData.receivedAmount = Number(formData.receivedAmount);
      } else {
        delete filteredData.receivedAmount;
      }
    } else if (formData.direction === "SELL") {
      delete filteredData.receivedAmount;
      if (formData.givenAmount !== "") {
        filteredData.givenAmount = Number(formData.givenAmount);
      } else {
        delete filteredData.givenAmount;
      }
    }

    create(filteredData);
  };

  useEffect(() => {
    setFormData({
      clientPhone: "",
      direction: "",
      clientWallet: "",
      usdtAmount: "",
      chainFee: "",
      receivedAmount: "",
      givenAmount: "",
      commission: 0,
      chain: "",
      otp: "",
    });
  }, [balance]);

  const totalAmount =
    (parseFloat(formData.usdtAmount) || 0) +
    (parseFloat(formData.chainFee) || 0) +
    (parseFloat(formData.commission) || 0);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
            },
            p: {
              xs: 0,
              md: 3,
            },
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <form onSubmit={handleOpenDialog}>
            <Typography variant="h4" gutterBottom>
              Create New Withdraw
            </Typography>
            <Typography variant="h6" gutterBottom>
              USDT Balance: {balance.toFixed(2)}
            </Typography>
            <Grid mt={1} container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Client Phone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  label="Direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {directions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  label="Chain"
                  name="chain"
                  value={formData.chain}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {chains.map((option) => (
                    <MenuItem key={option.chain} value={option.chain}>
                      {option.chainName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Client Wallet"
                  name="clientWallet"
                  value={formData.clientWallet}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  label="USDT Amount"
                  name="usdtAmount"
                  type="number"
                  value={formData.usdtAmount}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0, max: balance, step: 0.01 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Chain Fee"
                  name="chainFee"
                  type="number"
                  value={formData.chainFee}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0 },
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Commission (3%)"
                  name="commission"
                  type="number"
                  value={formData.commission}
                  fullWidth
                  InputProps={{
                    inputProps: { readOnly: true },
                  }}
                />
              </Grid>
              {formData.direction === "BUY" && (
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                    >
                      Should Receive{" "}
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ cursor: "pointer", textDecoration: "underline" }}
                        onClick={() =>
                          setFormData((prevData: any) => ({
                            ...prevData,
                            receivedAmount: totalAmount.toFixed(2),
                          }))
                        }
                      >
                        {totalAmount.toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                  <TextField
                    label="Received Amount"
                    name="receivedAmount"
                    type="number"
                    value={formData.receivedAmount}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        step: 0.01,
                        min: 0,
                      },
                    }}
                  />
                </Grid>
              )}

              {formData.direction === "SELL" && (
                <Grid item sx={{ mt: 4 }} xs={12} sm={6}>
                  <TextField
                    label="Given Amount"
                    name="givenAmount"
                    type="number"
                    value={formData.givenAmount}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        step: 0.01,
                        min: 0,
                      },
                    }}
                  />
                </Grid>
              )}
              {otpSent && !otpError && (
                <Grid sx={{ mt: 2 }} item xs={12} sm={6}>
                  <TextField
                    required
                    label="Enter OTP"
                    name="otp"
                    value={formData.otp || ""}
                    onChange={(e) =>
                      setFormData((prevData: any) => ({
                        ...prevData,
                        otp: e.target.value,
                      }))
                    }
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </Grid>
              )}

              {/* {!otpSent && ( */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  {/* Send OTP Button */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        try {
                          const response = await handleSendOtp();

                          if (response) {
                            setOtpSent(true);
                            setOtpError(false);
                          }
                        } catch {
                          setOtpError(true);
                          setOtpSent(false);
                        }
                      }}
                      disabled={otpSent && !otpError}
                    >
                      {otpSent && !otpError ? "OTP Sent" : "Send OTP"}
                    </Button>

                    {otpError && (
                      <Typography color="error" variant="caption" mt={1}>
                        Failed to send OTP. Please try again.
                      </Typography>
                    )}
                  </Box>

                  {/* Submit Button */}
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading || !otpSent || otpError}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <ul>
            <li>{formData.clientWallet}</li>
            <li>USDT Amount: {formData.usdtAmount}</li>
            <li>Chain: {formData.chain}</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateWithdrawForm;
