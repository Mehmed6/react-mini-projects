import {z} from "zod";
import {Register} from "./db/models/Register.js";
import bcrypt from "bcrypt";

const registerSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[0-9]/, "Must contain number"),
    rePassword: z.string().min(6, "Re-Password must be at least 6 characters long"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().optional()
})
    .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
});

const registerCallback = async (req, res) => {
    const parsed = registerSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation failed",
            details: z.treeifyError(parsed.error),
        });
    }

    parsed.data.password = await bcrypt.hash(parsed.data.password, 10);
    parsed.data.rePassword = await bcrypt.hash(parsed.data.rePassword, 10);
    parsed.data.address = parsed.data.address || "";

    try {
        const registeredData = await Register.create(parsed.data)

        res.json({status: "success", data: registeredData});
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({message: "Email already registered"});
        }

        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const createEndpoints = app => {
    app.post("/api/register", registerCallback)
}

export const startServer = (app, port) => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}