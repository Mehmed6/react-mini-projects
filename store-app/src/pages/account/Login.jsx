import {Avatar, Box, Button, CircularProgress, Container, Paper, TextField, Typography} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "./accountSlice.js";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router";

export default function LoginPage() {

    const dispatch = useDispatch();
    const {status} = useSelector(state => state.accountStore)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    async function handleForm(data) {
        try {
           await dispatch(loginUser(data)).unwrap();
           navigate(from, {replace: true});
        } catch (err) {
            toast.error(err?.error || "Login failed");
        }

    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{padding: 2}} elevation={3}>
                <Avatar sx={{mx: "auto", mb: 2, color: "secondary.main"}} >
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign: "center", mb: 2}}>
                    Login
                </Typography>
                <Box component="form" sx={{mb: 2}} onSubmit={handleSubmit(handleForm)} noValidate>
                    <TextField
                        {...register("username", {
                            required: "Username is required",
                            minLength: {value: 3, message: "Username must be at least 3 characters long"}
                        })}
                        label="Username"
                        size="small"
                        fullWidth
                        required
                        autoFocus
                        sx={{mb: 2}}
                        helperText={errors.username?.message}
                        error={!!errors.username}
                    />
                    <TextField
                        {...register("password", {
                            required: "Password is required",
                            minLength: {value: 6, message: "Password must be at least 6 characters long"}
                        })}
                        label="Password"
                        type="password"
                        size="small"
                        fullWidth
                        required
                        sx={{mb: 2}}
                        helperText={errors.password?.message}
                        error={!!errors.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{mt: 1}}
                        color="secondary"
                    >
                        {status === "pending" ? <CircularProgress size="25px"/> : "Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}