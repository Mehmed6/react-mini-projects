import ProductCard from "./ProductCard.jsx";
import {Grid} from "@mui/material";


export default function ProductList({products}) {
    return (
       <Grid container spacing={2}>
           {products.map(product => (
               <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
                     <ProductCard product={product}/>
               </Grid>
           ))}
       </Grid>
    )
}