import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

const paperStyle = {
  padding: "20px",
  margin: "20px auto",
  backgroundColor: "#FEA95F",
};

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginInProgress(true);
    setIsLoggedIn(false);
    setOpen(true);

    setTimeout(() => {
      if (userName === "John" && password === "12345") {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userName", JSON.stringify(userName));
        navigate("/home");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid username or password");
        setIsLoggedIn(false);
      }
      setIsLoginInProgress(false);
    }, 1000);
  };

  if (isLoggedIn) {
    return <Navigate to="/home">Home</Navigate>;
  }

  return (
    <Grid container justifyContent="center" className="login-main-container">
      <Grid item xs={12}>
        <Typography variant="h3" className="logo-el">
          <TravelExploreIcon />
          FindMyNews
        </Typography>
      </Grid>

      <Paper elevation={3} style={paperStyle}>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Username"
            placeholder="Enter your username"
            margin="normal"
            className="username-field"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Password"
            placeholder="Enter your password"
            margin="normal"
            type="password"
            className="password-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} align="center" style={{ paddingTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Grid item xs={12} className="login-text">
            <Typography variant="overline" gutterBottom>
              Input your login info to get started :)
            </Typography>
          </Grid>
          {/* <LinearProgress /> */}
          {isLoginInProgress && <LinearProgress />}
        </Grid>
      </Paper>

      {errorMessage && (
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}
      <footer className="footer">
        amirahnasihah 2023_
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/amirahnasihah/find-news-app"
        >
          GitHub Repo
        </a>
      </footer>
    </Grid>
  );
};

export default Login;
