const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  };
  
  module.exports = errorHandler;
  