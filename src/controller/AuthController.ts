import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { Client } from "../entity/Client";
import config from "../config/config";;


class AuthController{
    static login = async(request:Request,response:Response)=>{
        let {username,password} = request.body;
        
        //Checando se as variáveis não estão vazias
        if(!(username && password)){
            response.status(400).send();
        }

        const clientRepository = getRepository(Client);
        let client:Client;
        try{
            client = await clientRepository.findOneOrFail({where:{username}});
        }catch(err){
            console.log('err.message :>> ', err);
            response.status(401).send();
        }
        
        //Checa se a senha encriptada é a mesma do banco
        if(!client.checkIfUnencryptedPasswordIsValid(password)){
            response.status(401).send();
            return;
        }

        const token = jwt.sign(
            { userId: client.id, username: client.user },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
        
        response.send(token);
    }
}

export default AuthController;