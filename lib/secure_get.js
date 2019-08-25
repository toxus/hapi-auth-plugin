/**
 * test if route is secure
 */


const secureRoute = {
  method: 'GET',
  path: '/secure',
//  options: {
//    auth: 'user'
//  },
  handler: async (request) => {
    let usr = await request.auth.session.user();
    let msg = `Hi ${usr.username}`;
    return msg ;
  }
};

module.exports = secureRoute;
