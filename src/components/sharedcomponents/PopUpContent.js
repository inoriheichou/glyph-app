/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    background: "#ffffff",
    overflow: 'hidden'
  },
  cardborder: {
    borderRadius: "19px",
    border: "1px solid #e0e0e0",
    padding: "8px",
    marginBottom: "8px",
  },
  header: {
    padding: "12px",
    backgroundColor: "#0CA8AC",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  headerText: {
    fontSize: "15px",
    padding: "8px",
  },
  cardContainer: {
    paddingTop: "16px",
    paddingRight: "16px",
    paddingLeft: "16px",
    borderRadius: "19px",
  },
  button: {
    borderRadius: "34px",
    fontSize: "15px",
    textTransform: "none",
    backgroundColor: "#ffffff",
    fontWeight: "500",
    paddingTop: "12px",
    paddingBottom: "12px",
    lineHeight: "18px",
    margin: '18px',
    minWidth: '220px'
  },
}));

const PopUpContent = (props) => {
  const classes = useStyles();
  const { data, type } = props;

  return (
    <div className={classes.itemContainer}>
      {type === "header_wishlist" || type === "header_cart" ? (
        <React.Fragment>
          <div className={classes.header}>
            <AddCircleIcon />
            <Typography variant="subtitle1" className={classes.headerText}>
              {type === "header_wishlist"
                ? "Product Added to Wishlist"
                : "Product Added to your Cart"}
            </Typography>

            <HighlightOffIcon />
          </div>
          <div className={classes.cardContainer}>
            {data?.map((element, i) => {
              return (
                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Grid
                        container
                        spacing={1}
                        className={classes.cardborder}
                      >
                        <Grid item xs={12} sm={5}>
                          <img
                            src={element.image}
                            alt="fries"
                            style={{
                              objectFit: "cover",
                              maxHeight: "90px",
                              maxWidth: "100%",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Typography
                            variant="h6"
                            style={{
                              marginTop: "8px",
                              marginBottom: "8px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              fontSize: "15px",
                              lineHeight: "18px",
                            }}
                            display="block"
                            gutterBottom
                          >
                            {element.name}
                          </Typography>
                          <Typography
                            variant="h6"
                            style={{
                              marginTop: "8px",
                              marginBottom: "8px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              fontSize: "15px",
                              lineHeight: "18px",
                            }}
                            display="block"
                            gutterBottom
                          >
                            ₱{element.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : type === "add_wishlist"|| type === "add_cart" ? (
        <React.Fragment>
          <div className={classes.header}>
            <AddCircleIcon />
            <Typography variant="subtitle" className={classes.headerText}>
              {type === "add_wishlist"
                ? "Product Added to Wishlist"
                : "Product Added to your Cart"}
            </Typography>

            <HighlightOffIcon />
          </div>
          <div className={classes.cardContainer}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={1} className={classes.cardborder}>
                    <Grid item xs={12} sm={5}>
                      <img
                        src={data.image}
                        alt="fries"
                        style={{
                          objectFit: "cover",
                          maxHeight: "90px",
                          maxWidth: "100%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography
                        variant="h6"
                        style={{
                          marginTop: "8px",
                          marginBottom: "8px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "15px",
                          lineHeight: "18px",
                        }}
                        display="block"
                        gutterBottom
                      >
                        {data.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          marginTop: "8px",
                          marginBottom: "8px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "15px",
                          lineHeight: "18px",
                        }}
                        display="block"
                        gutterBottom
                      >
                        ₱{data.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        
      <Button
        variant="contained"
        className={classes.button}
      >
        
        {type === "add_wishlist"
                ? "View your Wishlist"
                : "View your Cart"}
      </Button>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default PopUpContent;
