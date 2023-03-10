import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UsersDatabase";

export class PostsDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"

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
}
