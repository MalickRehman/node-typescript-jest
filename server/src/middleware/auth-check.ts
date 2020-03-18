const jwt = require('jsonwebtoken');
module.exports = (req:any,res:any,next:any)=>{
    try
    {
        console.log(req.headers.authorization)
        const decoded =jwt.verify(req.headers.authorization,"secret") ;
        req.userData = decoded;
        next();
    } 
    catch(ex)
    {
    return res.status(401).json({
        message:"Your session has expired, please login again"
    })
    }
};