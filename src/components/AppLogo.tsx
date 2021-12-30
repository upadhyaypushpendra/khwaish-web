import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  logoRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content"
  },
});

const AppLogo = (props: any) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent<HTMLElement>) => navigate("/");

  return (
    <Box
      className={classes.logoRoot}
      sx={{
        margin: (props?.margin / 8) || 1,
      }}
      onClick={handleLogoClick}
    >
      <Tooltip title="Khwaish">
        <Avatar sx={{
          backgroundColor: "transparent",
          borderRadius: 0,
          ...(props.size ? {
            width: props.size || "auto",
            height: props.size || "auto"
          } : {}),
          margin: 0,
        }}>
          <img alt="Khwaish" src={"/AppLogo.png"} width="100%" height="auto" />
        </Avatar>
      </Tooltip>
    </Box>
  );
};

export default AppLogo;
