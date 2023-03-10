import { UsersDB, UsersModels } from "../types"


export class Users{
    constructor (
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private createdAt : string, 
    ){}

    
    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }
    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toUsersModelDB(): UsersDB {
        return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        created_at : this.createdAt,
        }
    }

    public toUsersBusinessModels(): UsersModels {
        return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        createdAt : this.createdAt,
        }
    }
}
