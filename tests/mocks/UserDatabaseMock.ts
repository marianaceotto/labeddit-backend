import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UsersDB } from "../../src/types"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public insert = async (userDB: UsersDB): Promise<void> => {
    }

    public findByEmail = async (email: string): Promise<UsersDB | undefined>  => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString()
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }
}