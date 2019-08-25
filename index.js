/**
 * authentication plugin
 *
 * @type {{name: string, version: string, register: authPlugin.register}}
 */
const authPlugin = {
  name: 'authPlugin',
  version: '0.0.1',
  register : function(server) {
    server.route([
      require('./lib/_get'),
      require('./lib/register_post'),
      require('./lib/login_post'),
      require('./lib/secure_get'),
      require('./lib/token_post'),
      require('./lib/logout_delete'),
      require('./lib/resetAccount_post')
    ])
  }
};
module.exports = authPlugin;
