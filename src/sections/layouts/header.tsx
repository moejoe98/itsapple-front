import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  let location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className="nav-bar" position="static" sx={{ backgroundColor: "transparent !important" }}>
      <Toolbar className="nav">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <a style={{ color: "white", textDecoration: "none" }} href="/">
            MoeJoe
          </a>
        </Typography>
        <Button className={`nav-item ${location.pathname === "/" ? "active" : ""}`} href="/">
          Home
        </Button>
        <Button className={`nav-item ${location.pathname === "/about" ? "active" : ""}`} href="/about">
          About Us
        </Button>
        <Button className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`} href="/contact">
          Contact Us
        </Button>
        <Button id="basic-button" onClick={handleClick} className="nav-item">
          More
        </Button>

        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem component={Link} to="/account">
            My account
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
