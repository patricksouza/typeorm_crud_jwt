import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Client } from "../entity/Client";

export const checkRole = (roles:Array<string>)=>{
    return async(request:Request,response:Response,next:NextFunction)=>{
        const id = response.locals.jwtPayload.userId;
        const clientRepository = getRepository(Client);
        let client:Client;
        try{
            client = await clientRepository.findOneOrFail(id);
        }catch(id){
            response.status(401).send();
        }
        if(roles.indexOf(client.role)>-1) next();
        else response.status(401).send();
    };
};