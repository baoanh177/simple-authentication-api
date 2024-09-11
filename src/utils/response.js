module.exports = {
  successResponse: (res, status, message, data) => {
    return res.status(status).json({
      status,
      message,
      data,
    });
  },
  errorResponse: (res, status, message, errors) => {
    return res.status(status).json({
      status,
      message,
      errors,
    });
  },
};
