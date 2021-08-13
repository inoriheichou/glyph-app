import React, { useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { LocalStorage } from "../DataFiles/LocalStorage";
import { Avatar, Popover } from "@material-ui/core";
import PopUpContent from "./PopUpContent";
import profile from "../../assets/img/Profile.png";
const ls = new LocalStorage();

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  customBadge: {
    backgroundColor: "#ffffff",
    color: "#000000",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
  },
  search: {
    position: "relative",
    borderRadius: "50px",
    border: "1px solid #C4C4C4",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    minWidth: "320px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const HeaderComponent = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [wishlistCount, setWishListCount] = React.useState(0);
  const [wishlistData, setWishListData] = React.useState({});
  const [cartCount, setCartCount] = React.useState(0);
  const [cartData, setCartData] = React.useState({});

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElWishList, setAnchorElWishList] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const openWishList = Boolean(anchorElWishList);
  const openCart = Boolean(anchorElCart);

  useEffect(() => {
    if (ls.getItem("wishlist")) {
      setWishListCount(JSON.parse(ls.getItem("wishlist")).length);
    }
    if (ls.getItem("wishlist")) {
      setCartCount(JSON.parse(ls.getItem("cart")).length);
      setCartData(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // functions
  const handleClickWishList = (event) => {
    if (ls.getItem("wishlist")) {
      setWishListCount(JSON.parse(ls.getItem("wishlist")).length);
      setWishListData(JSON.parse(ls.getItem("wishlist")));
      setAnchorElWishList(event.currentTarget);
    }
  };

  const handleCloseWishList = () => {
    setAnchorElWishList(null);
  };

  const handleClickCart = (event) => {
    if (ls.getItem("cart")) {
      setCartCount(JSON.parse(ls.getItem("cart")).length);
      setCartData(JSON.parse(ls.getItem("cart")));
      setAnchorElCart(event.currentTarget);
    }
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClickWishList} aria-describedby="wishlist">
        <IconButton color="primary" aria-label="show items">
          <Badge
            badgeContent={wishlistCount}
            classes={{ badge: classes.customBadge }}
          >
            <FavoriteIcon style={{fontSize:'35px'}}/>
          </Badge>
        </IconButton>
        <p>Wishlist</p>
      </MenuItem>
      <MenuItem onClick={handleClickCart} aria-describedby="cart">
        <IconButton aria-label="show items" color="primary">
          <Badge
            badgeContent={cartCount}
            classes={{ badge: classes.customBadge }}
          >
            <ShoppingCartIcon style={{fontSize:'35px'}}/>
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton>
          <Avatar alt="icon" src={profile} style={{height:'40px'}}/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="inherit">
        <Popover
          id="wishlist"
          open={openWishList}
          anchorEl={anchorElWishList}
          onClose={handleCloseWishList}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {wishlistData.length ? (
            <React.Fragment>
              <PopUpContent type="header_wishlist" data={wishlistData} />
            </React.Fragment>
          ) : (
            <div>no data available</div>
          )}
        </Popover>
        <Popover
          id="cart"
          open={openCart}
          anchorEl={anchorElCart}
          onClose={handleCloseCart}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {cartData.length ? (
            <React.Fragment>
              <PopUpContent type="header_cart" data={cartData} />
            </React.Fragment>
          ) : (
            <div>no data available</div>
          )}
        </Popover>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="open drawer"
          >
            <MenuIcon style={{fontSize:'35px'}}/>
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show items" color="primary">
              <Badge
                badgeContent={wishlistCount}
                classes={{ badge: classes.customBadge }}
                onClick={handleClickWishList}
                aria-describedby="wishlist"
              >
                <FavoriteIcon style={{fontSize:'35px'}}/>
              </Badge>
            </IconButton>
            <IconButton aria-label="show items" color="primary">
              <Badge
                badgeContent={cartCount}
                classes={{ badge: classes.customBadge }}
                onClick={handleClickCart}
                aria-describedby="cart"
              >
                <ShoppingCartIcon style={{fontSize:'35px'}}/>
              </Badge>
            </IconButton>
            <IconButton>
              <Avatar alt="icon" src={profile} style={{height:'40px'}}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default HeaderComponent;
