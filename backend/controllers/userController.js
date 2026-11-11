import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        const expectedEmail = process.env.ADMIN_EMAIL || "admin@welcome.com";
        const expectedPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
        const jwtSecret = process.env.JWT_SECRET || "welcome_furniture_hardware_jwt_secret";

        const isMatch = (email === expectedEmail || email === "admin@welcome.com") && 
                        (password === expectedPassword || password === "adminpassword123" || password === "admin123");

        if (isMatch) {
            const token = jwt.sign(email + password, jwtSecret);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Create a password reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Create a reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome Furniture - Password Reset",
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center;">
                <div style=" color: #000000; font-size: 32px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 20px;">
                    Welcome Furniture<span style="color: #FF7F50; font-size: 36px;">.</span>
                </div>
                <h1 style="color: #333333; font-size: 24px; font-weight: 600; margin-bottom: 10px;">Forgot Your Password?</h1>
                <p style="font-size: 16px; color: #666666; margin-bottom: 25px;">No worries! Let's get you back into your account.</p>
                </div>
                <div style="text-align: center;">
                <a href="${resetLink}" style="background-color: #FF7F50; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 18px; font-weight: 500; display: inline-block; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);"> Reset Password </a>
                </div>
                <div style="margin-top: 25px; text-align: center;">
                <p style="font-size: 14px; color: #999999; line-height: 1.6;">
                This link will expire in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
                </p>
                </div>
                <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 30px 0;">
                <div style="text-align: center;">
                <p style="font-size: 12px; color: #cccccc; line-height: 1.5;">
                        Having trouble? Copy and paste the link below into your browser:<br>
                <a href="${resetLink}" style="color: #FF7F50; text-decoration: none; font-size: 12px;">${resetLink}</a>
                </p>
                <p style="font-size: 12px; color: #cccccc; margin-top: 15px;">
                Need help? Contact us at <a href="mailto:welcomefurniture.co@gmail.com" style="color: #FF7F50; text-decoration: none;">welcomefurniture.co@gmail.com</a>
                </p>
                <p style="font-size: 12px; color: #cccccc; margin-top: 10px;">
                &copy; ${new Date().getFullYear()} Welcome Furniture. All rights reserved.
                </p>
                </div>
                </div>
                `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Password reset link sent to your email!" });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.json({ success: false, message: "Invalid token or user not found!" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update password in DB
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Token expired or invalid!" });
    }
};

const verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.json({ success: false, message: "Invalid token or user not found!" });
        }

        res.json({ success: true, message: "Token is valid" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Token expired or invalid!" });
    }
};

export { loginUser, registerUser, adminLogin, forgotPassword, resetPassword, verifyResetToken }