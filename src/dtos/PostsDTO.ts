import { PostsModels } from "../types"

export interface GetPostInput {
    token: string | undefined
}

export type GetPostsOutput = PostsModels[]

export interface CreatePostInput {
    token: string | undefined, 
    content: unknown
}

export interface LikeOrDislikeInput {
    idToLikeOrDislike: string,
    token: string | undefined, 
    like: unknown
}

export interface CreateCommentInput{
    post_id: string,
    comment: string,
    token: string,
}