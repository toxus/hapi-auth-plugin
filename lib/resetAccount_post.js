/**
 * reset the user account for testing purpose.
 * Only reset the account if the username === 'test.' anything
 *
 */

const Joi = require('@hapi/joi');
const _ = require('lodash');
const ErrorType = require('./error-types');
/**
 * login to Dropper
 * @param username String
 * @param passwordHash String
 * @returns {
 *   username, email, token, refreshToken
 * } or
 *   Boom Error  (403 or 400)
 */
const loginRoute = {
  method: 'POST',
  path: '/resetAccount',
  config :{
    auth: false,
    validate: {
      payload: {
        username: Joi.string().required(),
        email: Joi.string(),
        password: Joi.string(),
        remove: Joi.boolean()
      }
    }
  },
  handler: ( request, h) => {
    if (request.payload.username.substr(0, 5) !== 'test.') {
      return ErrorType.toBoomError(new ErrorType.ErrorAccessDenied('Only the test account can be reset'));
    }
    let User = request.decorations.user;
    return User.resetAccount(request.payload).then( (usr) => {
      return _.pick(usr, ['username','email']);
    }).catch( (err) => {
      return ErrorType.toBoomError(err,request);
    });
  }
};

module.exports = loginRoute;
