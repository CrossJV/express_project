import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] DO NOT SUCCESS PARSE .env OR IS UNDEFINED');
		} else {
			this.logger.log('[ConfigService] CONFIG .env DOWNLOADED');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
