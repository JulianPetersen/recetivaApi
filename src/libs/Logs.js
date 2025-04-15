import LogModel from '../models/LogModel';

class FunctionLogger {
    constructor() {
      this.logs = '';
    }
  
    log(message) {
      const timestamp = new Date().toISOString();
      this.logs += `[${timestamp}] ${message}\n`;

    }
  
    getLogs() {
      return this.logs;
    }
  
    clear() {
      this.logs = '';
    }

   async save(logs,page){
      await LogModel.create({
        logs:logs,
        page:page
    })
    clear()
    }
  }
  
  module.exports = FunctionLogger;