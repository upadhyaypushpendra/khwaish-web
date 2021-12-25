import * as React from "react";
import { Link } from "react-router-dom";
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

const Signup = (props: any) => {
  const snackbar = useSnackbar();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (Boolean(data.get("phone"))) {
      const _phoneNumber = data.get("phone")?.toString() || "";
      const { isValid, phoneNumber } = phone(_phoneNumber);

      if (!isValid) {
        snackbar.enqueueSnackbar("Please enter a valid phone number", {
          variant: "error"
        });
        return false;
      }
      // eslint-disable-next-line no-console
      console.log({
        phone: phoneNumber,
        password: data.get("password"),
        name: data.get("name"),
        about: data.get("about")
      });
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
            placeholder="Your phone number please.."
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Set a strong password.."
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
