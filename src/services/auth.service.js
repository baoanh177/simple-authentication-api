const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createAccess, createRefresh, decodeToken } = require("../utils/jwt");

module.exports = {
  register: async (body) => {
    const isEmailExist = await User.findOne({ email: body.email });
    if (isEmailExist) return { ok: false, error: "Email already exists" };
    const hashPassword = bcrypt.hashSync(body.password, 10);
    const user = await User.create({ ...body, password: hashPassword });
    if (!user) return { ok: false };
    return { ok: true, data: user };
  },
  login: async (body) => {
    const user = await User.findOne({ email: body.email });
    if (!user || !bcrypt.compareSync(body.password, user.password))
      return { ok: false, error: "Email or password incorrect" };
    const accessToken = createAccess({ userId: user.id });
    const refreshToken = createRefresh();
    user.accessToken = accessToken
    user.refreshToken = refreshToken
    await user.save()
    return { ok: true, data: { accessToken, refreshToken } };
  },
  profile: async (token) => {
    const { userId } = decodeToken(token)
    if(!userId) return { ok: false }
    const user = await User.findById(userId)
    if(user.accessToken !== token) return { ok: false }
    return { ok: true, data: {
      email: user.email,
      name: user.name
    }}
  },
  logout: async (token) => {
    const { userId } = decodeToken(token)
    if(!userId) return { ok: false }
    const user = await User.findById(userId)
    if(user.accessToken !== token) return { ok: false }
    user.accessToken = ""
    user.refreshToken = ""
    user.save()
    return { ok: true }
  },
};
