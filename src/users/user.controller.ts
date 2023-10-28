import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './user.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	readonly userRoutes: IControllerRoute[] = [
		{
			path: '/login',
			func: this.login,
			method: 'get',
			middlewares: [new ValidateMiddleware(UserRegisterDto)],
		},
		{
			path: '/register',
			func: this.register,
			method: 'post',
			middlewares: [new ValidateMiddleware(UserRegisterDto)],
		},
	];

	constructor(
		@inject(TYPES.UserService) private UserService: IUserService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
	) {
		super(loggerService);
		this.bindRoutes(this.userRoutes);
	}

	login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'AUTHORIZATION ERROR', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.UserService.createUser(body);

		if (!result) {
			return next(new HTTPError(422, 'This user already exist'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
