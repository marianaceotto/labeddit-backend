import { UsersDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async insert (userDB: UsersDB): Promise <void> {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string): Promise < UsersDB | undefined > => {
        const result: UsersDB[] = await BaseDatabase 
        .connection(UsersDatabase.TABLE_USERS)
        .select()
        .where({ email })
        
        return result[0]
    }
}