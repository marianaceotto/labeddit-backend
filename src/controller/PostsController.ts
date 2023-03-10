import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { GetPostInput } from "../dtos/PostsDTO";
import { BaseError } from "../errors/BaseError";

export class PostsController {
    constructor (
        private postsBusiness: PostsBusiness
    ) {}
    
    public getPosts = async (req: Request, res: Response) => {
        try {
            const input: GetPostInput= {
                token: req.headers.authorization
            }

            const output = await this.postsBusiness.getPosts(input)

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