import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'EMAIL IS NOT CORRECT' })
	email: string;
	@IsString({ message: 'PASSWORD IS NOT CORRECT' })
	password: string;
}
