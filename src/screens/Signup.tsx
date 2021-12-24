import * as React from "react";
import { phone } from "phone";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";

export default function Signup() {
  const snackbar = useSnackbar();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const { isValid, phoneNumber } = phone(data.get("phone") as string);

    if (!isValid) {
      snackbar.enqueueSnackbar("Please enter a valid phone number", {
        variant: "error"
      });
      return false;
    }

    console.log({
      phone: phoneNumber,
      password: data.get("password"),
      name: data.get("name"),
      about: data.get("about")
    });
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
              <Link href="/" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
