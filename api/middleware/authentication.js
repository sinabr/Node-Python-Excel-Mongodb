const jwt = require('jsonwebtoken');


module.exports = (req , res , next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        // use token data for Authorization In each route:
        req.authData = decoded

        next();
    }catch(error){
        return res.status(401).json({
            message:'Authentication Check Failed',
            error:error
        });
    }   
    
};