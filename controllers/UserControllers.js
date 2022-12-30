const jwt = require( "jsonwebtoken" )
const userSchema = require( "../model/User" )
const messageSchema = require("../model/Message")
const bcrypt = require( "bcrypt" )
const mailer = require( "nodemailer" )
const { VsAuthenticator } = require('@vs-org/authenticator')
const Login = async ( req, res ) =>
{
    const { email, password,phone } = req.body
    if ( !email || !password || !phone ) return res.status( 400 ).json( { "message": "Email And Password Required" } )
    try
    {
        const foundUser = await userSchema.findOne( { email:email,phone:phone} ).exec()   
        if (!foundUser) return res.status(403).json({ "message": "email Or Phone not Founded" })
        const checkPassword = await bcrypt.compare( password, foundUser.password )
        if ( !checkPassword ) return res.status( 403 ).json( { "message": "Password Not Match" } )
        const token = jwt.sign( { "email": foundUser.email, "roles": foundUser.roles, "name": foundUser.name,"phone":foundUser.phone}, process.env.ACCESS_TOKEN, { expiresIn: "24h"} )
        res.cookie( "jwt", token, { httpOnly: false, maxAge: 3 * 24 * 60 * 60 * 1000 } );
        res.status(200).json( { "username": foundUser.name, state : 200,"roles": foundUser.roles, "phone": foundUser.phone ,token,"email":foundUser.email,"id":foundUser.id} )
    }
    catch ( e ) { console.log( e.message ) }
}
const Reg = async ( req, res ) =>
{
    const { username, email,phone, password, confirmPassword } = req.body
    if ( !username, !email, !phone, !password, !confirmPassword ) res.json( { "message": "All Fields Are Required" } ).status( 400 )
    if (password !== confirmPassword) {
        res.json( { "message": "Password Not Match" } )
    }
    else {
        try {
            const duplicateEamil = await userSchema.findOne({ email: email }).exec()
            const duplicatePhone = await userSchema.findOne({phone: phone}).exec()
            if (duplicateEamil) res.json({ "message": "email  Already Found in" }).status(409)
            if(duplicatePhone)res.json({ "message": "Phone  Already Found in" }).status(409)
        else {
            await userSchema.create( {
            "name": username,
            "email": email,
            "phone": phone,
            "password": await bcrypt.hash( password, 10 )
        })
        res.status(201).json({
            "name": username,
            "email": email,
            "phone": phone,
            })
            }
        }
        catch(e){console.log(e)}
    }
}
const Logout = ( req, res ) =>
{
    const cookies = req.cookies.jwt
    const token =req.headers.authorization.split(' ')[1]
    const foundUser = userSchema.findOne( { token: token } )
    if ( !foundUser )
    {
        req.clearCookie( "jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } )
        return   res.status( 204 ).json({"message":"Logged Out"})
    }
    res.clearCookie( "jwt", { httpOnly: true } )
    res.status( 204 ).json({"message":"Logged Out"})
}
const ForgetPassword = async ( req, res ) =>
{
    const { email } = req.body
    try
    {
        const findOne = await userSchema.findOne( { email: email } ).exec()
        if ( !findOne ) return res.json( { "message": "Cant't Find Ur Email" } ).status( 403 )
        const secret = VsAuthenticator.generateTOTP('JF5DOKTGFY4SKQ2QIBDTUOCPENEGUSLSKZBVC32VIQQT6SDVFJDQ')
        console.log(secret)
        const transporter = mailer.createTransport( {
            service: 'gmail',
            auth: {
                user: 'omarnaguibbb@gmail.com',
                pass: 'jelxbrlxzwutiirf'
            }
        } );
        const mailOptions = {
            from: 'omarnaguibbb@gmail.com',
            to: `${email}`,
            subject: 'Sending OTP Recovery Password using Node.js',
            text: `Your OTP Password is ${secret}  Valid For 60 min`
        };
        transporter.sendMail( mailOptions, function ( error, info )
        {
            if (error)
            {
                console.log( error );
                res.sendStatus( 403 )
            }
            else
            {
                res.sendStatus(200)
                console.log("Email sent: " + info.response);
            }
        } );
    }
    catch ( e ) { console.log( e.message ) }
}
const resetPassword = async( req, res ) =>
{
        const { OTP,email } = req.body
        const ValidateOTP =  VsAuthenticator.verifyTOTP(OTP, 'JF5DOKTGFY4SKQ2QIBDTUOCPENEGUSLSKZBVC32VIQQT6SDVFJDQ', 120)
        const user =await userSchema.findOne({ email }).exec()
        if (ValidateOTP) {
            res.status(200).json({"id":user.id})
        }
        else {
            res.status(403).json({"message":"OTP Is InValid"})
        }
}
const UpdatePassword = async ( req, res ) =>
{
    const { id, newPassword } = req.body
        try{
            const password = await bcrypt.hash( newPassword, 10 )
            const update = await userSchema.findOneAndUpdate({_id:id},{password}).exec()
            res.sendStatus( 200 )
            }
            catch ( e ) { console.log(e)}
}
const Report = async ( req, res ) =>
{
    const { name, position, message,phone } = req.body
    if ( !name || !position || !message || !phone ) res.json( { "message": "All Field Required" } ).status( 400 )
    await messageSchema.create({
        "name": name,
        "position": position,
        "message":message,
        "phone":phone
    })
    res.status(201).json({ message: "Success" });
    
} 
const getAllUsers = async (req, res) => {
    const Users = await userSchema.find({}).exec()
    res.status(200).json({ Users });
}
module.exports = { Login, Reg, Logout, ForgetPassword, resetPassword, UpdatePassword, Report,getAllUsers }