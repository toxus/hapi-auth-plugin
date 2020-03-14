/**
 * register a new user
 *
 * parameters:
 *    username,
 *    email
 *    passwordHash
 *
 */

const _ = require('lodash');
const Joi = require('@hapi/joi');
const ErrorTypes = require('./error-types');


/**
 * register a new user
 * uses: name, password, email
 * @type {{method: string, path: string, handler: registerRoute.handler}}
 */
const registerRoute = {
  method: 'POST',
  path: '/register',
  config: {
    auth: false,
    validate: {
      validator: Joi,
      payload: {
        account: Joi.string().allow('').optional(),
        username: Joi.string(),
        password: Joi.string(),
        email: Joi.string(),
        accept: Joi.boolean(),
        reset: Joi.boolean().optional()      // remove all info if it's a login
      },
      failAction: async (request, h, err) => {
        console.error('ValidationError:', err.message);
        if (process.env.NODE_ENV === 'production') {
          // console.error('ValidationError:', err.message);
          throw ErrorTypes.toBoomError(new ErrorFieldNotValid('production', request));
        } else {
          throw err;
        }
      }
    }
  },
  handler: (request, h) => {
    let User = request.user();
    return User.create(request.payload).then( (user) => {
      return _.pick(user, ['id', 'account', 'username', 'email','token', 'refreshToken', 'isExisting'])
    }).catch( (err) => {
      return ErrorTypes.toBoomError(err, request);
    });
  }
};

module.exports = registerRoute;
