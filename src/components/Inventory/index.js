import React from "react";
import { uid } from "react-uid";
import { IconButton, Paper, Button, Grid, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addQuantity, toggleFav } from "../../actions/cart";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      margin: "2px",
    },
    button: {
        margin: theme.spacing(1),
        textTransform: "none",
    },
});

class Inventory extends React.Component {
    render() {
        const { component, classes } = this.props;
        const productList = this.props.isFav ?
            this.props.products.filter(p => p.fav)
            : this.props.products;

        return (
            <div>
                <Grid container justify="center" alignItems="center">
                            <Grid item xs={2}></Grid>
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    <strong>Name</strong>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper elevation={0}  className={classes.paper}>
                                    <strong>Price</strong>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                <Divider />
                {productList.length === 0 ?
                    <Grid container alignItems="center" justify="center">
                        <br /><br /><br />
                        <Grid item xs={8}>
                            <Paper elevation={0} className={classes.paper}>Your list is empty.</Paper>
                        </Grid>
                    </Grid>

                    : productList.map((product) => (
                        <div key={uid(product)}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={2}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        <IconButton
                                            variant="contained"
                                            className={classes.button}
                                            onClick={toggleFav.bind(this, component, product)}
                                        >
                                            {product.fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        {product.name}
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        {"CDN$ "}
                                        <strong>{product.price.toFixed(2)}</strong>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper elevation={0}  className={classes.paper}>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            startIcon={<ShoppingCartIcon />}
                                            onClick={addQuantity.bind(this, component, product)}
                                        >
                                            Add
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Divider />
                        </div>
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Inventory);
