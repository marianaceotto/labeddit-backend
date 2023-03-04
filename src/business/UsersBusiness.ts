import { UsersDatabase } from "../database/UsersDatabase"
import { SignupInput, SignupOutput } from "../dtos/UsersDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload } from "../types"

export class UsersBusiness {
    constructor (
        private usersDatabase: UsersDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}
    
    public signup = async (input: SignupInput): Promise <SignupOutput> => {
        
        const {apelido, email, password} = input 

        if (typeof apelido !== "string") {
            throw new BadRequestError("'Apelido' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'Email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'Password' deve ser string")
        }

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new Users (
            id,
            apelido,
            email, 
            hashedPassword, 
            new Date().toISOString()
        )

        const userDB = newUser.toUsersModelDB()

        await this.usersDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            apelido: newUser.getApelido()
        }

        const output: SignupOutput = {
            token: this.tokenManager.createToken(payload)
        }

        return output
    }


}