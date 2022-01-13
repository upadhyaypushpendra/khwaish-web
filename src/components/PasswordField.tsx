import React from "react";
import HtmlTooltip from "../components/HtmlTooltop";
import Typography from "@mui/material/Typography";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function PasswordField(props: TextFieldProps) {
    return (<HtmlTooltip
        title={
            <React.Fragment>
                <Typography variant="body1">Password must Contains:</Typography>
                <ul>
                    <li>Atleast 8 characters</li>
                    <li>A Lowercase character(a-z)</li>
                    <li>A Uppercase character(A-Z)</li>
                    <li>A number character(0-9)</li>
                    <li>A special character(@$!%*#?&)</li>
                </ul>
            </React.Fragment>
        }
    >
        <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Set a strong password..."
            {...props}
        />
    </HtmlTooltip>);
}