import React from "react";
import {makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { snackdata, saladdata, noodlesdata } from "../DataFiles/Footer.helper";
import Typography from "@material-ui/core/Typography";
import { IconButton, TextField } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "22px",
      },
      "& input": {
        marginLeft: "24px",
        "&::placeholder": {
          color: "#ffffff",
        },
      },
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    background: "#0CA8AC",
    color: "#ffffff",
    padding: "83px",
  },
  categoryTypography: {
    fontWeight: 600,
  },
  dataPadding: {
    paddingTop: "12px",
    paddingBottom: "12px",
    "&:last-child": {
      paddingBottom: "0px",
    },
  },
  adornedEnd: {
    borderRadius: "0px 20px 20px 0px",
    paddingRight: "24px",
    paddingLeft: "24px",
    height: "53px",
    color: "#0CA8AC",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#0CA8AC",
      color: "#ffffff",
    },
  },
  email: {
    position: "relative",
    borderRadius: "22px",
    border: "2px solid #FFFFFF",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    minWidth: "320px",
    backgroundColor: "#0CA8AC",
    marginTop: "15px",
    marginBottom: "46px",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.categoryTypography}
              >
                Snacks
              </Typography>
              {snackdata.map((e, i) => (
                <Typography variant="subtitle1" className={classes.dataPadding} key={i}>
                  {e}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.categoryTypography}
              >
                Salad
              </Typography>
              {saladdata.map((e, i) => (
                <Typography variant="subtitle1" className={classes.dataPadding} key={i}>
                  {e}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.categoryTypography}
              >
                Noodles
              </Typography>
              {noodlesdata.map((e, i) => (
                <Typography variant="subtitle1" className={classes.dataPadding} key={i}>
                  {e}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.categoryTypography}
          >
            SUBSCRIBE
          </Typography>
          <Typography variant="subtitle1" className={classes.dataPadding}>
            Stay updated on our latest food release
          </Typography>
          <CustomTextField
            className={classes.email}
            placeholder="Enter Email Address"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => 0} className={classes.adornedEnd}>
                  <PlayArrowIcon />
                </IconButton>
              ),
            }}
          />
          <Typography variant="subtitle1">
            Copyright ©2021. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
