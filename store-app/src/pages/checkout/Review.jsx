import {useFormContext} from "react-hook-form";
import {Box, Divider, Stack, Typography} from "@mui/material";

export default function Review() {
    const {getValues} = useFormContext();

    return (
        <Stack direction="row" spacing={15} sx={{my: 5}} divider={<Divider orientation="vertical" flexItem/>}>
            <Box>
                <Typography variant="subtitle2" gutterBottom>
                    Teslimat Bilgileri
                </Typography>
                <Typography gutterBottom>
                    {getValues("firstname")} {getValues("lastname")}
                </Typography>
                <Typography gutterBottom>
                    {getValues("phone")}
                </Typography>
                <Typography gutterBottom>
                    {getValues("address")} / {getValues("city")}
                </Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2" gutterBottom>
                    Ödeme Bilgileri
                </Typography>
                <Typography gutterBottom>{getValues("cardname")}</Typography>
                <Typography gutterBottom>{getValues("cardnumber")}</Typography>
                <Typography gutterBottom>{getValues("expirydate")}</Typography>
            </Box>
        </Stack>
    )
}