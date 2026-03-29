// middleware/requestLogger.js

module.exports = (req, res, next) => {

  const start = Date.now();

  res.on("finish", () => {
    console.log({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      user: req.user?.id || null
    });
  });

  next();
};