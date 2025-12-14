const User = require('../model/admin');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError,NotFoundError } = require('../error')
const adminLogin=async(req,res,next)=>{
       const {username, password} = req.body;
       try {
         if(!username || !password) {
           throw new BadRequestError("Please Provide Username and Password")
         }
        const admin =  await User.findOne({username});
        if(!admin) {
            throw new NotFoundError("Admin not found!")
        }
        if(admin.password !== password) {
            throw new UnauthenticatedError('Invalid  Credentials of password')
        }
         const token =  jwt.sign(
            {id: admin._id, username: admin.username, role: admin.role}, 
            'jwt_secret',
            {expiresIn: '24h'}
        )
       res.status(StatusCodes.OK).json(
        {
            message: "Authentication successful",
            token: token,
            user:{
                username: admin.username,
                role: admin.role
            }
        }
    ) 
    } catch (error) {
         next(error);
    }
}  

module.exports={ adminLogin };