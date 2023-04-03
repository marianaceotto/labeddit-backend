import {PostsBusiness} from '../../src/business/PostsBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'

describe("likeDislikePost",()=>{

    const postBusiness = new PostsBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Retornar um erro se 'like' não for booleano", ()=>{
        const input = {idToLikeOrDislike:'p001', like: 45, token: 'token-mock-admin'}

        expect(async()=>{
            await postBusiness.likeOrDislike(input)
        }).rejects.toThrow("'like' deve ser booleano")
    })

    test("Deve retornar um erro com 'token' inválido", ()=>{
        const input = {idToLikeOrDislike:'p001',like:1, token: 'token-mock'}
        
        expect(async()=>{
            await postBusiness.likeOrDislike(input)
        }).rejects.toThrow("'token' inválido")
    })

})