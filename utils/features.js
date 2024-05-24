import jwt from "jsonwebtoken";

export const tryCatch = (func) => (req, res, next) =>{
    return Promise.resolve(func(req, res, next).catch(next));
}


// Token Generator
export const tokenGenerator = (payload) =>{
    const {password, ...user} = payload._doc;
    console.log("Token payload is: ", user);
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
    return token
}

export const cookieGenerator = (token)=>{
    const options = {
        maxAge: 24*60*60*1000,
        secure: false,
        httpOnly: false,
        signed: false,
        sameSite: false,
    };

    return ((res)=>res.cookie("access_token",token, options));
}