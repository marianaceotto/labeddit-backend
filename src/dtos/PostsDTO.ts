import { PostsDB, PostsModels } from "../types"



export interface GetPostInput {
    token: string | undefined
}

export type GetPostsOutput = PostsModels[]

export interface CreatePostInput {
    token: string, 
    content: unknown
}

export interface LikeOrDislikeInput {
    idToLikeOrDislike: string,
    token: string, 
    like: unknown
}