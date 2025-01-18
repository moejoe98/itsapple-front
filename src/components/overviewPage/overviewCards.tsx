import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OverviewCards(props: any) {
  const testObject = {
    ...props.usersOverview,
    ...props.overview,
  };

  const camelCaseToTitle = (camelCase: string): string => {
    return camelCase
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };
  {
    return (
      <Grid container spacing={3}>
        {Object.entries(testObject).map((item: any, key: any) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card
              sx={{ borderRadius: "10px", backgroundColor: "#6a6ac817" }}
              key={key}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {camelCaseToTitle(item[0])}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item[1]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}
