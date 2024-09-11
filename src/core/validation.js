const { object } = require("yup");

module.exports = async (body, rules = {}) => {
  const response = { ok: true };
  const schema = object(rules);
  try {
    await schema.validate(body, { abortEarly: false });
  } catch (e) {
    const errors = Object.fromEntries(
      e.inner.map((item) => [item.path, item.message])
    );
    response.ok = false;
    response.errors = errors;
  }
  return response;
};
