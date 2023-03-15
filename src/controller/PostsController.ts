import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreateCommentInput, CreatePostInput, GetPostInput, LikeOrDislikeInput } from "../dtos/PostsDTO";
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

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: CreatePostInput = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postsBusiness.createPost(input)

            res.status(201).send("Post criado com sucesso")
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {
            const input: CreateCommentInput = {
                post_id: req.body.post_id,
                comment: req.body.comment,
                token: req.headers.authorization as string,
            }

            const output = await this.postsBusiness.createComment(input)

        res.status(201).send(output)
        
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislike = async (req: Request, res: Response) => {
        try {
            const input: LikeOrDislikeInput = {
                idToLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }
            
            await this.postsBusiness.likeOrDislike(input)

            res.status(200).end()
        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}