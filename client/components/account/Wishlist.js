import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Paper,
  Button,
  Grid,
  Item,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddItem from "./AddItem";
import wishlist, { getWishlist, deleteFromWishlist } from "../../store/wishlist";
import { getAllLists } from "../../store/wishlists";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

class Wishlist extends Component {
  constructor(){
    super();
    this.state={
      anchorEl: null,
      open: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)

  }

  componentDidMount() {
    this.props.getWishlist(this.props.match.params.id);
    this.props.getAllLists();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.props.getWishlist(this.props.match.params.id);
    }
  }

  onClick(gift,wishlistId){
    this.props.deleteFromWishlist(gift,wishlistId);

  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    })
  }


  handleClose() {
    this.setState({
      anchorEl: null,
      open: !this.state.open
    })
  }

  renderMenu(){
    return(
    // <Menu id="fade-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade}>
    //       <MenuItem onClick={this.handleClose}>Profile</MenuItem>
    //       <MenuItem onClick={this.handleClose}>My account</MenuItem>
    //       <MenuItem onClick={this.handleClose}>Logout</MenuItem>
    // </Menu>

    <Menu
      id="list-menu"
      anchorEl={this.state.anchorEl}
      open={this.state.open}
      onClose={this.handleClose}
      >
      {this.props.wishlists.map(list=>{
        return (
        <MenuItem key = {list.id} onClick={()=>{
          // onClick(product,list.id)
          console.log('CLICK');
          this.handleClose()
          }}>
          {list.name}
        </MenuItem>)
      })}
    </Menu>
    )
  }

  render() {
    if (!this.props.wishlist) {
      return null;
    }

    if (!this.props.wishlist.gifts || this.props.wishlist.gifts.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={12}
            sx={{
              border: 1,
              borderColor: "#f4eee0",
              backgroundColor: "#f4eee0",
            }}
          >
            <Button variant="contained" startIcon={<AddIcon />}>
              Add Item
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              endIcon={<FavoriteBorderIcon />}
            >
              Add Item From Your Favorite List
            </Button>
            <AddItem />
          </Paper>
        </Box>
      );
    }

    const wishListGifts = this.props.wishlist.gifts;

    return (
      <Grid container m="50px">
        <div>
          <h1>{this.props.wishlist.name}</h1>
          {wishListGifts.map((gift) => {
            return (
              <div key={gift.id}>
                <Grid container spacing={2}>
                  <Grid item sx={{ width: 500, height: 500 }}>
                    <img src={gift.image_url} width="90%" />
                  </Grid>

                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontSize="30px"
                          component="div"
                        >
                          <a href={gift.url}>{gift.name}</a>
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          fontSize="28px"
                        >
                          {`$${gift.price}`}
                        </Typography>
                        <Box  display="flex" justifyContent="space-between">
                        <Button
                          onClick={this.onClick.bind(this,gift,this.props.wishlist.id)}
                          color="primary"
                          fontSize="30 "
                          variant="contained"
                          endIcon={<DeleteIcon style={{ fontSize: 40 }} />}
                        >
                          Delete
                        </Button>
                        <Button
                          aria-owns={this.state.open ? 'list-menu' : undefined}
                          onClick={this.handleClick}
                          color="primary" 
                          fontSize="30 " 
                          variant="contained" 
                          endIcon={<ArrowDropDownIcon style={{ fontSize: 40 }}/>}>
                          Move To Wishlist
                        </Button>
                        {this.renderMenu()}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function (id) {
      dispatch(getWishlist(id));
    },
    getAllLists: function () {
      dispatch(getAllLists());
    },
    deleteFromWishlist: function(gift,wishlistId){
      dispatch(deleteFromWishlist(gift,wishlistId));
    }
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);
