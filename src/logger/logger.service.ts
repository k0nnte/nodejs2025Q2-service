import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as path from 'path';
import * as fssync from 'fs';
import * as fs from 'fs/promises';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logLevel: LogLevel;
  private readonly levels: LogLevel[] = ['debug', 'fatal', 'warn', 'error'];
  private readonly logDir =
    process.env.LOG_DIR || path.join(__dirname, '..', '..', 'log');
  private readonly sizeLimit =
    parseInt(process.env.LOG_SIZE_LIMIT || '1024', 10) + 1024;
  private readonly filePath: string;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || 'debug';
    if (!fssync.existsSync(this.logDir)) {
      fssync.mkdirSync(this.logDir, { recursive: true });
      console.log('Лог-папка создана:', this.logDir);
    }
    console.log(fssync.existsSync(this.logDir));

    this.filePath = path.join(this.logDir, 'app.log');
    this.setupProcessHandlers();
  }

  private shoutdLog(level: LogLevel): boolean {
    const levelIndex = this.levels.indexOf(level);
    const logLevelIndex = this.levels.indexOf(this.logLevel);
    return levelIndex >= logLevelIndex;
  }

  private async write(level: LogLevel, message: string | object) {
    if (!this.shoutdLog(level)) return;

    const messageObj = {
      timestamp: new Date().toString(),
      level,
      message,
    };

    const logMessage = JSON.stringify(messageObj);
    process.stdout.write(logMessage + '\n');

    await this.rotateFileIfNeeded();
    await fs.appendFile(this.filePath, logMessage + '\n', 'utf8');
  }

  private async rotateFileIfNeeded() {
    try {
      const stats = await fs.stat(this.filePath);
      if (stats.size >= this.sizeLimit) {
        const newFileName = path.join(this.logDir, `app-${Date.now()}.log`);
        await fs.rename(this.filePath, newFileName);
      }
    } catch (error) {
      process.stdout.write(`Error rotating log file: ${error.message}\n`);
    }
  }

  log(message: string | object) {
    this.write('debug', message);
  }

  error(message: string | object, stack?: string) {
    this.write('error', {
      message,
      stack,
    });
  }
  warn(message: string | object) {
    this.write('warn', message);
  }

  debug(message: string | object) {
    this.write('debug', message);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.write('fatal', {
      message,
      optionalParams,
    });
  }

  private setupProcessHandlers() {
    process.on('uncaughtException', (error) => {
      this.error('Uncaught Exception', error.stack);
    });
    process.on('unhandledRejection', (reason) => {
      this.error('Unhandled Rejection', JSON.stringify(reason));
    });
  }
}
