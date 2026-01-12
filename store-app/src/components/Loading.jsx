import {Backdrop, Box, CircularProgress, Typography} from "@mui/material";

export default function Loading({message = "Loading..."}) {
    return (
        <Backdrop open={true}>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                <CircularProgress size={120} color="secondary" />
                <Typography variant="h3" sx={{justifyContent:"center", position:"fixed", top:"60%"}}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}