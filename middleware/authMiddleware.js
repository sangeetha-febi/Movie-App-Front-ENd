const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles = []) => {
    
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized: No Token Provided"});
        }

    
        const token = authHeader.split(" ")[1];

        try{
            
            const decoded = jwt.verify(token, process.env.jwtsecretkey);
            req.user = decoded;

            if(allowedRoles.length === 0){
                return next();
            }

            if(!allowedRoles.includes(decoded.role)){
                return res.status(403).json({message: "Forbidden: You don't have access to this resource"});
            }

            next();
        }catch(err){
            return res.status(401).json({message: "Unauthorized: Invalid Token"});
        }
    }
};

module.exports = authMiddleware;