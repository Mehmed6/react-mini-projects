import {Alert, AlertTitle, Box, Button, List, ListItem, ListItemText} from "@mui/material";
import requests from "../../api/apiClient.js";
import {useState} from "react";

export default function ErrorPage() {
    const [validationErrors, setValidationErrors] = useState({});

    function getValidationError() {
        requests.errors.get403Error().catch(setValidationErrors)
    }
    return (
        <Box>
            {validationErrors && validationErrors.errors && (
                <Alert severity="error" sx={{mb: 2}}>
                    <AlertTitle>{validationErrors.message}</AlertTitle>
                    <List>
                        {validationErrors.errors.map((error, index) => (
                            <ListItem key={index}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}
            <Button sx={{mr: 2}} variant="outlined" color="error" onClick={() => requests.errors.get400Error()}>
                Bad Request
            </Button>
            <Button sx={{mr: 2}} variant="outlined" color="error" onClick={() => requests.errors.get401Error()}>
                UnAuthorized
            </Button>
            <Button sx={{mr: 2}} variant="outlined" color="error" onClick={getValidationError}>
                Validation Error
            </Button>
            <Button sx={{mr: 2}} variant="outlined" color="error" onClick={() => requests.errors.get404Error()}>
                Not Found
            </Button>
            <Button sx={{mr: 2}} variant="outlined" color="error" onClick={() => requests.errors.get500Error()}>
                Server Error
            </Button>
        </Box>
    )
}