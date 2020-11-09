import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import bcrypt from "bcrypt";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    firstname: string;

    @Column({
        length: 50,
    })
    lastname: string;

    @Column({
        length: 50,
    })
    email: string;

    @Column({
        length: 20,
    })
    number: string;

    @Column()
    user: string;


    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    password: string;

    @Column()
    role:string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    hashPassword(){
        this.password = bcrypt.hashSync(this.password,8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }
}