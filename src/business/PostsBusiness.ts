import { PostsDatabase } from "../database/PostsDatabase"
import { GetPostInput, GetPostsOutput } from "../dtos/PostsDTO"
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
}