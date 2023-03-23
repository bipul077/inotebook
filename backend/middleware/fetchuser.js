const jwt = require('jsonwebtoken');
const JWT_SECRET = "Bipulisagoodboy";

const fetchUser = (req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})//if no token is sent
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);

        console.log(data);//gives user detail i.e. id
        req.user = data.user;
        next(); 
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
        
    }
    
}

module.exports = fetchUser;