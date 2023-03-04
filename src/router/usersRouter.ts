import express from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UsersController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router()

const usersController = new UsersController (
    new UsersBusiness (
        new UsersDatabase(),
        new IdGenerator(),
	    new TokenManager(),
	    new HashManager()
    )
)


usersRouter.post("/signup", usersController.signup)
// usersRouter.post("/login", usersController.login)