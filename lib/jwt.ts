import jwt, { JwtPayload } from "jsonwebtoken"; 

interface SingOption{
    expiresIn?: string | number;
}
const DEFAULT_SIGN_OPTION={
    expiresIn: "1h",
}

export function signJwtAccessToken (payload:JwtPayload,options:SingOption=DEFAULT_SIGN_OPTION){
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key!, options);
    return token;
}

export function verifyJwt(token:string){
    try{
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token,secret_key!)
        return decoded as JwtPayload;

    } catch (error){
        console.log(error);
        return null;
    }
}
