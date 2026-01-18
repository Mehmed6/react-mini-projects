import {useFormContext} from "react-hook-form";
import {Grid, TextField} from "@mui/material";

export default function AddressForm() {
    const {register, formState: {errors}} = useFormContext();

    return (
        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("firstname", {
                        required: "Firstname is required!"})}
                    label="First Name"
                    size="small"
                    fullWidth
                    autoFocus
                    sx={{mb: 2}}
                    error={!!errors.firstname}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("lastname", {
                        required: "Lastname is required!"})}
                    label="Last Name"
                    size="small"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.lastname}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("phone", {
                        required: "Phone is required!"})}
                    label="Enter phone"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.phone}
                />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("city", {
                        required: "City is required!"})}
                    label="Enter city"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.city}
                />
            </Grid>
            <Grid size={{xs: 12}}>
                <TextField
                    {...register("address", {
                        required: "Address Line is required!"})}
                    label="Enter address"
                    size="small"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    error={!!errors.address}
                />
            </Grid>
        </Grid>
    )
}