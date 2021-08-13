import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    flexGrow: 1,
    background: "#ffffff",
    // paddingRight: "122px",
    // paddingLeft: "122px",
    // paddingTop: "100px",
  },
  breadcrumbsWeight: {
    fontWeight: 600
  }
}));
const BreadcrumbsUI = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.itemContainer}>
      <Breadcrumbs separator="|" aria-label="breadcrumb">
        <Link
          color="inherit"
          href="#"
          variant="h6"
          onClick={() => console.log("You Clicked Home")}
          className={classes.breadcrumbsWeight}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="#"
          variant="h6"
          onClick={() => console.log("You Clicked Snacks")}
          className={classes.breadcrumbsWeight}
        >
          Snacks
        </Link>
        <Link
          color="inherit"
          href="#"
          variant="h6"
          onClick={() => console.log("You Clicked Fries")}
          className={classes.breadcrumbsWeight}
        >
          Fries
        </Link>
        <Typography color="primary" variant="h6" className={classes.breadcrumbsWeight}>
          Curly Fries
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsUI;
