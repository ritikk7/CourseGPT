const chalk = require('chalk');

class Logger {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.logFlag = true;
  }

  log(...messages) {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(...messages, '-', stackInfo);
    }
  }

  happyLog(...messages) {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(chalk.green(...messages, '-', stackInfo));
    }
  }

  logEnter() {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(chalk.dim('Entering:', stackInfo));
    }
  }

  logExit() {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(chalk.dim('Exiting:', stackInfo));
    }
  }

  error(...messages) {
    if (!this.isProduction && this.logFlag) {
      console.error(chalk.red(...messages));
    }
  }

  warn(...messages) {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.warn(chalk.yellow(...messages, '-', stackInfo));
    }
  }

  debug(...messages) {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.debug(chalk.cyan(...messages, '-', stackInfo));
    }
  }

  getSimpleCurrentStackInfo() {
    const error = new Error();
    const stackTrace = error.stack;
    const stackLines = stackTrace.split('\n');
    if (stackLines.length >= 4) {
      const fileInfo = stackLines[3].match(/at\s+(.*)\s+\((.*?):(\d+):(\d+)\)/);
      if (fileInfo) {
        const [, functionName, fileName, lineNumber] = fileInfo;
        return `${functionName} (${fileName}:${lineNumber})`;
      }
    }
    return 'Unknown';
  }
}

module.exports = { Logger: new Logger() };
