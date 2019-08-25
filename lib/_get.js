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
    if (request.decorations.userClass) {
      return 'Hello, interface!';
    } else {
      return 'Missing userClass';
    }
  }
};

module.exports = aliveRoute;
