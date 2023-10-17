import express, { Express } from 'express'
import { Server } from 'http'
import { UserController } from './users/users.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import 'reflect-metadata'
import { IUsersController } from './users/users.controller.interface'

@injectable()
export class App 
{
    app: Express
    server: Server
    port: number

    constructor(@inject(TYPES.ILogger) private logger: ILogger, 
                @inject(TYPES.UserController) private userController: IUsersController,
                @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter)
    {
        this.app = express()
        this.port = 8000
    }

    useRoutes()
    {
        this.app.use('/users', this.userController.router)
    }

    useExeptionFilters()
    {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init()
    {
        this.useRoutes()
        this.useExeptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log('SERVER RUNING ON PORT '+this.port)
    }
}