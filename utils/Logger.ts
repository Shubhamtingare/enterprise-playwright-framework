export class Logger {
  static info(msg: string) {
    console.log(`[INFO] ${msg}`);
  }
  static warn(msg: string) {
    console.log(`[WARN] ${msg}`);
  }
  static error(msg: string) {
    console.log(`[ERROR] ${msg}`);
  }
  static debug(msg: string) {
    console.log(`[DEBUG] ${msg}`);
  }
}
