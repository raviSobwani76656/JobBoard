const express = require("express");
const db = require("../models")
const User = db.User;
const bcrypt = require("bcryptjs");
const generateJWTToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;


        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.log("User to be Registered Already Exists");
            return res.status(400).json({ status: false, message: "User already exists with this email." });
        }


        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);


        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: role || "user"
        });

        return res.status(200).json({ status: true, message: "User Created Successfully" });

    } catch (error) {
        console.error("Error Occurred While Creating the User:", error);
        return res.status(500).json({ status: false, message: "Error occurred while creating the user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Email and password are required." });
        }


        const currentUser = await User.findOne({ where: { email } });

        if (!currentUser) {
            console.log("User does not exist. Please check the email or password.");
            return res.status(400).json({ status: false, message: "User does not exist. Please check the email or password." });
        }



        const isMatched = await bcrypt.compare(password, currentUser.password);

        if (!isMatched) {
            return res.status(400).json({ status: false, message: "The entered password is incorrect." });
        }

        console.log(currentUser);


        const token = generateJWTToken({ id: currentUser.id, email: currentUser.email, role: currentUser.role, name: currentUser.name })

        res.status(200).json({ status: true, message: "Login successful.", token });

    } catch (error) {
        console.error("Error Occurred while logging in:", error);
        return res.status(500).json({ status: false, message: "Error occurred while logging in." });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: false, message: "Please provide a valid email address." });
        }

        const currentUser = await User.findOne({ where: { email } });

        if (!currentUser) {
            return res.status(400).json({ status: false, message: "The user you are looking for does not exist." });
        }

        const token = generateJWTToken({
            id: currentUser.id,
            name: currentUser.name,
            role: currentUser.role,
            email: currentUser.email
        });

        const forgotPasswordLink = `http://localhost:4088/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // ✅ Make sure it's `pass`, not `password`
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Recovery Email",
            text: `Please click on the following link to reset your password: ${forgotPasswordLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ status: false, message: "Failed to send recovery email." });
            } else {
                console.log("Email sent:", info.response);
                return res.status(200).json({ status: true, message: "Recovery email sent successfully." });
            }
        });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ status: false, message: "Server error occurred while sending recovery email." });
    }
};


const upDatePasswod = async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                status: false,
                message: "New password is required for password update"
            });
        }

        const id = req.user.id;

        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "The user you are trying to update does not exist"
            });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(newPassword, saltRounds);

        await user.update({ password: hashPassword });

        return res.status(200).json({
            status: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while updating the password"
        });
    }
};





module.exports = { createUser, loginUser, forgotPassword, upDatePasswod };
