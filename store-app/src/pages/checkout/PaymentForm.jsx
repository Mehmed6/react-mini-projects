import {useFormContext} from "react-hook-form";
import {Grid, TextField} from "@mui/material";

export default function PaymentForm() {
    const {register, formState: {errors}} = useFormContext();

    return (
        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("cardname", {
                        required: "Card name is required!"})}
                    label="Card Name"
                    size="small"
                    fullWidth
                    autoFocus
                    sx={{mb: 2}}
                    error={!!errors.cardname}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("cardnumber", {
                        required: "Card Number is required!"})}
                    label="Card Number"
                    size="small"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.cardnumber}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("expirydate", {
                        required: "Expiry Date is required!"})}
                    label="Expiry Date"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.expirydate}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("cvv", {
                        required: "CVV is required!"})}
                    label="CVV"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.cvv}
                />
            </Grid>
        </Grid>
    )
}