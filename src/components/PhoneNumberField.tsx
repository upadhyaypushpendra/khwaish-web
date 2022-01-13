import HtmlTooltip from "./HtmlTooltop";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function PhoneNumberField(props: TextFieldProps) {
    return (
        <HtmlTooltip title="Phone number with country code i.e. +91xxxxxxxxxx">
            <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                required
                autoComplete="phone"
                placeholder="Your phone number please..."
                defaultValue="+91"
                {...props}
            />
        </HtmlTooltip>
    );
}