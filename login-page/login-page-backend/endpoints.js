import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {requiredAuth} from "./auth.js";
import {User} from "./db/models/User.js";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rememberMe: z.boolean().optional().default(false),
});

const DEMO_USER = {
    id: 1,
    email: "demo@gmail.com",
    password: await bcrypt.hash("123456", 10),
}

const callback = (req, res) => {
    res.json({ message: "Login endpoint reached" });
};

const loginCallback = async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation failed",
            details: z.treeifyError(parsed.error),
        })
    }

    const {email, password, rememberMe} = parsed.data;

    const user = await User.findOne({email});

    if (!user)
        return res.status(401).json({message: "Email not found"});

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
        return res.status(401).json({message: "Password is incorrect"});

    const token = jwt.sign(
        {sub: user._id.toString()},
        process.env.JWT_SECRET,
        {expiresIn: rememberMe ? "2h" : "1h"}
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
    })

    res.json({status: "success", user: {id: user._id.toString(), email: user.email}});
}

const meCallback = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById({_id: userId});

    if (!user)
        return res.status(404).json({message: "User not found"});

    res.json({
        status: "success",
        user: {
            id: user._id.toString(),
            email: user.email,
        }
    })
}

const logoutCallback = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.json({status: "success", message: "Logout successfully"});
};

const mongoDbCallback = async (req, res) => {
    const passwordHash = await bcrypt.hash("654321", 10);

    const user = await User.create({
        email: "test@test.com",
        password: passwordHash
    });

    res.json({
        status: "success",
        userId: user._id,
    })
}

export const createEndpoints = (app) => {
    app.get("/login", callback);
    app.post("/api/auth/login", loginCallback);
    app.get("/api/auth/me",requiredAuth, meCallback);
    app.post("/api/auth/logout", logoutCallback);
    app.post("/api/test/create-user", mongoDbCallback)

}

export const startServer = (app, port) => {
    app.listen(port, () => console.log(`Server is running on port:${port}`));
}