/**
 * End the current session
 */

const Boom = require('@hapi/boom');
/**
 * logout to Dropper
 * @param refreshToken to remove
 * @returns {
 *   username, email, token
 * } or
 *   Boom Error  (403 or 400)
 */
const logoff = {
  method: 'DELETE',
  path: '/{token}',
  config : {
    auth: false
  },
  handler: ( request, h) => {
    if (request.params.token) {
      const token = request.params.token;
      return request.server.app.refreshTokens.delete(token).then(() => {
        return 'ok'
      }).catch(() => {
        return Boom.badRequest('missing parameters');  // 400
      });
    } else {
      return Boom.badRequest('missing parameters');  // 400
    }
  }
}

module.exports = logoff;
