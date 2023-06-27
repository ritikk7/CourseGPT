class Logger {
  // isProduction;
  // logFlag;
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.logFlag = true; // manual flag for logging to console
    this.colors = {
      // colors copied from GPT
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      dim: '\x1b[2m',
      underscore: '\x1b[4m',
      blink: '\x1b[5m',
      reverse: '\x1b[7m',
      hidden: '\x1b[8m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    };
  }

  log(...messages) {
    if (this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(...messages, '-', stackInfo, this.colors.reset);
    }
  }

  logEnter() {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(this.colors.dim, 'Entering:', stackInfo, this.colors.reset);
    }
  }

  logExit() {
    if (!this.isProduction && this.logFlag) {
      const stackInfo = this.getSimpleCurrentStackInfo();
      console.log(this.colors.dim, 'Exiting:', stackInfo, this.colors.reset);
    }
  }

  error(...messages) {
    if (!this.isProduction && this.logFlag) {
      console.error(this.colors.red, ...messages, this.colors.reset);
    }
  }

  warn(...messages) {
    const stackInfo = this.getSimpleCurrentStackInfo();
    if (!this.isProduction && this.logFlag) {
      console.warn(
        this.colors.yellow,
        ...messages,
        '- ',
        stackInfo,
        this.colors.reset
      );
    }
  }

  debug(...messages) {
    const stackInfo = this.getSimpleCurrentStackInfo();
    if (!this.isProduction && this.logFlag) {
      console.debug(
        this.colors.cyan,
        ...messages,
        '- ',
        stackInfo,
        this.colors.reset
      );
    }
  }

  getSimpleCurrentStackInfo() {
    // function written entirely by GPT
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
