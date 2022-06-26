import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
      if (filePath.indexOf('undefined') !== -1) {
        filePath = '.env';
      }

      this.envConfig = fs.existsSync(filePath)
        ? dotenv.parse(fs.readFileSync(filePath))
        : process.env;
    }

    get(key: string): string {
      return this.envConfig[key];
    }
}
