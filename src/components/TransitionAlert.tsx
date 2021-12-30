import * as React from 'react';
import Box from '@mui/material/Box';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export type TransitionAlertProps = {
    severity?: AlertColor,
    message?: string,
    onClose: (e: any) => void,
};

export default function TransitionAlert(props: TransitionAlertProps) {
    return (
        <Box sx={{ width: 'fit-content' }}>
            <Collapse in={Boolean(props.message)}>
                <Alert
                    severity={props.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
            {props.message || "Alert"}
                </Alert>
            </Collapse >
        </Box >
    );
}
