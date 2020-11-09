import { getCustomRepository, getRepository } from "typeorm";
import ClientRepository from "../repositories/ClientRepository";
import { Client } from "../entity/Client";
import { validate } from "class-validator";



class ClientController {
    static create = async (request, response) => {
        let { firstname,lastname, email,number, user, password, role } = request.body;
        let client = new Client();
        client.firstname = firstname;
        client.lastname= lastname;
        client.email = email;
        client.number = number;
        client.user = user;
        client.password = password;
        client.role = role;
        client.hashPassword();

        const errors = await validate(client);
        if (errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        client.hashPassword();

        const repository = getRepository(Client);

        try {
            const res = await repository.save(client);
            return response.status(201).json(res);
        } catch (err) {
            console.log('err.message :>> ', err);
        }
    }

    static listAll = async (request, response) => {
        try {
            const clients = await getRepository(Client).find();
            return response.json(clients);
        } catch (err) {
            console.log('err.message :>> ', err);
        }
    }

    static listOne = async (request, response) => {
        const repository = getCustomRepository(ClientRepository);
        try {
            const res = await repository.findByName(request.params.name);
            return response.json(res);
        } catch (err) {
            console.log('err.message :>> ', err);
        }
    }

    static update = async (request, response) => {
        try {
            const client = await getRepository(Client).findOne(request.body.id);
            if (client) {
                getRepository(Client).merge(client, request.body);
                const results = await getRepository(Client).save(client);
                return response.json(results);
            }
        } catch (err) {
            console.log('err.message :>> ', err);
        }
    }

    static delete = async (request, response) => {
        try {
            const repository = await getRepository(Client).delete(request.body.id);
            return response.json(repository);
        } catch (err) {
            console.log('err.message :>> ', err);
        }
    }
}

export default ClientController;