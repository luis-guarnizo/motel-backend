import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const { email, password, username, role } = req.body;
    console.log(email, password, username, role);

    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email alredy exists"])
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            turno: '',
            estadoTurno: false,
        })
        console.log(newUser);

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            turno: userSaved.turno,
            estadoTurno: userSaved.estadoTurno,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

        //res.send('registrando...')
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};
export const login = async (req, res) => {


    const { email, password } = req.body;
    //console.log(email, password);

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({
            message: "User not found",
        });

        const isMatch = await bcrypt.compare(password, userFound.password);
        //console.log(userFound.password);
        if (!isMatch) return res.status(400).json({
            message: "Incorrect password",
        });

        const token = await createAccessToken({ id: userFound._id });
        console.log(token)
        res.cookie('token', token, {
            sameSite: "none",
            secure: true,
            httpOnly: false
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

        //res.send('registrando...')
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
};

export const profile = async (req, res) => {
    console.log('User: ')
    console.log(req.user.payload.id)

    const userFound = await User.findById(req.user.payload.id);

    if (!userFound) return res.status(400).json({
        message: "User not found"
    });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

    console.log(userFound);

    // res.send('profile');
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    console.log('El token es: ' + token)

    if (!token) return res.send(false);

    //if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        console.log('usuaruio: ' + user.payload.id)
        console.log('El objeto user es:', JSON.stringify(user, null, 2))

        if (error) return res.status(401).json({ message: "Unauthorized token" });

        const userFound = await User.findById(user.payload.id)
        console.log('user found')
        console.log(userFound)
        if(!userFound) return res.status(401).json({ message: "Unauthorized user"})
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
        });
    });
}