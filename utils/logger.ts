/**
 * Logger utility for development and production
 */

import ENV from '@/config/environment';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  context?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private createEntry(
    level: LogLevel,
    message: string,
    data?: any,
    context?: string
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      context,
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  private formatLog(entry: LogEntry): string {
    const prefix = `[${entry.timestamp}] [${entry.level}]`;
    const context = entry.context ? ` [${entry.context}]` : '';
    return `${prefix}${context} ${entry.message}`;
  }

  debug(message: string, data?: any, context?: string) {
    const entry = this.createEntry(LogLevel.DEBUG, message, data, context);
    this.addLog(entry);
    if (ENV.IS_DEVELOPMENT) {
      console.log(this.formatLog(entry), data);
    }
  }

  info(message: string, data?: any, context?: string) {
    const entry = this.createEntry(LogLevel.INFO, message, data, context);
    this.addLog(entry);
    if (ENV.IS_DEVELOPMENT) {
      console.info(this.formatLog(entry), data);
    }
  }

  warn(message: string, data?: any, context?: string) {
    const entry = this.createEntry(LogLevel.WARN, message, data, context);
    this.addLog(entry);
    console.warn(this.formatLog(entry), data);
  }

  error(message: string, data?: any, context?: string) {
    const entry = this.createEntry(LogLevel.ERROR, message, data, context);
    this.addLog(entry);
    console.error(this.formatLog(entry), data);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = new Logger();
export default logger;
