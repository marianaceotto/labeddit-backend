import { TokenPayload } from "../../src/types"

export class TokenManagerMock {

    
    public getPayload = (token: string): TokenPayload | null => {
        if (token == "token-mock-normal") {
            return {
                id: "id-mock",
                name: "Normal Mock",
            }

        } else if (token == "token-mock-admin") {
            return {
                id: "id-mock",
                name: "Admin Mock"
            }

        } else {
            return null
        }
    }
}