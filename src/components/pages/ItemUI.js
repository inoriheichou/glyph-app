/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { displayData } from "../DataFiles/Food.helper";
import { Grid, Popover, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { LocalStorage } from "../DataFiles/LocalStorage";
import PopUpContent from "../sharedcomponents/PopUpContent";

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
    marginBottom: "70px",
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
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  rowDirection: {
    display: "flex",
    flexDirection: "row",
  },
  selectRoot: {
    "&:focus": {
      backgroundColor: "#ffffff",
    },
  },
  button: {
    marginTop: "40px",
    marginRight: "27px",
    borderRadius: "34px",
    fontSize: "20px",
    textTransform: "none",
    backgroundColor: "#ffffff",
    fontWeight: "500",
    paddingTop: "15px",
    paddingBottom: "15px",
    lineHeight: "23px",
  },
  clicked: {
    marginTop: "40px",
    marginRight: "27px",
    borderRadius: "34px",
    fontSize: "20px",
    textTransform: "none",
    backgroundColor: "#0CA8AC",
    color: "#ffffff",
    fontWeight: "500",
    paddingTop: "15px",
    paddingBottom: "15px",
    lineHeight: "23px",
  },
}));

const ItemUi = (props) => {
  const classes = useStyles();
  const [content, setContent] = useState({
    loading: true,
    data: [],
  });
  const [shownImage, setShownImage] = useState("");
  const [size, setSize] = useState("Regular");
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(false);
  const [wishlist, setWishList] = React.useState(false);
  const [flavor, setFlavor] = React.useState("Original");
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [cartData, setCartData] = React.useState({});
  const [anchorElWishList, setAnchorElWishList] = React.useState(null);
  const [wishlistData, setWishListData] = React.useState({});

  useEffect(() => {
    if (displayData) {
      setContent({ ...data, loading: false, data: displayData[0] });
      setShownImage(displayData[0]["imgURL"][0]);
    }
  }, [displayData]);

  useEffect(() => {
    setCart(false);
    setWishList(false);
  }, [size, flavor]);

  const { loading, data } = content;
  // functions

  const handleClickCart = (event) => {
    const AddItem = {
      name: data.name,
      image: shownImage,
      price: computeDiscount(data.price, data.discount),
      size: size,
      flavor: flavor,
    };
    let a = [];
    a = JSON.parse(ls.getItem("cart")) || [];
    a.push(AddItem);
    localStorage.setItem("cart", JSON.stringify(a));
    setCartData(AddItem);
    setCart(true);
    setAnchorElCart(event.currentTarget);
    // pop up will disapper after 2 seconds
    setTimeout(() => {
      setAnchorElCart(null);
    }, 2000);
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  const openCart = Boolean(anchorElCart);

  const handleClickWishList = (event) => {
    const AddItem = {
      name: data.name,
      image: shownImage,
      price: computeDiscount(data.price, data.discount),
      size: size,
      flavor: flavor,
    };
    let a = [];
    a = JSON.parse(ls.getItem("wishlist")) || [];
    a.push(AddItem);
    ls.setItem("wishlist", JSON.stringify(a));
    setWishListData(AddItem);
    setWishList(true);
    setAnchorElWishList(event.currentTarget);
    // pop up will disapper after 2 seconds
    // setTimeout(() => {
    //   setAnchorElWishList(null);
    // }, 2000);
  };

  const handleCloseWishList = () => {
    setAnchorElWishList(null);
  };

  const openWishList = Boolean(anchorElWishList);

  const computeDiscount = (price, discount) => {
    return (price - price * (discount / 100)).toFixed(2);
  };

  const handleChange = (e, newValue) => {
    e.preventDefault();
    if (newValue !== null) {
      setSize(newValue);
    }
  };
  const handleChangeSelect = (event) => {
    setFlavor(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpen(false);
  };

  const handleOpenSelect = () => {
    setOpen(true);
  };

  // end of functions
  return (
    <div className={classes.itemContainer}>
      {!loading ? (
        <Grid container spacing={6}>
          <Popover
            id="wishlist"
            open={openWishList}
            anchorEl={anchorElWishList}
            onClose={handleCloseWishList}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 50, left: 3000 }}
          >
            <PopUpContent type="add_wishlist" data={wishlistData} />
          </Popover>

          <Popover
            id="cart"
            open={openCart}
            anchorEl={anchorElCart}
            onClose={handleCloseCart}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 50, left: 3000 }}
          >
            <PopUpContent type="add_cart" data={cartData} />
          </Popover>

          <Grid item xs={12} sm={5}>
            <img
              src={shownImage}
              alt="fries"
              style={{
                objectFit: "cover",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            />
            <Grid container spacing={2} className={classes.mv12}>
              {data?.imgURL.map((img, i) => (
                <Grid item xs={3} sm={3} key={i}>
                  <img
                    src={img}
                    alt="fries"
                    style={{
                      objectFit: "cover",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} className={classes.details}>
            <Typography
              variant="h6"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "18px",
                lineHeight: "21px",
              }}
              display="block"
              gutterBottom
            >
              {data?.type}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "30px",
                lineHeight: "35px",
              }}
              display="block"
              gutterBottom
            >
              {data?.name}
            </Typography>
            <div className={classes.rowDirection}>
              <Typography
                variant="subtitle1"
                color="secondary"
                style={{
                  marginTop: "8px",
                  marginBottom: "8px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "16px",
                  lineHeight: "19px",
                  textDecoration: "line-through",
                }}
              >
                ₱{data?.price}
              </Typography>
              <Typography
                variant="subtitle1"
                color="error"
                style={{
                  marginTop: "8px",
                  marginBottom: "8px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginLeft: "8px",
                }}
              >
                ({data?.discount}% OFF)
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "30px",
                lineHeight: "35px",
              }}
            >
              ₱{computeDiscount(data?.price, data?.discount)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "19px",
              }}
            >
              Additional tax may apply on checkout
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "20px",
                lineHeight: "23px",
              }}
            >
              select size
            </Typography>
            <div className={classes.rowDirection}>
              <CustomToggleButton
                size="large"
                value={size}
                exclusive
                onChange={handleChange}
              >
                {data?.size.map((size, i) => {
                  return (
                    <ToggleButton
                      value={size}
                      key={i}
                      color="primary"
                      size="small"
                      style={{
                        marginRight: "5px",
                        padding: "15px",
                        border: "none",
                        borderRadius: "34px",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ textDecoration: "none" }}
                      >
                        {size}
                      </Typography>
                    </ToggleButton>
                  );
                })}
              </CustomToggleButton>
            </div>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "20px",
                lineHeight: "23px",
              }}
            >
              select flavor
            </Typography>
            <Select
              open={open}
              onClose={handleCloseSelect}
              onOpen={handleOpenSelect}
              value={flavor}
              onChange={handleChangeSelect}
              variant="outlined"
              classes={{ root: classes.selectRoot }}
              style={{
                borderRadius: "44px",
                width: "357px",
                height: "42px",
                backgroundColor: "#ffffff",
              }}
            >
              {data?.flavors.map((flavor, i) => {
                return (
                  <MenuItem value={flavor} key={i}>
                    {flavor}
                  </MenuItem>
                );
              })}
            </Select>
            <div className={classes.rowDirection}>
              {!wishlist ? (
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={
                    <FavoriteIcon
                      color="primary"
                      style={{ fontSize: "32px" }}
                    />
                  }
                  onClick={handleClickWishList}
                  size="large"
                >
                  Add to Wishlist
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.clicked}
                  color="primary"
                  startIcon={
                    <FavoriteIcon
                      style={{ fontSize: "32px", color: "#ffffff" }}
                    />
                  }
                >
                  On Wishlist
                </Button>
              )}
              {!cart ? (
                <Button
                  variant="contained"
                  className={classes.button}
                  startIcon={
                    <ShoppingCartIcon
                      color="primary"
                      style={{ fontSize: "32px" }}
                    />
                  }
                  onClick={handleClickCart}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.clicked}
                  color="primary"
                  startIcon={
                    <ShoppingCartIcon
                      style={{ fontSize: "32px", color: "#ffffff" }}
                    />
                  }
                >
                  Added to Cart
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress color="primary" />
      )}
    </div>
  );
};

export default ItemUi;
