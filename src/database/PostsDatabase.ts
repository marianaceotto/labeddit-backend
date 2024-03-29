import { CommentsDB, CommentsLikesDislikesDB, PostsDB, PostsLikesDislikesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UsersDatabase";

export class PostsDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POSTS_LIKESDISLIKES = "posts_likes_dislikes"
    public static TABLE_COMMENTS_LIKESDISLIKES = "comments_likes_dislikes"

    public getAllPosts = async () => {
        const result = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select()

        return result
    }

    public getPostCreator = async () => {
        const postDB = await this.getAllPosts()
        const userDB = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .select()

        return{
            postDB,
            userDB,
        }
    }

    public insertPost = async (postDB: PostsDB): Promise <void> => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .insert(postDB)
    }
    
    public getPostById = async (id: string): Promise <PostsDB | undefined> => {
        const result: PostsDB[] | undefined = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select()
        .where({id: id})
        //console.log("8")
        return result [0]
    }

    public createComment = async (newCommentDB: CommentsDB) => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_COMMENTS)
        .insert(newCommentDB)
    }

    public updatePost = async (newUpdatePostDB: PostsDB, id: string) => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .update(newUpdatePostDB)
        .where({ id: id })
    }

    public getCommentById = async (id: string): Promise <PostsDB | undefined> => {
        const result: PostsDB[] | undefined = await BaseDatabase
        .connection(PostsDatabase.TABLE_COMMENTS)
        .select()
        .where({post_id: id})

        return result [0]
    }

    public updateLikeOrDislikePost = async (updateLikePost: PostsLikesDislikesDB) => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS_LIKESDISLIKES)
        .insert(updateLikePost)
    }

    public updateComment = async (updateComment: PostsDB, id: string) => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_COMMENTS)
        .update(updateComment)
        .where ({id: id})
    }

    public updateLikeOrDislikeComment= async (updateLikeComment: CommentsLikesDislikesDB) => {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_COMMENTS_LIKESDISLIKES)
        .insert(updateLikeComment)
    }
}
