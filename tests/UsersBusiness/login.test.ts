import { UsersBusiness } from "../../src/business/UsersBusiness"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { LoginInput } from "../../src/dtos/usersDTO"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("login", () => {
    const usersBusiness = new UsersBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("login bem-sucedido em conta normal retorna token", async () => {
        const input: LoginInput = {
            email: "normal@email.com",
            password: "bananinha"
        }

        const response = await usersBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("login bem-sucedido em conta admin retorna token", async () => {
        const input: LoginInput = {
            email: "admin@email.com",
            password: "bananinha"
        }

        const response = await usersBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })
    
      test("email é string", async () => {
        expect.assertions(1);
    
        const input: LoginInput = {
            email: 1,
            password: "bananinha"
        }
    
        try {
          await usersBusiness.login(input);
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toBe("'email' deve ser string");
          }
        }
      });
    
      test("password é string", async () => {
        expect.assertions(1);
    
        const input: LoginInput = {
            email: "normal@email.com",
            password: 2
        }
    
        try {
          await usersBusiness.login(input);
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toBe("'password' deve ser string");
          }
        }
      });

      test('email não cadastrado', () => {
        const input: LoginInput = {
            email: "bananinha",
            password: "bananinha"
        }
    
          expect(async () => {
            await usersBusiness.login(input)
          }).rejects.toBeInstanceOf(NotFoundError);
      
      })

      test('senha incorreta', () => {
        const input: LoginInput = {
            email: "normal@email.com",
            password: "123"
        }
    
          expect(async () => {
            await usersBusiness.login(input)
          }).rejects.toBeInstanceOf(BadRequestError);
      
      })
    
})