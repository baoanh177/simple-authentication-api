const { string } = require("yup");
const validation = require("../core/validation")

module.exports = {
  register: async (body) => {
    const rules = {
      email: string()
        .email("Email invalid")
        .required("Please enter your email"),
      name: string()
        .min(2, "Name must have at least 2 characters")
        .required("Please enter your name"),
      password: string()
        .min(6, "Password must have at least 6 characters")
        .required("Please enter your password"),
    };
    return await validation(body, rules)
  },
  login: async (body) => {
    const rules = {
      email: string()
        .email("Email invalid")
        .required("Please enter your email"),
      password: string()
        .min(6, "Password must have at least 6 characters")
        .required("Please enter your password"),
    };
    return await validation(body, rules)
  },
};
