require('dontenv').config();

import { Request, Response, NextFunction, response} from "express";
import * as jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const checkJwt = (request: Request, reponse:Response, next:NextFunction)=>{
    let token: string = <string>request.headers['authorization'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token.replace('Bearer',''),jwtSecret);
        reponse.locals.jwtPayload = jwtPayload;
    }catch(err){
        reponse.status(401).json('unauthorized');
        return;
    }
    const {userId,username} = jwtPayload;
    const newToken = jwt.sign({userId,username},jwtSecret,{
        expiresIn:'1h',
    });
    response.setHeader('token',newToken);
    next();
};