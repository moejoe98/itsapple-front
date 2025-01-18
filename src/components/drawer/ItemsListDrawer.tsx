import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ListItem, ListItemText, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import LinkComponent from "../../navigation/LinkComponent";

export default function ItemsListDrawer(item: any) {
  const location = useLocation();
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode;

  return (
    <ListItem
      style={{ width: "auto" }}
      className={`nav-item  ${
        location.pathname === item.children[0].path
          ? `nav-active-${isDarkTheme}`
          : ""
      }`}
      key={item.name}
    >
      <LinkComponent to={item.children[0].path}>
        <ListItemText primary={item.name} />
      </LinkComponent>
    </ListItem>
  );
}
