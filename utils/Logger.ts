import { env } from "../config/env";

const levels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};
export class Logger {
  private static helper(level: keyof typeof levels, msg: string) {
    const configuredLevel = levels[env.logLevel as keyof typeof levels];
    const messageLevel = levels[level];
    if (configuredLevel <= messageLevel) {
      console.log(`[${level}] ${msg}`);
    }
  }
  static info(msg: string) {
    this.helper("INFO", msg);
  }
  static warn(msg: string) {
    this.helper("WARN", msg);
  }
  static error(msg: string) {
    this.helper("ERROR", msg);
  }
  static debug(msg: string) {
    this.helper("DEBUG", msg);
  }
}
