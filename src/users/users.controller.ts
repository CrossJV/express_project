import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { Request, Response, NextFunction } from 'express';

@injectable()
export class UserController extends BaseController implements IUsersController {
	readonly userRoutes: IControllerRoute[] = [
		{ path: '/login', func: this.login, method: 'get' },
		{ path: '/register', func: this.register, method: 'post' },
	];

	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes(this.userRoutes);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'AUTHORIZATION ERROR', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
