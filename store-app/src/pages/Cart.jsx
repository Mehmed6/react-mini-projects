
import {
    Button, CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {currencyTRY} from "../utils/formats.js";
import {useCartContext} from "../context/CartContext.jsx";
import {useState} from "react";
import requests from "../api/apiClient.js";


export default function CartPage() {
    const {cart, setCart} = useCartContext();
    const [status, setStatus] = useState({loading: false, id: ""});

    const subTotal = cart?.cartItems.reduce((sum, item) => sum + item.product.price * item.product.quantity, 0);
    const tax = subTotal * 0.18;
    const total = subTotal + tax;

    function handleAddItem(productId, id) {
        setStatus({loading: true, id: id});
        requests.cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, id: ""}));
    }

    function handleRemoveItem(productId, id, quantity = 1) {
        setStatus({loading: true, id: id});
        requests.cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setStatus({loading: false, id: ""}));
    }

    if (!cart || cart.cartItems.length === 0) return <Typography variant="h3" component="h1">Sepetinizde Ürün Yok</Typography>
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: 100}}></TableCell>
                        <TableCell>Ürün</TableCell>
                        <TableCell sx={{width: 120}}>Fiyat</TableCell>
                        <TableCell sx={{width: 170}}>Adet</TableCell>
                        <TableCell sx={{width: 120}}>Toplam</TableCell>
                        <TableCell sx={{width: 50}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <img src={`http://localhost:5000/images/${item.product.image}`}
                                     style={{width: "100%"}}/>
                            </TableCell>
                            <TableCell>{item.product.title}</TableCell>
                            <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemoveItem(item.product.productId, "remove" + item.product.productId)}>
                                    { status.loading && status.id === "remove" + item.product.productId ? (
                                        <CircularProgress size={20}/>
                                        ) :
                                        <RemoveCircleOutlineIcon/>
                                    }
                                </Button>
                                {item.product.quantity}
                                <Button onClick={() => handleAddItem(item.product.productId, "add" + item.product.productId)}>
                                    {status.loading && status.id === "add" + item.product.productId ? (
                                        <CircularProgress size={20}/>
                                    ) :
                                        <AddCircleOutlineIcon/>
                                    }
                                </Button>
                            </TableCell>
                            <TableCell>{currencyTRY.format(item.product.price * item.product.quantity)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemoveItem(item.product.productId,
                                                                        "delete_all" + item.product.productId,
                                                                        item.product.quantity)}>
                                    {status.loading && status.id === "delete_all" + item.product.productId ? (
                                        <CircularProgress size={20} color="error"/>
                                    ) : <DeleteIcon color="error"/>
                                    }
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="right" colSpan={5}>
                            Ara Toplam:
                        </TableCell>
                        <TableCell>
                            {currencyTRY.format(subTotal)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={5}>
                            Vergi
                        </TableCell>
                        <TableCell align="right" colSpan={5}>
                            {currencyTRY.format(tax)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={5}>
                            Toplam
                        </TableCell>
                        <TableCell align="right" colSpan={5}>
                            {currencyTRY.format(total)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}