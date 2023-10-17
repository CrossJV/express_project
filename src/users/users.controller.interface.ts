import { BaseController } from "../common/base.controller";
import { IControllerRoute } from "../common/route.interface";
import { Request, Response, NextFunction } from "express";


export interface IUsersController extends BaseController
{
    readonly userRoutes: IControllerRoute[],

    login: (req: Request, res: Response, next: NextFunction) => void

    register: (req: Request, res: Response, next: NextFunction) => void
}