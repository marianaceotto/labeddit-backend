import {PostsBusiness} from '../../src/business/PostsBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { CreateCommentInput } from '../../src/dtos/PostsDTO'

describe("GetPostById",()=>{

    const postBusiness = new PostsBusiness(
        new PostsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Deve criar um comentário", async()=>{
        const input:CreateCommentInput = {post_id: 'p001',token: 'token-mock-normal', comment: 'teste'}
        
        const response = await postBusiness.createComment(input)

        expect(response).toBeTruthy()    
    })

    test("Deve retornar um erro com 'token' inválido", ()=>{
        const input = {post_id: 'p001',token: 'token-mock', comment: 'teste'}
        
        expect(async()=>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'Token' não válido!")
    })

    test("Deve retornar um erro com 'post' não localizado", ()=>{
        const input = {post_id: 'p000',token: 'token-mock-normal', comment: 'teste'}
        
        expect(async()=>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'Post' não localizado")
    })

})