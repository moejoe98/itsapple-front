import { Grid } from "@mui/material";
import LoginForm from "../components/loginPage/LoginForm";

function LoginPage(props: any) {
  return (
    <>
      <Grid
        pt={5}
        container
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={10} sm={6} lg={4}>
          <LoginForm {...props} />
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;
