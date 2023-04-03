import { PostsDB, CommentsDB, PostsLikesDislikesDB, CommentsLikesDislikesDB } from "../../src/types"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class PostsDatabaseMock extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POSTS_LIKESDISLIKES = "posts_likes_dislikes"
    public static TABLE_COMMENTS_LIKESDISLIKES = "comments_likes_dislikes"

    public getAllPosts = async ():Promise<PostsDB[]> => {
        return[
            {
                id: 'p001',
                user_id: 'id-mock',
                content: 'publi1',
                comment: "",
                likes: 1,
                dislikes: 1,
                created_at: expect.any(String),
            },
            {
                id: 'p002',
                user_id: 'id-mock',
                content: 'publi2',
                comment: "",
                likes: 0,
                dislikes: 0,
                created_at: expect.any(String),
            }
        ]
    }

    public getPostCreator = async()=>{
        const postsDB = await this.getAllPosts()
        const usersDB = [{
            id: "id-mock",
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
        },
        {
            id: "id-mock",
            name: "Admin Mock",
            email: "admin@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
        }]
        
        return{
            postsDB,
            usersDB,
        }
    }

    public insertPost = async(newPostsDB:PostsDB):Promise<void>=>{
    }

    public getPostById = async (id: string):Promise<PostsDB | undefined>=>{
        if(id === 'p001'){
        return{
                id: 'p001',
                user_id: 'id-mock',
                content: 'publicacao1',
                comment: "",
                likes: 1,
                dislikes: 1,
                created_at: expect.any(String),
            }
        }
    }

    public createComment = async(newPostsDB:CommentsDB):Promise<void>=>{
    }

    public updatePost = async(updatePost:PostsDB,id:string):Promise<void>=>{
    }

    public getCommentById = async (id: string):Promise<CommentsDB | undefined>=>{
        if(id === 'c001'){
            return{
                    id: 'c001',
                    user_id: 'id-mock',
                    post_id: 'p001',
                    comment: 'comentario1',
                    likes: 1,
                    dislikes: 1,
                    created_at: expect.any(String),
                }
            }
    }

    public updateLikeOrDislikePost = async(updateLD:PostsLikesDislikesDB):Promise<void>=>{
    }

    public updateLikeOrDislikeComment = async(updateLD:CommentsLikesDislikesDB):Promise<void>=>{
    }
   
    public updateComment = async(updatePost:PostsDB,id:string):Promise<void>=>{
    }
    
}