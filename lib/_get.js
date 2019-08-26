/**
 * the default
 */

/**
 * test if the server is alive
 *
 * @type {{method: string, path: string, handler: (function(*, *): string)}}
 */
const aliveRoute = {
  method: 'GET',
  path: '/',
  options: {
    auth: false
  },
  handler: (request, h) => {
    if (request.user) {
      if (request.user().create === undefined) { return 'missing user.create'}
      if (!request.user().login) { return 'missing user.login'}
      if (!request.user().refreshToken) { return 'missing user.refreshToken'}
      if (!request.user().resetAccount) { return 'missing user.resetAccoun'}
      return 'Hello, interface!';
    } else {
      return 'Missing user';
    }
  }
};

module.exports = aliveRoute;
