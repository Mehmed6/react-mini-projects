import React, {useState} from 'react';
import "./RegisterPage.scss"
import {
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {requests} from "../api/apiClient.js";
import {toast} from "react-toastify";

const registerSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[0-9]/, "Must contain number"),
    rePassword: z.string().min(6, "Re-Password must be at least 6 characters long"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().optional(),
})
    .refine(data => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    })

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver: zodResolver(registerSchema)});

    const handleClick = () => {
        setShowPassword(!showPassword);
    }
    const handleRePasswordClick = () => {
        setShowRePassword(!showRePassword);
    }

    const handleSubmitClick = async (data) => {
        console.log(data)
        try {
            await requests.account.register(data);
            toast.success("Registered successfully");
            reset();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed");

        }

    }

    return (
        <>
            <Container className="container" maxWidth="md">
                <Paper component="form" elevation={3} noValidate
                       className="paper" onSubmit={handleSubmit(handleSubmitClick)}>
                    <Typography component="h1" variant="h4" className="title" color="secondary">
                        <AccountCircle sx={{ fontSize:"50px" }} />
                        <span >Register</span>
                    </Typography>
                    <Grid container className="input-group" columnSpacing={2} rowSpacing={2}>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("firstName")}
                                label="First Name"
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.firstName ?
                                    <p className="helper"> {errors.firstName.message}</p> : "" }
                            />
                        </Grid>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("lastName")}
                                label="Last Name"
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.lastName ?
                                    <p className="helper"> {errors.lastName.message}</p> : "" }
                            />
                        </Grid>
                        <Grid size={{md:12, sm:12, xs:12}}>
                            <TextField
                                {...register("email")}
                                label="Email"
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.email ?
                                    <p className="helper"> {errors.email.message}</p> : "" }
                                /*slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end" >
                                            <Select variant="standard" sx={{width:"400px"}}>
                                                <MenuItem>
                                                    @gmail.com
                                                </MenuItem>
                                            </Select>
                                        </InputAdornment>
                                    }
                                }}*/
                            />
                        </Grid>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("password")}
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.password ?
                                    <p className="helper"> {errors.password.message}</p> : "" }
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={handleClick}>
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                }}
                            />
                        </Grid>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("rePassword")}
                                label="Re-Password"
                                type={showRePassword ? "text" : "password"}
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.rePassword ?
                                    <p className="helper"> {errors.rePassword.message}</p> : "" }
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={handleRePasswordClick}>
                                                {showRePassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("country")}
                                label="Country"
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.country ?
                                    <p className="helper"> {errors.country.message}</p> : "" }
                            />
                        </Grid>
                        <Grid size={{md:6, sm:12, xs:12}}>
                            <TextField
                                {...register("city")}
                                label="City"
                                fullWidth
                                required
                                color="secondary"
                                helperText={errors.city ?
                                    <p className="helper"> {errors.city.message}</p> : "" }
                            />
                        </Grid>
                        <Grid size={{md:8, sm:12}}>
                            <TextField
                                {...register("address")}
                                label="Address"
                                multiline
                                minRows={2}
                                maxRows={5}
                                required={false}
                                fullWidth
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className="send-button"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Register
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default RegisterPage;