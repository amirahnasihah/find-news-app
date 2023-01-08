import { useEffect, useState } from "react";
import { Grid, TextField, Button, Chip, Typography } from "@material-ui/core";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import OrangeButton from "../custom-components/OrangeButton.jsx";
import "./Header.css";

function Header({ keyWord, handleSetKeyword }) {
  const [userName, setUserName] = useState(" ");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("userName")));
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{
          display: {
            xs: "none",
            sm: "block",
          },
          color: "#222831",
          flexGrow: 1,
          padding: "10px",
        }}
      >
        <TravelExploreIcon />
        FindMyNews
      </Typography>
      <Grid item>
        <TextField
          hiddenLabel
          placeholder="Search…"
          variant="filled"
          size="small"
          className="search-el"
          value={keyWord || ""}
          onChange={(e) => handleSetKeyword(e)}
        />
      </Grid>

      <OrangeButton
        size="small"
        variant="contained"
        style={{ margin: "5px" }}
        onClick={handleSetKeyword}
      >
        Clear Search
      </OrangeButton>

      <Grid>
        <Chip
          style={{ margin: "5px" }}
          icon={<FaceIcon />}
          label={userName}
          color="primary"
          value={userName}
        />

        <Button
          size="small"
          variant="contained"
          color="secondary"
          style={{ margin: "5px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Header;
