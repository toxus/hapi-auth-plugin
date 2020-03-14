/**
 * Login an existing users
 */

const Joi = require('@hapi/joi');
const _ = require('lodash');
const ErrorTypes = require('./error-types')
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
  path: '/',
  options :{
    auth: false,
    validate: {
      validator: Joi,
      payload: {
        customer: Joi.string().optional(),
        username: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        session: Joi.string(),
      }
    }
  },
  handler: ( request, h) => {
    let user = request.user();
    return user.login(request.payload).then( (usr) => {
      return _.pick(usr, ['id', 'username','email','session', 'token','refreshToken']);
    }).catch( (err) => {
      return ErrorTypes.toBoomError(err, request);
    });
  }
};

module.exports = loginRoute;
