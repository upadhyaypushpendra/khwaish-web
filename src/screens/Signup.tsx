import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { phone } from "phone";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { useLoadingOverlay } from "../components/LoadingOverlay";
import { signup } from "../services/auth";
import { validatePassword } from "../utils";

const Signup = () => {
  const snackbar = useSnackbar();
  const loadingOvelay = useLoadingOverlay();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadingOvelay.showLoadingOverlay("Signing you in...");
    try {
      const formData = new FormData(event.currentTarget);
      const _phoneNumber = formData.get("phone")?.toString();
      const password = formData.get("password")?.toString();
      const name = formData.get("name")?.toString();
      const about = formData.get("about")?.toString();

      if (_phoneNumber && password) {
        const { isValid, phoneNumber } = phone(_phoneNumber);

        if (!validatePassword(password)) {
          snackbar.enqueueSnackbar('Please enter a valid password', {
            variant: "error",
          });
          return;
        }

        if (isValid && phoneNumber) {
          await signup({ phone: phoneNumber, password, name, about });
          navigate("/");
        } else {
          snackbar.enqueueSnackbar('Please enter a valid phone number', {
            variant: "error",
          })
        }
      }
    } catch (error) {
      if (error instanceof Error)
        snackbar.enqueueSnackbar(error?.message || "Unable to sign up! Please try again.", { variant: "error" });

      if (error instanceof String)
        snackbar.enqueueSnackbar(error || "Unable to sign up! Please try again.", { variant: "error" });
      
    } finally {
      loadingOvelay.hideLoadingOverlay();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Lets get some details for Khwaish
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Address"
            name="phone"
            autoComplete="phone"
            autoFocus
            placeholder="Your phone number please..."
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Set a strong password..."
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            placeholder="Get set your name?"
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            id="about"
            label="About"
            name="about"
            placeholder="Lets add something about you?"
            multiline
            InputProps={{
              rows: 3
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup for Kwaish
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Signup;
