import jwt from 'jsonwebtoken';
import config from '../config.js'


function verifyToken(req,res, next){
    /* const flag = true;
    if(!flag) return res.json({message: 'invalid token'})
    next() */
    
    const token = req.headers['x-access-token'] || req.query.token;
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    
    jwt.verify(token,secretJWT,(err,decoded)=>{
        
        if(err) return res.status(404).json({message: 'Invalid token or expired'})
        req.user = decoded
        next()

    })
}

export default verifyToken;
