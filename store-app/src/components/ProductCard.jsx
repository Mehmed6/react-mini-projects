import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Typography
} from "@mui/material";
import {currencyTRY} from "../utils/formats.js";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router";
import {useState} from "react";
import requests from "../api/apiClient.js";
import {useCartContext} from "../context/CartContext.jsx";

export default function ProductCard({product}) {
    const [loading, setLoading] = useState(false);
    const {setCart} = useCartContext();

    const handleAddItem =  async id => {
        setLoading(true);
        try {
            const response = await requests.cart.addItem(id);
            setCart(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card>
            <CardActionArea component={Link} to={`/products/${product.id}`}>
                <CardMedia
                    sx={{height: 160, backgroundSize: 'contain'}}
                    image={`http://localhost:5000/images/${product.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" color="primary.dark">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" color="secondary.dark">
                        {currencyTRY.format(product.price)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
                <Button onClick={() => handleAddItem(product.id)}>{loading ? <CircularProgress size={20} /> : "Sepete Ekle"}</Button>
            </CardActions>
        </Card>
    )

}