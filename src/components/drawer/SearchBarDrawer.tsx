import { MenuItem, FormControl, Select } from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const SearchBar = (props: any) => {
  const [selectedFilter, setSelectedFilter] = useState("movies");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedFilter(event.target.value);
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (query: string | number | boolean) => {
    navigate("/search?query=" + query + "&type=" + selectedFilter);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "0px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxShadow: "none",
          borderRadius: "30px",
          height: "40px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? props.isMobile
                ? "#010000"
                : ""
              : "",
        }}
        onSubmit={handleSubmit}>
        <InputBase
          sx={{ ml: 1, flex: 1, p: "2px" }}
          placeholder="Search"
          inputProps={{ "aria-label": "search " }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />

        <FormControl
          size="small"
          className="select"
          style={{ marginLeft: "10px" }}>
          <Select value={selectedFilter} onChange={handleFilterChange}>
            <MenuItem value="movies">Movies</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="actors">Actors</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchOutlinedIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
