import { UsersDatabase } from "../database/UsersDatabase"
import { LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/UsersDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
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
        
        const {name, email, password} = input 

        if (typeof name !== "string") {
            throw new BadRequestError("'Name' deve ser string")
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
            name,
            email, 
            hashedPassword, 
            new Date().toISOString()
        )

        const userDB = newUser.toUsersModelDB()

        await this.usersDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName()
        }

        const output: SignupOutput = {
            token: this.tokenManager.createToken(payload)
        }

        return output
    }

    public login = async (input: LoginInput): Promise <LoginOutput> => {
        const { email, password } = input
        
        if (typeof email !== "string") {
            throw new BadRequestError("'Email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'Password' deve ser string")
        }

        const userDB = await this.usersDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError(" 'E-mail' inválido")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

        if (!isPasswordCorrect) {
            throw new NotFoundError(" 'Password' inválida")
        }

        const users = new Users (
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        )

        const payload: TokenPayload = {
            id: users.getId(), 
            name: users.getName()
        }

        const token=  this.tokenManager.createToken(payload)

        const output: LoginOutput ={
            token
        }

        return output
    }

}