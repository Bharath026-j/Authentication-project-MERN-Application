
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import transporter from "../config/nodemailer.js";
import { text } from "express";
import { EMAIL_TEMPLATE,VERIFY_OTP,RESET_OTP } from "../config/emailTemplate.js";
// import { assets } from "../../client/src/assets/assets.js";
// import { assets } from "../../client/src/assets/assets.js";


//Register Controller
export const register = async (req,res)=>{
    const  {name ,  email , password} = req.body;  
    // const name = req.body;
    // const email=req.body;


    if (!name || !email || !password){
        return res.json({success:false  , message:'Missing Details'})
    }
    try {
        //existing user check
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.json({success : false , message :'User already exists'} )
        }

        //encrypting password to DB
        const hasshedPassword = await bcrypt.hash(password , 10)
        

        const user = new userModel ({name , email , password:hasshedPassword});  //new user auth
        await user.save(); // save this user in database

        //generate token for auth to cookies
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , { expiresIn: '7days'});

        res.cookie('token', token , {
            httpOnly:true , 
            secure: process.env.NODE_ENV === "production" , 
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict' , 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //sending welcome email
        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our App',
            // text: `Welcome to our website. Your account has been created successfully with the email ID: ${email}.` 
            html : EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{image}}', 'https://cdn.templates.unlayer.com/assets/1661428767276-img.png')
        }

        await transporter.sendMail(mailOptions);
        
        return res.json ({success:true });

    } catch (error) {
        res.json({success: false , message: error.message})
    }

    }
export const login = async (req,res)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return res.json({success:false , message:'email and password are required'})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false , message:'Invalid email'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false , message:'Invalid password'})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , { expiresIn: '7days'});

        res.cookie('token', token , {
            httpOnly:true , 
            secure: process.env.NODE_ENV === "production" , 
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict' , 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json ({success:true });
        
        
    } catch (error) {
        return res.json({success: false , message: error.message})
    }

    }

    export const logout = async (req,res)=>{
        try {
            res.clearCookie('token', {
            httpOnly:true , 
            secure: process.env.NODE_ENV === "production" , 
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict' , 
            })

            return res.json ({success:true , message:'Logged Out'})
        } catch (error) {
            
            return res.json({success: false , message: error.message})
        }
    }

    //verify email
    export const sendVerifyOtp = async (req,res)=>{
        try {
            const {userId} = req.body;

            const user = await userModel.findById(userId);

            if(user.isAccountVerified){
                return res.json({success:false , message:'Account already verified'})
            }

            const otp = String(Math.floor(100000 + Math.random() * 900000));
            user.verifyOtp = otp;
            user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;


            await user.save();


            
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Verify your email',
                // text: `Your OTP is ${otp}. It is valid for 24 hours.`,
                html : VERIFY_OTP.replace('{{OTP_CODE}}',otp)
            }

            await transporter.sendMail(mailOptions);
            return res.json({success:true , message:'OTP sent to your email'})

        } catch (error) {
            return res.json({success: false , message: error.message})
            
        }
    }

    export const verifyEmail = async(req,res)=>{
        const {userId,otp} = req.body;
        

        if(!userId || !otp){
            return res.json({success:false , message:'Missing details'})
        }

        try {
            const user = await userModel.findById(userId);
            if(!user){
                return res.json({success:false , message:'User not found'})
            }
            if(user.verifyOtp==='' || user.verifyOtp != otp){
                return res.json({success:false , message:'Invalid OTP'})
            }
            if(user.verifyOtpExpiredAt < Date.now()){
                return res.json({success:false , message:'OTP expired'})
            }
            user.isAccountVerified = true;
            user.verifyOtp = '';
            user.verifyOtpExpiredAt = 0;
            await user.save();
            return res.json({success:true , message:'Account verified successfully'});
        } catch (error) {
            return res.json({success: false , message: error.message})
            
        }
    }

    export const isAuthenticated = async (req,res)=>{
        try {
            return res.json({success:true , message:'User is authenticated'})
        } catch (error) {
            return res.json({success: false , message: error.message})
            
        }
    }

    //send password reset OTP
    export const sendResetOtp = async (req,res)=>{
        const {email} = req.body;

        if(!email){
            return res.json({success:false , message:'Email is required'})
        }

        try {
            
            const user = await userModel.findOne({email});
            if(!user){
                return res.json({success:false , message:'User not found'})
            }

            const otp = String(Math.floor(100000 + Math.random() * 900000));
            user.resetOtp = otp;
            user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;


            await user.save();

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Password Reset OTP',
                // text: `Your OTP is ${otp} to reset your password. It is valid for 15 minutes.`
                html : RESET_OTP.replace('{{OTP_CODE}}',otp)
                
            }

            await transporter.sendMail(mailOptions);
            return res.json({success:true , message:'OTP sent to your email'})


        } catch (error) {
            return res.json({success: false , message: error.message})
            
        }
    }

    //rest password
    export const resetPassword = async (req,res)=>{
        const {email,otp,newPassword}= req.body;

        if(!email || !otp || !newPassword){
            return res.json({success:false , message:'Missing details'})
        }

        try {
            
            const user = await userModel.findOne({email});
            if(!user){
                return res.json({success:false , message:'User not found'})
            }

            if(user.resetOtp === "" || user.resetOtp != otp){
                return res.json({success:false , message:'Invalid OTP'})
            }

            if(user.resetOtpExpiredAt < Date.now()){
                return res.json({success:false , message:'OTP expired'})
            }

            const hashedPassword = await bcrypt.hash(newPassword , 10);
            user.password = hashedPassword;
            user.resetOtp = '';
            user.resetOtpExpiredAt = 0;
            await user.save();
            return res.json({success:true , message:'Password reset successfully'})

        } catch (error) {
            return res.json({success: false , message: error.message})
            
        }
    }