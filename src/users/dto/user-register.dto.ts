import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'EMAIL IS NOT CORRECT' })
	email: string;

	@IsString({ message: 'PASSWORD IS NOT CORRECT' })
	password: string;

	@IsString({ message: 'NAME IS NOT CORRECT' })
	name: string;
}
