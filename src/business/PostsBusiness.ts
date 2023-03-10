import { PostsDatabase } from "../database/PostsDatabase"
import { CreateCommentInput, CreatePostInput, GetPostInput, GetPostsOutput } from "../dtos/PostsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostsBusiness {
    constructor (
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    
    public getPosts = async (input: GetPostInput): Promise <GetPostsOutput> => {
        const {token} = input

        if (!token) {
            throw new NotFoundError(" 'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        const { postDB, userDB} = await this.postsDatabase.getPostCreator() 

        function creator(userId: string) {
            const user = userDB.find((userDB) => {
                return userDB.id === userId
            })
        
            return {
                id: user.id,
                name: user.name
            }
        }
        
        const posts = postDB.map((postDB) => {
            const post = new Posts (
                postDB.id,
                postDB.content,
                postDB.comment,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                creator(postDB.user_id)
            )

            return post.toBusinessPostsModels()
        })

        const output: GetPostsOutput = posts
        
        return output
    }

    public createPost = async (input: CreatePostInput): Promise <void> => {
        const { token, content } = input

        if (token === undefined){
            throw new BadRequestError ("'Token' inválido")
        }

        if (content === null){
            throw new BadRequestError ("'Token' inválido")
        }

        if (typeof content !== "string"){
            throw new BadRequestError ("'Content' deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        const id = this.idGenerator.generate()
        const comment = ""
        const likes = 0
        const dislikes = 0
        const created_at = new Date().toISOString()
        const user_id = payload.id

        const newPost = new Posts (
            id, 
            content,
            comment,
            likes,
            dislikes,
            created_at,
            {id: user_id,
            name:payload.name}
        )

        const postsDB = newPost.toModelsPostsDB()

        await this.postsDatabase.insertPost(postsDB)
    }

    public createComment = async (input: CreateCommentInput): Promise <void> => {
        const {post_id, comment, token } = input

        if (token === undefined){
            throw new BadRequestError ("'Token' inválido")
        }

        if (comment === null){
            throw new BadRequestError ("'Token' inválido")
        }

        if (typeof comment !== "string"){
            throw new BadRequestError ("'Comment' deve ser string")
        }

        if (typeof post_id !== "string"){
            throw new BadRequestError ("'Post_id' deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError ("'Token' inválido")
        }

        const postById = await this.postsDatabase.getPostById(post_id)

        if (!postById) {
            throw new BadRequestError ("'Post' não encontrado")
        }

        // const id = this.idGenerator.generate()
        // const comment = ""
        // const likes = 0
        // const dislikes = 0
        // const created_at = new Date().toISOString()
        // const user_id = payload.id

        // const newPost = new Posts (
        //     id, 
        //     content,
        //     comment,
        //     likes,
        //     dislikes,
        //     created_at,
        //     {id: user_id,
        //     name:payload.name}
        // )
    }
}