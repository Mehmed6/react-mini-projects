import {Box, Button, CircularProgress, Grid, Paper, Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";
import Info from "./Info.jsx";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";
import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {useDispatch} from "react-redux";
import requests from "../../api/apiClient.js";
import {toast} from "react-toastify";
import {clearCart} from "../cart/cartSlice.js";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];
const getStepContent = step => {
    switch (step) {
        case 0: return <AddressForm />;
        case 1: return <PaymentForm />;
        case 2: return <Review />;
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [loading, setLoading] = useState(false);
    const methods = useForm();
    const dispatch = useDispatch();

    const handlePrevious = () => {
        setActiveStep(activeStep - 1);
    }

    const handleNext = async (formData) => {
        if (activeStep === 2){
            setLoading(true);
            try {
                const result = await requests.orders.createOrder(formData);
                setOrderId(result.orderId)
                setActiveStep(activeStep + 1);
                dispatch(clearCart())
            } catch (error) {
                toast.error("Error creating order", error)
            } finally {
                setLoading(false);
            }
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid container spacing={3}>
                    {activeStep !== steps.length && (
                        <Grid size={4} sx={{p: 3, borderRight: "1px solid", borderColor: "divider"}}>
                            <Info/>
                        </Grid>
                    )}
                    <Grid size={activeStep !== steps.length ? 8 : 12} sx={{p: 3}}>
                        <Stepper activeStep={activeStep} sx={{height: 40, mb: 4}}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Stack>
                                <Typography variant="h5" gutterBottom>Siparişiniz alındı..</Typography>
                                <Typography variant="body1" gutterBottom>
                                    Sipariş numaranız <strong>{orderId}</strong>. Sipariş
                                    onaylandığından size bir eposta göndereceğiz.
                                </Typography>
                                <Button sx={{alignSelf:"start", mt:3}} variant="contained" color="secondary">
                                    Siparisleri Listele
                                </Button>
                            </Stack>
                        ) : (
                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}

                                <Box sx={[
                                    {display: "flex"},
                                    activeStep !== 0 ? {justifyContent: "space-between"} : {justifyContent: "flex-end"}
                                ]}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handlePrevious}
                                                startIcon={<ChevronLeftRounded/>}
                                                variant="contained"
                                                color="secondary"
                                        >
                                            Geri
                                        </Button>
                                    )}
                                    <Button type="submit"
                                            startIcon={<ChevronRightRounded/>}
                                            variant="contained"
                                            color="secondary"
                                    >
                                        {loading ? (
                                            <CircularProgress size="20px" />
                                        ) : activeStep === 2 ? (
                                            "Siparişi Tamamla"
                                        ) : (
                                            "İleri"
                                        )}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </FormProvider>

    )
}