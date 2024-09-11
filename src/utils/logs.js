const fs = require("fs");
const path = require("path");

class EnhancedExceptionLogger {
  constructor(logFilePath = "exceptions.log") {
    this.logFilePath = path.resolve(logFilePath);
  }

  log(error, req, additionalInfo = {}) {
    const timestamp = new Date().toISOString();
    const errorMessage = error.message || "Unknown error";
    const errorStack = error.stack || "No stack trace available";

    // Lấy thông tin từ request object
    const apiInfo = this.extractApiInfo(req);

    let logMessage = `
--------------------
Timestamp: ${timestamp}
Error: ${errorMessage}
Stack Trace:
${errorStack}
API Call Info:
${JSON.stringify(apiInfo, null, 2)}
Additional Info:
${JSON.stringify(additionalInfo, null, 2)}
--------------------

`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      } else {
        console.log("Exception logged successfully");
      }
    });
  }

  logSync(error, req, additionalInfo = {}) {
    const timestamp = new Date().toISOString();
    const errorMessage = error.message || "Unknown error";
    const errorStack = error.stack || "No stack trace available";

    // Lấy thông tin từ request object
    const apiInfo = this.extractApiInfo(req);

    let logMessage = `
--------------------
Timestamp: ${timestamp}
Error: ${errorMessage}
Stack Trace:
${errorStack}
API Call Info:
${JSON.stringify(apiInfo, null, 2)}
Additional Info:
${JSON.stringify(additionalInfo, null, 2)}
--------------------

`;

    try {
      fs.appendFileSync(this.logFilePath, logMessage);
      console.log("Exception logged successfully");
    } catch (err) {
      console.error("Error writing to log file:", err);
    }
  }

  extractApiInfo(req) {
    if (!req) return { note: "No request object provided" };

    return {
      ip: req.ip || req.connection.remoteAddress,
      method: req.method,
      url: req.url,
      userAgent: req.get("User-Agent"),
      headers: req.headers,
      body: req.body, // Be cautious with sensitive data
      query: req.query,
      params: req.params,
    };
  }
}

const logger = new EnhancedExceptionLogger()
module.exports = logger