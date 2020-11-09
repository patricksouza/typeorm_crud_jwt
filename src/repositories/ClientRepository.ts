import { EntityRepository, Repository } from 'typeorm';
import {Client} from '../entity/Client';

@EntityRepository(Client)
export default class ClientRepository extends Repository<Client> {
  public async findByName(name: string): Promise<Client[]> {
    return this.find({
      where: {
        name,
      },
    });
  }
}