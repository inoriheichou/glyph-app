/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { getOtherFries } from "../DataFiles/Food.helper";
import { Grid, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { LocalStorage } from "../DataFiles/LocalStorage";

const ls = new LocalStorage();

const CustomToggleButton = withStyles({
  root: {
    "& .MuiToggleButton-root.Mui-selected": {
      backgroundColor: "#0CA8AC",
      color: "#ffffff",
    },
    "& .MuiInputBase-root": {
      "& input": {
        borderRadius: "22px",
      },
    },
  },
})(ToggleButtonGroup);

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    // flexGrow: 1,
    background: "#ffffff",
    marginTop: "32px",
  },
  imageContainer: {
    objectFit: "cover",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  mv12: {
    marginTop: "12px",
    marginBottom: "12px",
  },
  details: {
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  header: {
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: "42px"
  },
}));

const SimilarProducts = (props) => {
  const classes = useStyles();
  const [content, setContent] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    if (getOtherFries) {
      setContent({ ...data, loading: false, data: getOtherFries });
    }
  }, [getOtherFries]);
  const { loading, data } = content;

  return (
    <div className={classes.itemContainer}>
      <Typography variant="h6" gutterBottom className={classes.header}>
        Similar Products
      </Typography>
      {!loading ? (
        <Grid container spacing={5}>
          {data.map((element, i) => {
            return (
              <Grid item xs={12} sm={3} key={i}>
                <img
                  src={element.imgURL}
                  alt={element.name}
                  style={{
                    objectFit: "cover",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
                <Grid
                  container
                  spacing={0}
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    marginTop: "25px",
                  }}
                >
                  <Grid item xs={6} sm={9} className={classes.details}>
                    {element.name}
                  </Grid>
                  <Grid item xs={6} sm={3} justifyContent="flex-end">
                    ₱{element.price}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <CircularProgress color="primary" />
      )}
    </div>
  );
};

export default SimilarProducts;
