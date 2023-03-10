import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { LoginInput, SignupInput } from "../dtos/UsersDTO";
import { BaseError } from "../errors/BaseError";


export class UsersController {
    constructor (
        private usersBusiness: UsersBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {

        try {
            const input: SignupInput = {
                name: req.body.name,
                email: req.body.email, 
                password: req.body.password
            }

            const output = await this.usersBusiness.signup(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }

    public login = async (req: Request, res: Response) => {

        try {
            const input: LoginInput = {
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.usersBusiness.login(input)

            res.status(200).send(output)
                        
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }



}