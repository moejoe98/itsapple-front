import { Alert, Box, Button, Stack, TextField, styled } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function LoginForm({
  values,
  handleChange,
  errors,
  handleSubmit,
}: any) {
  const ButtonStyle = styled(Button)(() => ({
    backgroundColor: "#3a3a54",
    color: "white",
    "&:hover": {
      backgroundColor: "#3a3a54",
    },
  }));

  return (
    <>
      <Box mt={8}>
        {!values.success && (
          <Box sx={{ paddingBottom: "20px" }}>
            <Alert sx={{ borderRadius: "5px" }} severity="error">
              Wrong username or password
            </Alert>
          </Box>
        )}
        <Box
          component="form"
          p={2.5}
          sx={{
            display: "flex",
            paddingTop: "40px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid grey",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit} // Add onSubmit event handler to the form
        >
          <Stack spacing={2}>
            <AccountCircleOutlinedIcon sx={{ fontSize: "50px" }} />
          </Stack>
          <h2> Login </h2>
          <Stack sx={{ width: "100%" }} spacing={3} p={2}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={values.username}
              onChange={handleChange("username")}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
            />
            {/* Change Button to type="submit" to trigger form submission on Enter */}
            <ButtonStyle type="submit" variant="contained">
              Login
            </ButtonStyle>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
