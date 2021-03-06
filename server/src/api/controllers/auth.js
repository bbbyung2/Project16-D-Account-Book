const jwtConfig = require('@config/jwt');
const { generateToken, decodeTokenForValidation } = require('@utils/jwt-utils');
const authService = require('@services/auth');

const db = require('@models');

const getCurrentUser = async (ctx) => {
  const token = ctx.cookies.get('jwt');
  try {
    if (!token) {
      throw new Error('jwt토큰 없음');
    }
    const [decoded, user] = await decodeTokenForValidation(token);
    if (60 * 60 * 2 > Date.now() / 1000 - decoded.iat > 60 * 60 * 1) {
      const newToken = await generateToken(decoded.userId);
      ctx.cookies.set('jwt', newToken, {
        httpOnly: true,
        maxAge: jwtConfig.cookieExpiresIn,
      });
      await db.user.update({ token: newToken }, { where: { id: decoded.userId } });
    }
    ctx.body = user;
  } catch (err) {
    ctx.throw(401, err);
  }
};

const getAuthority = async (ctx) => {
  const token = ctx.cookies.get('jwt');
  const { accountbook_id: accountbookId } = ctx.request.query;
  const authority = await authService.getAuthority(token, accountbookId);
  ctx.body = authority;
};

module.exports = {
  getCurrentUser,
  getAuthority,
};
