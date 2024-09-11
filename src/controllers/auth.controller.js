const authService = require("../services/auth.service");
const logger = require("../utils/logs")
const { successResponse, errorResponse } = require("../utils/response");
const authValidation = require("../validations/auth.validation");

module.exports = {
  register: async (req, res) => {
    try {
      const validateResult = await authValidation.register(req.body);
      if (!validateResult.ok)
        return errorResponse(res, 400, validateResult.errors);

      const registerResult = await authService.register(req.body,);
      if (!registerResult.ok)
        return errorResponse(res, 409, "Conflict", registerResult.error);
      return successResponse(res, 201, "Success", registerResult.data);
    } catch (error) {
      logger.log(error, req);
      errorResponse(res, 500, "Server Error", error);
    }
  },
  login: async (req, res) => {
    try {
      const validateResult = await authValidation.login(req.body);
      if (!validateResult.ok)
        return errorResponse(res, 400, validateResult.errors);
      const loginResult = await authService.login(req.body);
      if (!loginResult.ok)
        return errorResponse(res, 400, "Error", loginResult.error);
      return successResponse(res, 200, "Success", loginResult.data);
    } catch (error) {
      logger.log(error, req);
      errorResponse(res, 500, "Server Error");
    }
  },
  profile: async (req, res) => {
    try {
      const access = req.get("Authorization")?.split(" ")?.at(1);
      if (!access) throw new Error();
      const getProfileResult = await authService.profile(access);
      if (!getProfileResult.ok) throw new Error();
      successResponse(res, 200, "Success", getProfileResult.data);
    } catch (error) {
      logger.log(error, req);
      errorResponse(res, 401, "Unauthorized");
    }
  },
  logout: async (req, res) => {
    try {
      const access = req.get("Authorization")?.split(" ")?.at(1);
      if (!access) throw new Error();
      const logoutResult = await authService.logout(access);
      if (!logoutResult.ok) throw new Error();
      successResponse(res, 200, "Success", logoutResult.data);
    } catch (error) {
      logger.log(error, req);
      errorResponse(res, 401, "Unauthorized");
    }
  },
};
