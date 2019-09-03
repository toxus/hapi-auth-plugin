/**
 * authentication plugin
 *
 * @type {{name: string, version: string, register: authPlugin.register}}
 */


const authPlugin = {
  name: 'authPlugin',
  version: '0.0.5',
  register : function(server) {
    server.route([
      require('./lib/_get'),
      require('./lib/register_post'),
      require('./lib/_post'),
      require('./lib/secure_get'),
      require('./lib/token_post'),
      require('./lib/_delete'),
      require('./lib/resetAccount_post')
    ])
  }
};


const validate = function (decoded, request) {
  request.auth.session = request.user().createSession(decoded);
  return {
    isValid: true,
  };
};
/**
 * configure the authentication definition
 * @param server
 * @param user Object
 *   - authKey String the authentication key
 *   - name String the name for the autentication
 * @returns {Promise<void>}
 */
const authConfig = async function(server, user) {
  let name = user.name ? user.name : 'jwt';
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy(name, 'jwt', {
    key: user.authKey ? user.authKey : 'YourSecretKeyHere',
    validate: validate,
    verifyOptions: { algorithm: ['HS256']}
  });
  server.auth.default(name);
};

module.exports.plugin = authPlugin;
module.exports.auth = authConfig;
module.exports.config = authConfig;

module.exports.routeGet = require('./lib/_get');
module.exports.routeRegisterPost = require('./lib/register_post');
module.exports.routeLoginPost = require('./lib/_post');
module.exports.routeSecureGet = require('./lib/secure_get');
module.exports.routeTokenPost = require('./lib/token_post');
module.exports.routeLogoutDelete = require('./lib/_delete');
module.exports.routeResetAccountPost = require('./lib/resetAccount_post');
module.exports.version = authPlugin.version;