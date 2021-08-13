import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadcrumbsUI from "./BreadcrumbsUI";
import ItemUi from "./ItemUI";
import SimilarProducts from "./SimilarProducts";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    flexGrow: 1,
    background: "#ffffff",
    [theme.breakpoints.up("md")]: {
      paddingRight: "122px",
      paddingLeft: "122px",
    },
    paddingRight: "12px",
    paddingLeft: "12px",
    paddingTop: "100px",
    paddingBottom: "94px",
  },
}));
const MainPage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.itemContainer}>
      <BreadcrumbsUI />
      <ItemUi />
      <Divider />
      <SimilarProducts />
      </div>
  );
};

export default MainPage;
