import express from "express";
import prisma from "./config/prisma";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async function (_, res) {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post("/login", async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Some fields are missing, please try again" });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
        return res.status(401).json({ message: "The password you’ve entered is incorrect" });
    res.json(user);
});

app.post("/register", async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Some fields are missing, please try again" });
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(409).json({ message: "A user with the same email already exists" });
    const user = await prisma.user.create({ data: { email, password } });
    res.json(user);
});

app.post("/google", async function (req, res) {
    const { token } = req.body;
    const google = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    if (!google || !google.email) {
        return res.status(401).json({ message: "There was an error authenticating with Google" });
    }

    const userExists = await prisma.user.findUnique({ where: { email: google.email } });

    if (!userExists) {
        const user = await prisma.user.create({ data: { email: google.email, googleId: google.sub } });
        return res.json(user);
    }

    if (!userExists.googleId) {
        const user = await prisma.user.update({ where: { email: google.email }, data: { googleId: google.sub } });
        return res.json(user);
    }

    res.json(userExists);
});

export default app;
