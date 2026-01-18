import {useSelector} from "react-redux";
import {Avatar, ListItem, ListItemAvatar, Typography, List, ListItemText} from "@mui/material";
import {currencyTRY} from "../../utils/formats.js";

export default function Info() {
    const {cart} = useSelector(state => state.cartStore)

    const subTotal = cart?.cartItems.reduce(
        (total, item) => total + item.product.price * item.product.quantity, 0);

    return (
        <>
            <Typography variant="subtitle2" color="text.secondary">
                Toplam
            </Typography>
            <Typography variant="h5" gutterBottom>
                {currencyTRY.format(subTotal)}
            </Typography>
            <List>
                {cart?.cartItems.map(item => (
                    <ListItem key={item.product.productId} sx={{py: 1, px: 0}}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={`http://localhost:5000/images/${item.product.image}`}>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.product.title} secondary={`x ${item.product.quantity}`}>
                        </ListItemText>
                        <Typography>
                            {currencyTRY.format(item.product.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    )
}