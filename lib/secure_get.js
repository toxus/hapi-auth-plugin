/**
 * test if route is secure
 */
const ErrorTypes = require('../lib/error-types');

const secureRoute = {
  method: 'GET',
  path: '/secure',
  // config: {
  //   auth: true
  // },
 options: {
   auth: 'jwt'
 },
  handler: async (request) => {
    if (request.auth.isAuthenticated && request.auth.session) {
      let usr = await request.auth.session;
      let msg = `Hi ${usr.id}`;
      return msg;
    } else {
      return ErrorTypes.toBoomError(new ErrorTypes.ErrorAccessDenied());
    }
  }
};

module.exports = secureRoute;
