import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "../common/route.interface";

export class UserController extends BaseController {
    private readonly userRoutes: IControllerRoute[] = [
        {path: '/login', func: this.login, method: 'get'},
        {path: '/register', func: this.register, method: 'post'},
    ] 

    constructor(
        logger: LoggerService
    )
    {
        super(logger)
        this.bindRoutes(this.userRoutes)
    } 

    private login(req: Request, res: Response, next: NextFunction)
    {
        this.ok(res, 'login')
    }

    private register(req: Request, res: Response, next: NextFunction)
    {
        this.ok(res, 'register')
    }
}